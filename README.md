# NEOS Automobile Website

Full-stack automobile conversion & upgrade showcase website built with React + Supabase.

---

## 🚀 Quick Setup (Step by Step)

### Step 1 — Install dependencies
```bash
npm install
```

### Step 2 — Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **New Project** — name it `neos-automobile`
3. Go to **SQL Editor** → paste the entire contents of `SUPABASE_SETUP.sql` → click **Run**
4. Go to **Settings → API** and copy:
   - `Project URL`
   - `anon/public` key

### Step 3 — Create your .env file
```bash
cp .env.example .env
```
Open `.env` and fill in your Supabase values:
```
REACT_APP_SUPABASE_URL=https://yourproject.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 4 — Create Admin User in Supabase
1. In Supabase → go to **Authentication → Users**
2. Click **Invite User** or **Add User**
3. Enter your email and a strong password
4. Use those credentials to log in at `/admin`

### Step 5 — Run locally
```bash
npm start
```
Site opens at `http://localhost:3000`

---

## 📁 Project Structure

```
neos-automobile/
├── public/
│   ├── index.html
│   └── images/
│       ├── logo.jpeg        ← NEOS logo
│       ├── hero1.jpg        ← Hero slider image 1
│       ├── hero2.jpg        ← Hero slider image 2
│       ├── hero3.jpg        ← Hero slider image 3
│       └── hero4.jpg        ← Hero slider image 4
├── src/
│   ├── components/
│   │   ├── Navbar.js        ← Mega-menu dropdown nav
│   │   ├── Footer.js        ← 4-column footer
│   │   └── WhatsAppButton.js← Floating WhatsApp CTA
│   ├── pages/
│   │   ├── Home.js          ← Hero slider + services + CTA
│   │   ├── About.js         ← Story, values, brand specialists
│   │   ├── Services.js      ← Expandable service cards
│   │   ├── Gallery.js       ← Filterable gallery + lightbox
│   │   ├── Contact.js       ← Smart quote request form
│   │   ├── AdminLogin.js    ← Password-protected admin login
│   │   └── AdminDashboard.js← Manage contacts + gallery
│   ├── lib/
│   │   └── supabase.js      ← Supabase client
│   ├── App.js
│   ├── index.js
│   └── index.css            ← Global styles + NEOS color palette
├── SUPABASE_SETUP.sql       ← Run this in Supabase SQL Editor
├── .env.example             ← Copy to .env and fill in keys
├── .gitignore               ← .env is excluded from git
└── package.json
```

---

## 🌐 Pages

| Route | Page |
|---|---|
| `/` | Home — hero slider, services preview, CTA |
| `/about` | About — story, values, brand focus |
| `/services` | Services — expandable service cards |
| `/gallery` | Gallery — filterable grid + lightbox |
| `/contact` | Contact — smart quote request form |
| `/admin` | Admin dashboard (login required) |
| `/admin/login` | Admin login |

---

## 🎨 Color Palette (from NEOS logo)

| Token | Value | Use |
|---|---|---|
| Background | `#1E1E1E` | Page background |
| Card | `#2A2A2A` | Cards, panels |
| Accent Blue | `#3BAEE8` | CTAs, highlights |
| Dark Blue | `#2A7DAB` | Hover states |
| Text Primary | `#E8E8E8` | Headings, body |
| Text Secondary | `#A0A0A0` | Subtitles |

---

## 🗃️ Database Tables (Supabase)

### `contacts`
Stores all quote/enquiry form submissions.
| Column | Type | Notes |
|---|---|---|
| id | uuid | Auto-generated |
| name | text | Client name |
| email | text | Client email |
| phone | text | Client phone |
| car_brand | text | Toyota/Lexus/Benz/Range Rover |
| car_model | text | e.g. Land Cruiser 200 |
| service_type | text | Selected service |
| preferred_contact | text | WhatsApp/Phone/Email |
| message | text | Additional details |
| status | text | new/in-progress/completed/closed |
| created_at | timestamp | Auto |

### `gallery`
Manages the public-facing work showcase.
| Column | Type | Notes |
|---|---|---|
| id | uuid | Auto-generated |
| title | text | Job title |
| description | text | Short description |
| image_url | text | Supabase storage URL |
| category | text | conversion/upgrade/bodywork etc |
| car_brand | text | Brand worked on |
| featured | boolean | Featured item flag |
| display_order | integer | Sort order |

---

## 🔐 Admin Panel (`/admin`)

- Login with your Supabase auth credentials
- **Contacts tab** — view all enquiries, update status (New/In Progress/Completed/Closed), WhatsApp or call client directly, delete
- **Gallery tab** — upload new work photos (stored in Supabase Storage), categorise, remove items

---

## 📦 Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — NEOS Automobile website"
git remote add origin https://github.com/YOUR_USERNAME/neos-automobile.git
git push -u origin main
```

> ⚠️ Make sure `.env` is in `.gitignore` (it already is) — never push your Supabase keys.

---

## 🚀 Deploy (Free options)

**Vercel (recommended)**
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import your repo
3. Add your `.env` variables in Vercel's Environment Variables settings
4. Deploy — done ✅

**Netlify**
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → Import repo
3. Build command: `npm run build` | Publish directory: `build`
4. Add environment variables in Site Settings

---

## 📞 Contact & WhatsApp

Phone number configured: **+234 816 246 5247**
To update: search `2348162465247` in the codebase and replace with your new number.

---

Built for NEOS Automobile 🚗
