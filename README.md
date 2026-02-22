# Natalia's 1st Birthday 🦋

Birthday invitation landing page with RSVP functionality.

**Stack:** Vite + React + TypeScript · Supabase · Vercel · Gmail SMTP

---

## Setup Guide

### 1. Gmail App Password

1. Go to [myaccount.google.com](https://myaccount.google.com) → Security
2. Enable **2-Step Verification** if not already on
3. Go to **App Passwords** → create one named "Natalia Birthday Site"
4. Save the 16-character password (format: `xxxx xxxx xxxx xxxx`)

---

### 2. Supabase — Create the RSVPs table

In your Supabase Dashboard → **SQL Editor** → New query, run:

```sql
CREATE TABLE public.rsvps (
  id          BIGSERIAL PRIMARY KEY,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name        TEXT        NOT NULL CHECK (char_length(name) BETWEEN 1 AND 150),
  party_size  SMALLINT    NOT NULL CHECK (party_size >= 0 AND party_size <= 20),
  attending   BOOLEAN     NOT NULL,
  message     TEXT        CHECK (char_length(message) <= 500)
);

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert"
  ON public.rsvps
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

Then go to **Project Settings → API** and copy:
- `Project URL` → your `VITE_SUPABASE_URL`
- `anon` key → your `VITE_SUPABASE_ANON_KEY`

---

### 3. Local development

```bash
# Copy the env template and fill in your Supabase credentials
cp .env.example .env

# Start dev server
npm run dev
```

---

### 4. Deploy the Edge Function

Install the Supabase CLI:
```bash
npm install -g supabase
```

Then:
```bash
# Log in and link to your project
supabase login
supabase link --project-ref YOUR_PROJECT_REF

# Set Gmail secrets
supabase secrets set GMAIL_USER=you@gmail.com
supabase secrets set GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
supabase secrets set ADMIN_EMAIL=you@gmail.com

# Deploy the function
supabase functions deploy send-rsvp-email
```

Note the function URL:
`https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-rsvp-email`

---

### 5. Create the Database Webhook

In Supabase Dashboard → **Database → Webhooks → Create a new hook**:

| Field | Value |
|---|---|
| Name | `on_rsvp_insert` |
| Table | `rsvps` |
| Events | `INSERT` only |
| Type | HTTP Request |
| Method | POST |
| URL | `https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-rsvp-email` |
| Header | `Authorization: Bearer YOUR_SERVICE_ROLE_KEY` |

The service role key is in **Project Settings → API → service_role** (keep it secret!).

---

### 6. GitHub + Vercel CI/CD

```bash
git init
git add .
git commit -m "Initial commit: Natalia's birthday invitation site"

# Create a repo on github.com named natalia-birthday, then:
git remote add origin https://github.com/YOUR_USERNAME/natalia-birthday.git
git branch -M main
git push -u origin main
```

In Vercel:
1. **Add New Project** → import the GitHub repo
2. Framework: Vite (auto-detected)
3. Add **Environment Variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Click **Deploy**

Every `git push` to `main` will now auto-deploy.

---

## Admin: Viewing RSVPs

In Supabase Dashboard → **Table Editor → rsvps** you can see all submitted RSVPs. You can also run:

```sql
SELECT name, party_size, attending, message, created_at
FROM rsvps
ORDER BY created_at DESC;
```

You'll also receive an email notification for every RSVP submitted.
