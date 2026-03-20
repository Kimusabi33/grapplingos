# GrapplingOS

A complete Judo and BJJ technique reference app with user accounts and progress tracking.

## Stack
- React (frontend)
- Supabase (auth + database)
- Vercel (hosting)

---

## Getting Live in 4 Steps

### Step 1 — Set up Supabase (free)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New project", name it `grapplingos`, pick a region close to you, set a database password
3. Wait ~2 minutes for the project to spin up
4. Go to **SQL Editor** in the left sidebar
5. Paste the entire contents of `supabase_setup.sql` and click **Run**
6. Go to **Project Settings → API**
7. Copy your **Project URL** and **anon/public key** — you'll need these next

### Step 2 — Configure environment variables

1. In the project folder, copy `.env.example` to `.env.local`
2. Fill in your Supabase values:
```
REACT_APP_SUPABASE_URL=https://yourproject.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 3 — Test locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) — the app should be running.

Create an account and test:
- Sign up with an email
- Check your email and confirm
- Log in
- Browse techniques
- Click a technique card to open the detail page
- Change your progress status — it saves to Supabase

### Step 4 — Deploy to Vercel (free)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
# Create a new repo on github.com, then:
git remote add origin https://github.com/yourusername/grapplingos.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New Project** → import your `grapplingos` repo
4. Under **Environment Variables**, add:
   - `REACT_APP_SUPABASE_URL` → your Supabase project URL
   - `REACT_APP_SUPABASE_ANON_KEY` → your Supabase anon key
5. Click **Deploy**

Your app will be live at `https://grapplingos.vercel.app` (or similar) in ~2 minutes.

### Step 5 — Connect your custom domain

1. In Vercel, go to your project → **Settings → Domains**
2. Add your domain (e.g. `grapplingos.com`)
3. Follow Vercel's instructions to update your DNS records in Namecheap
4. Takes 10-30 minutes to propagate

---

## Adding YouTube Links

In `src/data/techniques.js`, find any technique and change `vid: null` to `vid: "https://www.youtube.com/watch?v=VIDEO_ID"`.

The Watch button on the detail page will automatically activate.

---

## Project Structure

```
src/
  data/
    techniques.js      # All technique data — edit here to add/update techniques
  lib/
    supabase.js        # Supabase client and auth/progress helpers
    AuthContext.js     # React context for user state and progress
  pages/
    AuthPage.js        # Login and signup
    LibraryPage.js     # Main technique grid with filters
    TechniquePage.js   # Individual technique detail page
  App.js               # Routing and nav
  index.css            # All styles
```

---

## Coming Next (future features)

- AI coaching insights powered by Claude API
- Community-suggested video links
- Belt level filtering
- Technique flowcharts (see how techniques connect visually)
- Mobile app (React Native)
