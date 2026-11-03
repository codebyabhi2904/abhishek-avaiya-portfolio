// Google Analytics 4 + Google Tag Manager. Both are optional and
// independent — set VITE_GA4_MEASUREMENT_ID and/or VITE_GTM_CONTAINER_ID to
// enable them. Neither is configured on the live reference site at the time
// this was written, so both stay inactive (no scripts loaded, no network
// requests) until real IDs are supplied.
const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID
const GTM_ID = import.meta.env.VITE_GTM_CONTAINER_ID

let initialized = false

export function initAnalytics() {
  if (initialized || (!GA4_ID && !GTM_ID)) return
  initialized = true

  window.dataLayer = window.dataLayer || []
  // eslint-disable-next-line no-inner-declarations
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())

  if (GTM_ID) {
    // GTM's own bootstrap event — not a gtag() call, which is only for
    // GA4/Ads destinations and isn't valid for a GTM container ID.
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
    document.head.appendChild(script)

    const noscript = document.createElement('noscript')
    const iframe = document.createElement('iframe')
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`
    iframe.height = '0'
    iframe.width = '0'
    iframe.style.display = 'none'
    iframe.style.visibility = 'hidden'
    noscript.appendChild(iframe)
    document.body.prepend(noscript)
  }

  if (GA4_ID) {
    gtag('config', GA4_ID, { send_page_view: false })
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
    document.head.appendChild(script)
  }
}

// Call on every route change — gtag.js only auto-tracks the first load, so
// SPA navigations need an explicit page_view event.
export function trackPageView(path) {
  if (!window.gtag) return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}
