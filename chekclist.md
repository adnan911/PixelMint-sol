এটাই তোমার **Final APK Checklist** (Seeker + Seed Vault + Standard NFT + Pinata + Fee plan) — একদম “কী কী ঠিক থাকলে APK বানাবে” ✅
আমি প্রতিটা আইটেমে **কোথায় চেক করবে**ও লিখে দিলাম।

---

# A) Web App (Production) ✅

## A1) Build passes

### কোথায়: **Cursor Terminal**

```bash
npm run build
```

✅ error ছাড়া build complete হতে হবে।

## A2) Typecheck / lint (যদি আছে)

### কোথায়: **Cursor Terminal**

```bash
npm run typecheck
npm run lint
```

✅ fail হলে আগে ঠিক করবে।

---

# B) Wallet + Seeker (Must) ✅

## B1) APK বা Seeker Chrome—দুইখানেই Seed Vault দেখায়

### কোথায়: **Seeker device**

- Connect → list এ **Seed Vault / Mobile Wallet Adapter** দেখায় ✅
- Connect success ✅

## B2) Mainnet RPC confirm

### কোথায়: **Vercel env + app UI**

Vercel env এ:

- `VITE_SOLANA_RPC_URL` mainnet RPC ✅

(চাইলে UI তে RPC print করো)

---

# C) Standard NFT Mint Flow ✅

## C1) Canvas export works

### কোথায়: **Web/App UI**

- Mint click করলে export error না আসে ✅
- `PixelCanvas.tsx` এ `exportPngBase64()` কাজ করে ✅

## C2) Pinata upload works

### কোথায়: **Terminal / Postman**

Upload endpoint POST করলে:

- `cid`
- `ipfsUrl`
  ফেরত আসে ✅

(তুমি আগেই confirm করেছো ✅)

## C3) Fee plan correct

### কোথায়: **Vercel env**

- `VITE_TREASURY_PUBKEY = GPPeDtd8kh7CB7jXsLDJmZcCgJZU3RxnkqzDUyEf61cX` ✅

### কোথায়: **App code**

- `MAINTENANCE_FEE_SOL = 0.0015` ✅

## C4) On-chain result checks

### কোথায়: **Seeker / Explorer**

Mint success হলে:

- Tx signature পাওয়া যায় ✅
- Explorer এ mainnet confirm ✅
- তোমার treasury wallet এ **0.0015 SOL** জমা পড়েছে ✅

---

# D) Vercel + Secrets ✅

## D1) Secrets only in Vercel (not in repo)

### কোথায়: **Git check**

Repo-তে যেন না থাকে:

- Pinata JWT
- any private key

### কোথায়: **Vercel dashboard**

- `PINATA_JWT` (Sensitive ON) ✅

## D2) Redeploy after env change

### কোথায়: **Vercel**

Env update করলে redeploy হয়েছে ✅

---

# E) TWA / APK Trust (Critical) ✅

## E1) assetlinks.json live + correct

### কোথায়: **Browser**

Open:
`https://pixel-mint-sol.vercel.app/.well-known/assetlinks.json`

Must contain:

- `package_name: "com.onchainerslab.pixelmint"` ✅
- `sha256_cert_fingerprints: ["REAL_SHA256"]` ✅

## E2) APK opens full-screen (no URL bar)

### কোথায়: **Seeker APK**

- No URL bar ✅
- Looks like app ✅
- “Running in Chrome” notification may exist (OK) ✅

---

# F) Android Studio Release Build ✅

## F1) Keystore locked

### কোথায়: **Local machine**

- Strong keystore password ✅
- Keystore backed up ✅
- You will never change keystore after publishing ✅

## F2) Signed APK/AAB generate OK

### কোথায়: **Android Studio**

- Build → Generate Signed Bundle/APK → success ✅

---

# G) Final “Pre-Submit” QA (5 মিনিট) ✅

### কোথায়: **Seeker APK**

1. Fresh install (uninstall then install again) ✅
2. Open app → loads fast ✅
3. Connect → Seed Vault ✅
4. Mint → approve tx ✅
5. Confirm success + treasury received fee ✅
6. Close app → reopen → still works ✅
