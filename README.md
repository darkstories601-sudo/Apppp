# ClipChaos — Expo App
# Get your APK with NO PC setup needed

---

## ✅ STEP 1 — Create free accounts (do on phone or any device)

1. **Expo account** → https://expo.dev/signup  (free)
2. **GitHub account** → https://github.com/signup  (free)

---

## ✅ STEP 2 — Upload this code to GitHub

1. Go to https://github.com/new
2. Name the repo: `clipchaos-app`
3. Set to **Private**, click **Create repository**
4. Click **uploading an existing file**
5. Drag and drop ALL the files from this zip (unzipped) into the browser
6. Click **Commit changes**

---

## ✅ STEP 3 — Link Expo to your GitHub repo

1. Go to https://expo.dev and log in
2. Click **Create a project**
3. Name it `clipchaos`, click Create
4. You'll see a **Project ID** — copy it
5. Open `app.json` in your GitHub repo
6. Replace `"your-project-id-here"` with your real Project ID
7. Commit the change

---

## ✅ STEP 4 — Build the APK in the cloud (EAS Build)

### Option A — Using GitHub Codespaces (completely free, no install needed)

1. Go to your GitHub repo
2. Click the green **Code** button → **Codespaces** → **Create codespace on main**
3. Wait ~1 min for it to load (it's a browser-based terminal)
4. In the terminal, run these commands one by one:

```bash
npm install
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

5. It will ask you to log in with your Expo account
6. It will ask "Generate a new Android Keystore?" → press **Y** and Enter
7. The build starts in Expo's cloud servers (~10–15 min)
8. When done, you get a **download link for the APK**

### Option B — Using EAS directly from any PC/laptop

```bash
npm install
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

---

## ✅ STEP 5 — Install APK on your Android phone

1. Open the download link from EAS on your phone
2. Download the `.apk` file
3. Open it — Android will ask "Allow install from unknown sources"
4. Tap **Settings → Allow** → go back and tap **Install**
5. Done! ClipChaos app is installed 🎉

**Or rename it:**
Once downloaded, rename `clipchaos-*.apk` → `clipchaos.apk`

---

## 📱 What the app has

| Tab | Screen |
|---|---|
| 🛒 Explore | Marketplace — browse & search all products |
| 📊 Dashboard | Revenue, orders, live sale notifications |
| 📚 Library | Your purchased products + progress |
| ⚙️ More | Analytics, Affiliates, Payouts, Settings, Logout |

**Stack screens:**
- Auth — Login & Signup (with Google/Apple)
- Checkout — UPI, Card, Net Banking, Wallet
- Course Player — Video player, modules, notes, resources

---

## 🎨 Design

Exact same brand as clipchaos.in:
- Color: `#FF2D20` red, dark `#09090B` background
- Same products, creators, pricing as the website
- Same live sales toast notifications as dashboard.html

---

## ❓ Common issues

**"eas: command not found"**
→ Run `npm install -g eas-cli` first

**Build fails with "projectId not found"**
→ Make sure you updated `app.json` with your real Expo Project ID from step 3

**Can't install APK on phone**
→ Go to Settings → Security → Enable "Install unknown apps" for your browser/Files app

---

## 🔄 Future: Publish to Play Store

When ready for Google Play Store:
```bash
eas build --platform android --profile production
eas submit --platform android
```

This builds an `.aab` file for the Play Store instead of APK.
