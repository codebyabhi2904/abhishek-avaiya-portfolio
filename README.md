# Abhishek Avaiya — Portfolio

Personal portfolio site for Abhishek Avaiya, a Shopify & Shopify Plus developer. Built with React, Vite, and GSAP.

## Stack

- React 19 + React Router
- Vite
- GSAP (scroll reveals, transitions)
- Google Analytics 4 + Google Tag Manager
- Web3Forms (contact form email delivery, with hCaptcha)

## Getting started

```bash
npm install
npm run dev
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values:

- `VITE_CONTACT_FORM_ENDPOINT` / `VITE_WEB3FORMS_ACCESS_KEY` — contact form email delivery via [Web3Forms](https://web3forms.com)
- `VITE_GA4_MEASUREMENT_ID` — Google Analytics 4
- `VITE_GTM_CONTAINER_ID` — Google Tag Manager

## Build

```bash
npm run build   # generates sitemap.xml, then builds to dist/
npm run preview # preview the production build locally
```
