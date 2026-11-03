export const articleCategories = [
  'Shopify Development',
  'Shopify Plus',
  'Shopify Liquid',
  'Performance Optimization',
  'eCommerce Development',
  'Technical Guides',
]

const wordCount = (sections) =>
  sections.reduce((count, section) => count + section.body.join(' ').split(/\s+/).length, 0)

const readingTime = (sections) => Math.max(1, Math.round(wordCount(sections) / 200))

const rawArticles = [
  {
    slug: 'online-store-2-section-architecture',
    title: 'Online Store 2.0 Section Architecture: A Practical Guide',
    category: 'Shopify Development',
    date: '2026-01-14',
    excerpt:
      'How to structure sections and blocks so merchants can rearrange a page safely, without a section library that collapses under its own weight.',
    author: 'Abhishek Avaiya',
    sections: [
      {
        heading: 'Why section structure matters more than any single section',
        body: [
          'Most theme problems I get asked to fix aren’t caused by one broken section — they’re caused by a section library that grew without a plan. Every new request got its own one-off section, until nothing shared a pattern and small changes meant editing five different files.',
          'Online Store 2.0 gives every template a flexible, section-based structure. That flexibility is only useful if the sections themselves are designed to be reused, not duplicated.',
        ],
      },
      {
        heading: 'Start with blocks, not new sections',
        body: [
          'Before creating a new section, I check whether the layout can be expressed as a block variation of something that already exists. A "content row" section with a few block types (text, image, button) can replace half a dozen single-purpose sections if the schema is designed well.',
          'This keeps the theme editor usable for merchants — fewer, more flexible sections are easier to understand than a long list of near-duplicates.',
        ],
      },
      {
        heading: 'Keep settings scoped to what the section actually needs',
        body: [
          'A section schema that exposes every possible setting "just in case" makes the editor harder to use and increases the chance of an unsupported combination breaking the layout. I scope settings to what the design actually supports, and use sensible defaults so a freshly added section looks correct immediately.',
        ],
      },
      {
        heading: 'Document intent in the section, not just the code',
        body: [
          'A short comment at the top of a section file explaining what it’s for and where it’s used saves the next person — often me, six months later — from re-reading the whole template to understand the intent.',
        ],
      },
    ],
  },
  {
    slug: 'getting-started-with-shopify-functions',
    title: 'Getting Started with Shopify Functions',
    category: 'Shopify Plus',
    date: '2026-02-03',
    excerpt:
      'Shopify Functions let you customize checkout logic with real code instead of app workarounds. Here’s how I think about when to reach for them.',
    author: 'Abhishek Avaiya',
    sections: [
      {
        heading: 'What Shopify Functions are actually for',
        body: [
          'Shopify Functions let developers customize specific parts of the checkout and cart logic — discounts, shipping methods, payment customizations, and validations — by running custom code at defined extension points, instead of relying on client-side workarounds.',
          'They’re not a replacement for apps in general. They’re the right tool when business logic needs to run reliably on Shopify’s side, at checkout, where client-side scripts can’t be trusted.',
        ],
      },
      {
        heading: 'When I reach for a Function instead of an app',
        body: [
          'If a merchant needs a discount rule that depends on logic too specific for existing discount apps — a combination of product tags, customer segments, and quantity thresholds, for example — a custom Function is often more reliable than stacking app-based workarounds.',
          'The same applies to shipping logic that needs to consider business rules an off-the-shelf shipping app doesn’t support.',
        ],
      },
      {
        heading: 'Plan the logic before writing the Function',
        body: [
          'Because Functions run server-side within strict execution limits, it pays to map out the exact rule set on paper first — inputs, conditions, and expected output — before writing code. It’s much easier to catch an edge case in a flowchart than after deploying.',
        ],
      },
      {
        heading: 'Test with real cart scenarios',
        body: [
          'I test Functions against a spread of real cart scenarios — single item, mixed cart, edge-case quantities — rather than just the happy path, since checkout logic is exactly the place where a missed edge case is most visible to customers.',
        ],
      },
    ],
  },
  {
    slug: 'liquid-performance-patterns',
    title: 'Liquid Performance: Patterns That Actually Slow Your Theme Down',
    category: 'Performance Optimization',
    date: '2026-02-20',
    excerpt:
      'A few recurring Liquid and theme patterns that quietly cost performance — and what I replace them with during an optimization pass.',
    author: 'Abhishek Avaiya',
    sections: [
      {
        heading: 'Loops that re-fetch data they already have',
        body: [
          'A common pattern I see is a `for` loop that calls `all_products` or re-queries collection data inside the loop body when the data was already available from the parent object. Pulling the needed values out once, before the loop, instead of repeatedly inside it, is a simple change with a real effect on render time for larger collections.',
        ],
      },
      {
        heading: 'Images without proper sizing hints',
        body: [
          'Serving a single large image size and letting CSS scale it down is still common in older sections. Using `image_url` with explicit widths and the `srcset`/`sizes` pattern lets the browser request an appropriately sized image instead of downloading more data than the layout needs.',
        ],
      },
      {
        heading: 'Render-blocking scripts from stacked apps',
        body: [
          'Individually, most app scripts are small. Stacked across a year of app installs, they add up — and when several load synchronously in the `<head>`, they delay everything after them. Part of a performance pass is reviewing which scripts actually need to block rendering versus which can be deferred or loaded only where they’re used.',
        ],
      },
      {
        heading: 'Unused sections and snippets left in the theme',
        body: [
          'Themes that have been through several redesigns often carry snippets and sections nothing references anymore. They don’t directly slow down a live page, but they make the codebase harder to reason about — and occasionally get mistakenly re-included. A periodic audit keeps the theme lean.',
        ],
      },
    ],
  },
  {
    slug: 'metaobjects-vs-metafields',
    title: 'Metaobjects vs Metafields: Choosing the Right Tool',
    category: 'Shopify Liquid',
    date: '2026-03-05',
    excerpt:
      'Metafields and metaobjects solve different problems. Here’s the question I ask before reaching for either.',
    author: 'Abhishek Avaiya',
    sections: [
      {
        heading: 'The question that decides it',
        body: [
          'My rule of thumb: if the data belongs to one specific resource (a product, a page, a customer), a metafield is usually the simpler fit. If the data is its own thing — an author, a store location, a size guide — that could reasonably be reused across multiple products or pages, a metaobject models it more cleanly.',
        ],
      },
      {
        heading: 'Where metafields fall short',
        body: [
          'Metafields attach to an existing resource, which works well for product-specific attributes. But once you need the same structured content — say, a "roaster profile" — referenced from multiple products, duplicating that data as repeated metafields gets harder to maintain than treating it as its own entity.',
        ],
      },
      {
        heading: 'Where metaobjects earn their complexity',
        body: [
          'Metaobjects take more setup than a metafield, but they pay off once content needs to be reused, referenced from multiple places, or managed independently of any single product. A content model for team members, store locations, or reusable FAQ entries usually fits better as metaobjects.',
        ],
      },
      {
        heading: 'Keep the content model documented',
        body: [
          'Whichever you choose, write down the structure somewhere a non-developer can find it. Metafield and metaobject definitions are easy to forget six months after setup, and merchants are the ones adding content to them day to day.',
        ],
      },
    ],
  },
]

export const articles = rawArticles.map((article) => ({
  ...article,
  readingTime: readingTime(article.sections),
}))

export const getArticleBySlug = (slug) => articles.find((article) => article.slug === slug)

export const getRelatedArticles = (currentSlug, count = 2) =>
  articles.filter((article) => article.slug !== currentSlug).slice(0, count)
