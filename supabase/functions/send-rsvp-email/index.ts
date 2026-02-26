// Deno runtime
// Deploy with: supabase functions deploy send-rsvp-email
// Triggered by Supabase Database Webhook on INSERT to rsvps table

import { Resend } from "npm:resend";
import { createClient } from "npm:@supabase/supabase-js";

const resend        = new Resend(Deno.env.get("RESEND_API_KEY")!);
const ADMIN_EMAIL   = Deno.env.get("ADMIN_EMAIL")!;
const SUPABASE_URL  = Deno.env.get("DB_URL")!;
const SUPABASE_KEY  = Deno.env.get("DB_SERVICE_ROLE_KEY")!;

// ── Types ────────────────────────────────────────────────────────────────────

type WebhookPayload = {
  type:       "INSERT" | "UPDATE" | "DELETE";
  table:      string;
  schema:     string;
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

type RSVPRow = {
  id:         number;
  created_at: string;
  name:       string;
  party_size: number;
  attending:  boolean;
  message:    string | null;
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString("en-CA", {
    timeZone:  "America/Edmonton",
    dateStyle: "full",
    timeStyle: "short",
  });
}

// ── Email builders ───────────────────────────────────────────────────────────

function buildHtml(newRsvp: WebhookPayload["record"], allRsvps: RSVPRow[]): string {
  const attending    = allRsvps.filter(r => r.attending);
  const notAttending = allRsvps.filter(r => !r.attending);
  const totalGuests  = attending.reduce((sum, r) => sum + r.party_size, 0);

  const rowStyle   = "padding: 10px 0; border-bottom: 1px solid #ffe082;";
  const labelStyle = `${rowStyle} color: #888; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.08em; width: 130px;`;
  const valueStyle = `${rowStyle} color: #1a1a1a; font-size: 0.97rem;`;

  // ── New RSVP section ──
  const newGuestLine = newRsvp.attending
    ? `${newRsvp.party_size} ${newRsvp.party_size === 1 ? "person" : "people"}`
    : "N/A — not attending";

  const newRsvpRows = `
    <tr>
      <td style="${labelStyle}">Name</td>
      <td style="${valueStyle}">${newRsvp.name}</td>
    </tr>
    <tr>
      <td style="${labelStyle}">Attending?</td>
      <td style="${valueStyle} font-weight: bold; color: ${newRsvp.attending ? "#2e7d32" : "#c62828"};">
        ${newRsvp.attending ? "✅ YES — will attend" : "❌ NO — will not attend"}
      </td>
    </tr>
    <tr>
      <td style="${labelStyle} border-bottom: ${newRsvp.message ? `1px solid #ffe082` : "none"};">Party Size</td>
      <td style="${valueStyle} border-bottom: ${newRsvp.message ? `1px solid #ffe082` : "none"};">${newGuestLine}</td>
    </tr>
    ${newRsvp.message ? `
    <tr>
      <td style="padding: 10px 0; color: #888; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.08em; vertical-align: top;">Message</td>
      <td style="padding: 10px 0; color: #1a1a1a; font-size: 0.97rem; font-style: italic;">"${newRsvp.message}"</td>
    </tr>` : ""}
  `;

  // ── Full RSVP list ──
  const attendingRows = attending.map((r, i) => `
    <tr>
      <td style="padding: 8px 0; color: #1a1a1a; font-size: 0.93rem; border-bottom: 1px solid #f5f5f5;">
        <strong>${i + 1}. ${r.name}</strong>
        — ${r.party_size} ${r.party_size === 1 ? "person" : "people"}
        ${r.message ? `<br><span style="font-style: italic; color: #555; font-size: 0.87rem;">"${r.message}"</span>` : ""}
      </td>
    </tr>
  `).join("");

  const notAttendingRows = notAttending.map((r, i) => `
    <tr>
      <td style="padding: 8px 0; color: #1a1a1a; font-size: 0.93rem; border-bottom: 1px solid #f5f5f5;">
        <strong>${i + 1}. ${r.name}</strong>
        ${r.message ? `<br><span style="font-style: italic; color: #555; font-size: 0.87rem;">"${r.message}"</span>` : ""}
      </td>
    </tr>
  `).join("");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 580px; margin: 0 auto;
                background: #fffdf4; border-radius: 14px; overflow: hidden;
                border: 2px solid #f9c10e; box-shadow: 0 4px 0 #e0a800;">

      <!-- Header -->
      <div style="background: #e63d2f; padding: 24px 32px;">
        <h1 style="color: #fff; font-size: 1.5rem; margin: 0; letter-spacing: 0.02em;">
          🎉 New RSVP — Emilien's 2nd Birthday
        </h1>
        <p style="color: rgba(255,255,255,0.85); font-size: 0.85rem; margin: 6px 0 0;">
          Received: ${formatTime(newRsvp.created_at)} (Edmonton time)
        </p>
      </div>

      <!-- Running totals banner -->
      <div style="background: #f9c10e; padding: 12px 32px; display: flex; gap: 2rem;">
        <span style="font-size: 0.9rem; font-weight: bold; color: #1a1a1a;">
          ✅ ${attending.length} attending &nbsp;·&nbsp; ${totalGuests} total guests
        </span>
        <span style="font-size: 0.9rem; font-weight: bold; color: #1a1a1a;">
          ❌ ${notAttending.length} not attending
        </span>
      </div>

      <div style="padding: 28px 32px;">

        <!-- New RSVP detail -->
        <h2 style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em;
                   color: #e63d2f; margin: 0 0 12px;">Just submitted</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
          ${newRsvpRows}
        </table>

        <!-- Divider -->
        <hr style="border: none; border-top: 3px solid #f9c10e; margin-bottom: 28px;" />

        <!-- Full list — Attending -->
        <h2 style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em;
                   color: #2e7d32; margin: 0 0 12px;">
          ✅ Attending — ${attending.length} ${attending.length === 1 ? "response" : "responses"}, ${totalGuests} ${totalGuests === 1 ? "guest" : "guests"} total
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
          ${attending.length > 0 ? attendingRows : `<tr><td style="color: #888; font-style: italic; padding: 8px 0;">None yet.</td></tr>`}
        </table>

        <!-- Full list — Not attending -->
        <h2 style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em;
                   color: #c62828; margin: 0 0 12px;">
          ❌ Not Attending — ${notAttending.length} ${notAttending.length === 1 ? "response" : "responses"}
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px;">
          ${notAttending.length > 0 ? notAttendingRows : `<tr><td style="color: #888; font-style: italic; padding: 8px 0;">None yet.</td></tr>`}
        </table>

      </div>

      <!-- Footer -->
      <div style="background: #f5f5f5; padding: 14px 32px; text-align: center;">
        <p style="font-size: 0.78rem; color: #888; margin: 0;">
          Emilien's 2nd Birthday &nbsp;·&nbsp; April 19, 2026 &nbsp;·&nbsp; Edmonton, AB
        </p>
      </div>

    </div>
  `;
}

function buildText(newRsvp: WebhookPayload["record"], allRsvps: RSVPRow[]): string {
  const attending    = allRsvps.filter(r => r.attending);
  const notAttending = allRsvps.filter(r => !r.attending);
  const totalGuests  = attending.reduce((sum, r) => sum + r.party_size, 0);

  const newGuestLine = newRsvp.attending
    ? `${newRsvp.party_size} ${newRsvp.party_size === 1 ? "person" : "people"}`
    : "N/A (not attending)";

  const attendingList = attending.map((r, i) => {
    const msg = r.message ? `\n     "${r.message}"` : "";
    return `  ${i + 1}. ${r.name} — ${r.party_size} ${r.party_size === 1 ? "person" : "people"}${msg}`;
  }).join("\n");

  const notAttendingList = notAttending.map((r, i) => {
    const msg = r.message ? `\n     "${r.message}"` : "";
    return `  ${i + 1}. ${r.name}${msg}`;
  }).join("\n");

  return [
    "New RSVP — Emilien's 2nd Birthday",
    "====================================",
    `Received:   ${formatTime(newRsvp.created_at)} (Edmonton time)`,
    "",
    "── Just submitted ──",
    `Name:       ${newRsvp.name}`,
    `Attending:  ${newRsvp.attending ? "YES — will attend" : "NO — will not attend"}`,
    `Party Size: ${newGuestLine}`,
    newRsvp.message ? `Message:    "${newRsvp.message}"` : null,
    "",
    "── Full RSVP list ──",
    "",
    `✅ ATTENDING (${attending.length} responses, ${totalGuests} total guests)`,
    attendingList || "  None yet.",
    "",
    `❌ NOT ATTENDING (${notAttending.length} responses)`,
    notAttendingList || "  None yet.",
    "",
    "────────────────────────────────────",
    "Emilien's 2nd Birthday · April 19, 2026 · Edmonton, AB",
  ].filter(line => line !== null).join("\n");
}

// ── Main handler ─────────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
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

  const newRsvp = payload.record;

  // Query the full RSVP list from Supabase
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const { data: allRsvps, error: dbError } = await supabase
    .from("rsvps")
    .select("*")
    .order("created_at", { ascending: true });

  if (dbError || !allRsvps) {
    console.error("DB query failed:", dbError);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch RSVP list" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  // Send via Resend
  const { error: sendError } = await resend.emails.send({
    from:    "onboarding@resend.dev",
    to:      ADMIN_EMAIL,
    subject: `🎉 RSVP: ${newRsvp.name} — ${newRsvp.attending ? "Attending ✓" : "Not Attending"} | Emilien's 2nd Birthday`,
    html:    buildHtml(newRsvp, allRsvps),
    text:    buildText(newRsvp, allRsvps),
  });

  if (sendError) {
    console.error("Resend error:", sendError);
    return new Response(
      JSON.stringify({ success: false, error: String(sendError) }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});
