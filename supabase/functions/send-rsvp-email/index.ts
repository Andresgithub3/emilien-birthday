// Deno runtime - no npm imports
// Deploy with: supabase functions deploy send-rsvp-email
// Triggered by Supabase Database Webhook on INSERT to rsvps table

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const GMAIL_USER     = Deno.env.get("GMAIL_USER")!;
const GMAIL_APP_PASS = Deno.env.get("GMAIL_APP_PASSWORD")!;
const ADMIN_EMAIL    = Deno.env.get("ADMIN_EMAIL")!;

type WebhookPayload = {
  type:   "INSERT" | "UPDATE" | "DELETE";
  table:  string;
  schema: string;
  record: {
    id:         number;
    created_at: string;
    name:       string;
    party_size: number;
    attending:  boolean;
    message:    string | null;
  };
  old_record: null | Record<string, unknown>;
};

serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let payload: WebhookPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  if (payload.type !== "INSERT" || payload.table !== "rsvps") {
    return new Response("Ignored: not an rsvps insert", { status: 200 });
  }

  const { name, party_size, attending, message, created_at } = payload.record;

  const attendingText = attending ? "YES — will attend" : "NO — will not attend";
  const submittedAt = new Date(created_at).toLocaleString("en-CA", {
    timeZone: "America/Edmonton",
    dateStyle: "full",
    timeStyle: "short",
  });

  const guestLine = attending
    ? `${party_size} ${party_size === 1 ? "person" : "people"}`
    : "N/A (not attending)";

  const emailHtml = `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto;
                padding: 32px; background: #faf7fc; border-radius: 12px;
                border: 1px solid #e8d8f0;">
      <h2 style="color: #9b7bb8; font-size: 1.6rem; margin: 0 0 4px;">
        🦋 New RSVP — Natalia's Birthday
      </h2>
      <p style="color: #8a7a9b; font-size: 0.85rem; margin: 0 0 24px;">
        Received: ${submittedAt} (Mountain Time)
      </p>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e8d8f0;
                     color: #8a7a9b; width: 150px; font-size: 0.82rem;
                     text-transform: uppercase; letter-spacing: 0.08em;">
            Guest Name
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e8d8f0;
                     color: #4a3b5c; font-size: 1rem;">
            ${name}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e8d8f0;
                     color: #8a7a9b; font-size: 0.82rem;
                     text-transform: uppercase; letter-spacing: 0.08em;">
            Attending?
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e8d8f0;
                     color: ${attending ? "#5a9e60" : "#c97a7a"};
                     font-size: 1rem; font-weight: bold;">
            ${attendingText}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: ${message ? "1px solid #e8d8f0" : "none"};
                     color: #8a7a9b; font-size: 0.82rem;
                     text-transform: uppercase; letter-spacing: 0.08em;">
            Party Size
          </td>
          <td style="padding: 10px 0; border-bottom: ${message ? "1px solid #e8d8f0" : "none"};
                     color: #4a3b5c; font-size: 1rem;">
            ${guestLine}
          </td>
        </tr>
        ${message ? `
        <tr>
          <td style="padding: 10px 0; color: #8a7a9b; font-size: 0.82rem;
                     text-transform: uppercase; letter-spacing: 0.08em;
                     vertical-align: top;">
            Message
          </td>
          <td style="padding: 10px 0; color: #4a3b5c; font-size: 1rem;
                     font-style: italic;">
            "${message}"
          </td>
        </tr>` : ""}
      </table>

      <p style="margin-top: 28px; font-size: 0.78rem; color: #c9a7d8;
                text-align: center; border-top: 1px solid #e8d8f0; padding-top: 16px;">
        Natalia's 1st Birthday • April 5, 2025 • Edmonton, AB
      </p>
    </div>
  `;

  const emailText = [
    "New RSVP — Natalia's Birthday",
    "================================",
    `Received:   ${submittedAt}`,
    `Name:       ${name}`,
    `Attending:  ${attendingText}`,
    `Party Size: ${guestLine}`,
    message ? `Message:    ${message}` : null,
  ].filter(Boolean).join("\n");

  const client = new SmtpClient();

  try {
    await client.connectTLS({
      hostname: "smtp.gmail.com",
      port: 465,
      username: GMAIL_USER,
      password: GMAIL_APP_PASS,
    });

    await client.send({
      from:    GMAIL_USER,
      to:      ADMIN_EMAIL,
      subject: `🦋 RSVP: ${name} — ${attending ? "Attending ✓" : "Not Attending"} | Natalia's Birthday`,
      content: emailText,
      html:    emailHtml,
    });

    await client.close();

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    // Log error but return 200 so Supabase doesn't retry indefinitely
    console.error("SMTP send failed:", err);
    return new Response(
      JSON.stringify({ success: false, error: String(err) }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
});
