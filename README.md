# 📡 SubTrack — Cable/DTH Subscription Manager PWA

A **zero-cost, offline-capable Progressive Web App** for managing cable TV or DTH subscriptions. Installs on Android as a home-screen app. Syncs payment records and complaints to Google Sheets — no server required.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔐 **Authentication** | Login screen with Admin / User roles |
| 🔑 **Biometric Login** | Fingerprint, Face ID, or Device PIN via WebAuthn |
| 🏠 **Today's Payments** | Home screen defaults to customers who paid today |
| 🗺 **Area Filter** | Filter by Gugai, Karungalpatti, or Other |
| 🔍 **Smart Search** | Searches by name AND setup box ID simultaneously |
| ➕ **Autocomplete** | Pre-fills name + address + area when typing box ID |
| 📅 **Smart Months** | Auto-selects current month for payment; paid months locked |
| 💳 **Mark as Paid** | Records exact date/time, syncs to Google Sheets instantly |
| 📣 **Complaints** | Voice recording + written notes → logged to separate Sheets tab |
| ✅ **Approval Workflow** | New subscribers & deactivations need admin approval |
| 🔄 **Sync** | Pull all records from Google Sheets back into the app |
| 🔑 **Change Password** | Any user can change their own password from Settings |
| 👥 **Account Management** | Admin can create/remove user accounts |
| 📴 **Offline** | Service worker caches app for use without internet |

---

## 🚀 Quick Start (Zero Cost)

### Option A — GitHub Pages (Recommended)
1. Fork or upload this repo to your GitHub account
2. Go to **Settings → Pages → Branch: main → Save**
3. Your app URL: `https://mail2vinothkumarv-a11y.github.io/CableApp`
4. Open that URL in **Chrome on Android** → tap **⋮ → Add to Home Screen**
5. App installs like a native Android app ✅

### Option B — Local Wi-Fi
```bash
npx serve .
# Open http://YOUR-PC-IP:3000 on Android (same Wi-Fi)
```

---

## 🔐 Default Login Credentials

| Role | Username | Password |
|---|---|---|
| Admin | `admin` | `admin123` |
| User | `user1` | `user123` |

> ⚠️ **Change passwords immediately** after first login via Settings → Change My Password.

---

## 📊 Google Sheets Integration (Free)

### Step 1 — Create Sheets
Open Google Sheets and create two tabs:
- `Subscribers` — payment records
- `Complaints` — complaint log

### Step 2 — Apps Script
1. In your sheet: **Extensions → Apps Script**
2. Delete any existing code, paste the **Code.gs** shown in the app's Setup tab
3. Click **Deploy → New Deployment → Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**, copy the **Web App URL**

### Step 3 — Configure App
1. Open SubTrack → **Setup tab**
2. Paste the Web App URL
3. Set sheet tab names (`Subscribers` / `Complaints`)
4. Tap **Save Config**

Now every "Mark as Paid" and complaint submission syncs instantly — including the **exact date and time of payment** recorded in the sheet.

---

## 📋 Sheets Column Reference

### Subscribers Sheet
| Column | Description |
|---|---|
| id | Unique subscriber ID |
| box | Setup Box ID |
| name | Subscriber name |
| address | Street address |
| area | Gugai / Karungalpatti / Other |
| amount | Monthly amount (₹) |
| status | active / inactive |
| months | All selected months |
| paidMonths | All paid months |
| newlyPaid | Month(s) paid in this transaction |
| paid | YES / NO |
| **datePaid** | Human-readable date & time of payment |
| paidAt | ISO 8601 timestamp |
| updatedAt | Last updated timestamp |

### Complaints Sheet
| Column | Description |
|---|---|
| complaintId | Unique complaint ID |
| subId | Subscriber ID |
| box | Setup Box ID |
| name | Subscriber name |
| area | Area |
| text | Written description |
| audioCount | Number of voice recordings |
| raisedBy | Username who raised it |
| timestamp | Date & time of complaint |

---

## 👥 Role Permissions

| Feature | Admin | User |
|---|---|---|
| View dashboard | ✅ | ✅ |
| Add subscriber | ✅ (auto-approved) | ✅ (needs approval) |
| Edit subscriber | ✅ | ✅ (limited) |
| Mark as paid | ✅ | ✅ |
| Raise complaint | ✅ | ✅ |
| Approve/reject requests | ✅ | ❌ |
| Settings & config | ✅ | ❌ |
| Manage accounts | ✅ | ❌ |
| Change own password | ✅ | ✅ |
| Select past months | ✅ | ❌ (current month only) |

---

## 📂 File Structure

```
subtrack/
├── index.html      # Main app (single file PWA)
├── manifest.json   # PWA manifest — enables "Add to Home Screen"
├── sw.js           # Service worker — offline caching
└── README.md       # This file
```

---

## 🛠 Customising Subscriber List

Edit the `PREDEFINED` array near the top of `index.html`:

```js
let PREDEFINED = [
  { box: 'BOX-001', name: 'Customer Name', address: 'Door No, Street', area: 'Gugai' },
  { box: 'BOX-002', name: 'Another Name',  address: 'Address here',    area: 'Karungalpatti' },
  // area must be: 'Gugai' | 'Karungalpatti' | 'Other'
];
```

---

## 🔒 Security Notes

- Passwords are stored as Base64 hashes in `localStorage` — suitable for a local trusted-device app. For production internet deployment, use a backend with proper bcrypt hashing.
- Biometric credentials use the browser's WebAuthn API and never leave the device.
- All data is stored locally in `localStorage` and synced to your own Google Sheet — no third-party servers.

---

## 📱 Tested On

- Android Chrome (v110+) — full PWA install + biometric
- iOS Safari (v16+) — PWA install works, biometric limited to Face ID
- Desktop Chrome — full functionality for admin use

---

## 📝 License

MIT — free to use and modify for personal or commercial projects.
