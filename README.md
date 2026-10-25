# SofaZilla – React + TypeScript + Vite + Tailwind

A catalogue-style sofa store. Customers browse products and order via WhatsApp / Facebook Messenger (no cart or checkout).

## Run locally
```
npm install
npm run dev        # http://localhost:5173
```

## Build / preview
```
npm run build
npm run preview
```

## Set your details
Copy `.env.example` to `.env` and set WhatsApp number (digits only, with country code, e.g. 447912345678), phone, email, Facebook link and Messenger username (`https://m.me/YOURPAGE`).
On Vercel add the same keys under Project > Settings > Environment Variables.

## Deploy to Vercel
1. Push this folder to GitHub.
2. vercel.com > Add New Project > import the repo. Vite is auto-detected (build `npm run build`, output `dist`).
3. Add the environment variables, then Deploy. `vercel.json` handles refreshes on routes like /product/verona-u.

## Edit content
- Products, categories, materials, sizes: `src/data/products.ts`  (21 products; replace the stock photo ids with your own images)
- FAQs: `src/data/faq.ts`
- Legal / About / Delivery / Returns text: `src/pages/InfoPages.tsx`
- Sample reviews: `REVIEWS` in `src/data/products.ts`. Replace with real ones.
