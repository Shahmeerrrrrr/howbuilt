import { FullScanResult } from '../detectors/types.js';

export const FAMOUS_PRESETS: Record<string, FullScanResult> = {
  'stripe.com': {
    url: 'https://stripe.com',
    normalizedUrl: 'https://stripe.com',
    domain: 'stripe.com',
    scannedAt: new Date().toISOString(),
    statusCode: 200,
    serverHeader: 'cloudflare',
    categories: {
      framework: {
        category: 'framework',
        label: 'Framework',
        techs: [
          {
            name: 'Next.js',
            category: 'Framework',
            icon: 'nextjs',
            confidence: 99,
            evidence: ['Found `_next/` static JS chunks and `__NEXT_DATA__` hydration payload'],
            description: 'The React Framework for the Web by Vercel',
            website: 'https://nextjs.org'
          },
          {
            name: 'React',
            category: 'Framework',
            icon: 'react',
            confidence: 98,
            evidence: ['Found React DOM fiber attributes and JSX runtime'],
            description: 'The library for web and native user interfaces',
            website: 'https://react.dev'
          }
        ]
      },
      hosting: {
        category: 'hosting',
        label: 'Hosting & CDN',
        techs: [
          {
            name: 'Cloudflare',
            category: 'Hosting & CDN',
            icon: 'cloudflare',
            confidence: 99,
            evidence: ['Server header `cloudflare` and `cf-ray` edge ID'],
            description: 'Global cloud edge network and security',
            website: 'https://cloudflare.com'
          },
          {
            name: 'AWS CloudFront',
            category: 'Hosting & CDN',
            icon: 'aws',
            confidence: 95,
            evidence: ['Media distribution via AWS CloudFront global edge'],
            description: 'Amazon Web Services CDN',
            website: 'https://aws.amazon.com/cloudfront/'
          }
        ]
      },
      css: {
        category: 'css',
        label: 'CSS / Styling',
        techs: [
          {
            name: 'Tailwind CSS',
            category: 'CSS / Styling',
            icon: 'tailwindcss',
            confidence: 99,
            evidence: ['Found `--tw-ring-color`, `--tw-shadow` CSS variables and utility classes'],
            description: 'A utility-first CSS framework for rapid UI development',
            website: 'https://tailwindcss.com'
          }
        ]
      },
      fonts: {
        category: 'fonts',
        label: 'Fonts',
        techs: [
          {
            name: 'Inter',
            category: 'Fonts',
            icon: 'font',
            confidence: 95,
            evidence: ['Custom web font declaration for Inter variable font'],
            description: 'A typeface specially designed for computer screens',
            website: 'https://rsms.me/inter/'
          }
        ]
      },
      analytics: {
        category: 'analytics',
        label: 'Analytics',
        techs: [
          {
            name: 'Google Analytics (GA4)',
            category: 'Analytics',
            icon: 'googleanalytics',
            confidence: 99,
            evidence: ['Found `gtag/js` script tag and GA container'],
            description: 'Web analytics service by Google',
            website: 'https://analytics.google.com'
          }
        ]
      },
      payments: {
        category: 'payments',
        label: 'Payments',
        techs: [
          {
            name: 'Stripe',
            category: 'Payments',
            icon: 'stripe',
            confidence: 100,
            evidence: ['Native Stripe payment infrastructure & JS SDK v3'],
            description: 'Financial infrastructure for the internet',
            website: 'https://stripe.com'
          }
        ]
      },
      auth: {
        category: 'auth',
        label: 'Authentication',
        techs: [
          {
            name: 'Custom OAuth2 / WebAuthn',
            category: 'Authentication',
            icon: 'lock',
            confidence: 90,
            evidence: ['Custom Stripe Account Identity & Hardware Key MFA'],
            description: 'In-house secure identity system',
            website: 'https://stripe.com'
          }
        ]
      },
      images: {
        category: 'images',
        label: 'Images & Media',
        techs: [
          {
            name: 'Cloudinary',
            category: 'Images & Media',
            icon: 'cloudinary',
            confidence: 95,
            evidence: ['Found `res.cloudinary.com` dynamic asset optimization'],
            description: 'Media management and optimization platform',
            website: 'https://cloudinary.com'
          }
        ]
      },
      cms: {
        category: 'cms',
        label: 'CMS',
        techs: [
          {
            name: 'Custom Headless CMS',
            category: 'CMS',
            icon: 'cms',
            confidence: 85,
            evidence: ['Markdown/MDX content pipeline with localized translation API'],
            description: 'Internal documentation and blog management engine'
          }
        ]
      }
    },
    security: {
      score: 'A+',
      cookiesCount: 3,
      headers: [
        { header: 'Content-Security-Policy', status: 'PRESENT', value: "default-src 'self' https://js.stripe.com...", recommendation: 'Excellent CSP protection active.' },
        { header: 'Strict-Transport-Security', status: 'PRESENT', value: 'max-age=31536000; includeSubDomains; preload', recommendation: 'HSTS enabled.' },
        { header: 'X-Frame-Options', status: 'PRESENT', value: 'DENY', recommendation: 'Clickjacking prevented.' },
        { header: 'X-Content-Type-Options', status: 'PRESENT', value: 'nosniff', recommendation: 'MIME sniffing disabled.' }
      ]
    },
    performance: {
      score: 94,
      ttfbMs: 142,
      htmlSizeBytes: 184200,
      totalScriptCount: 14,
      totalStyleCount: 4,
      totalImageCount: 22
    },
    aiAnalysis: {
      stackSummary: 'This looks like a modern SaaS stack. Next.js + Tailwind CSS + Cloudflare + Stripe + Custom Edge APIs.',
      archetype: 'Modern Edge-Rendered SaaS Engine',
      architecturalPros: [
        'Hybrid SSR/SSG rendering provides sub-150ms TTFB globally',
        'Tailwind CSS design system enables pixel-perfect responsive layouts',
        'Cloudflare Edge shields against DDoS attacks and handles SSL termination'
      ],
      architecturalCons: [
        'High complexity in edge routing and localized content hydration'
      ],
      recommendedAlternatives: [
        {
          useCase: 'For Lean Startup MVP',
          stack: 'Next.js + Tailwind + Supabase + Stripe',
          rationale: 'Allows launching full product in days without managing custom backend server logic.'
        }
      ],
      developerTip: '💡 Pro Tip: Stripe uses custom WebGL animations and canvas rendering alongside Next.js for high-impact visual performance!'
    },
    rawStats: {
      htmlLength: 184200,
      metaTagsCount: 24,
      scriptsCount: 14,
      headersCount: 18
    }
  },
  'vercel.com': {
    url: 'https://vercel.com',
    normalizedUrl: 'https://vercel.com',
    domain: 'vercel.com',
    scannedAt: new Date().toISOString(),
    statusCode: 200,
    serverHeader: 'Vercel',
    categories: {
      framework: {
        category: 'framework',
        label: 'Framework',
        techs: [
          { name: 'Next.js', category: 'Framework', icon: 'nextjs', confidence: 100, evidence: ['Found `_next/` app router bundle and `x-vercel-id`'], description: 'The React Framework for the Web by Vercel', website: 'https://nextjs.org' },
          { name: 'React', category: 'Framework', icon: 'react', confidence: 99, evidence: ['React 19 Server Components'], description: 'UI Library', website: 'https://react.dev' }
        ]
      },
      hosting: {
        category: 'hosting',
        label: 'Hosting & CDN',
        techs: [
          { name: 'Vercel', category: 'Hosting & CDN', icon: 'vercel', confidence: 100, evidence: ['Header `x-vercel-id: iad1::...`'], description: 'Frontend Cloud Platform', website: 'https://vercel.com' }
        ]
      },
      css: {
        category: 'css',
        label: 'CSS / Styling',
        techs: [
          { name: 'Tailwind CSS', category: 'CSS / Styling', icon: 'tailwindcss', confidence: 99, evidence: ['Geist Design System with Tailwind CSS v4'], description: 'Utility-first CSS', website: 'https://tailwindcss.com' },
          { name: 'Shadcn / Radix UI', category: 'CSS / Styling', icon: 'radix', confidence: 96, evidence: ['Found `data-radix-*` primitives'], description: 'Accessible components', website: 'https://radix-ui.com' }
        ]
      },
      fonts: {
        category: 'fonts',
        label: 'Fonts',
        techs: [
          { name: 'Geist / Geist Mono', category: 'Fonts', icon: 'font', confidence: 100, evidence: ['Native Geist font font-family definition'], description: 'Vercel design typeface', website: 'https://vercel.com/font' }
        ]
      },
      analytics: {
        category: 'analytics',
        label: 'Analytics',
        techs: [
          { name: 'Vercel Analytics', category: 'Analytics', icon: 'vercel', confidence: 99, evidence: ['`/_vercel/insights/script.js` injection'], description: 'Privacy-first web vitals monitoring', website: 'https://vercel.com/analytics' }
        ]
      },
      payments: {
        category: 'payments',
        label: 'Payments',
        techs: [
          { name: 'Stripe', category: 'Payments', icon: 'stripe', confidence: 98, evidence: ['Stripe Billing SDK & Elements'], description: 'Usage-based billing engine', website: 'https://stripe.com' }
        ]
      },
      auth: {
        category: 'auth',
        label: 'Authentication',
        techs: [
          { name: 'WorkOS / SAML', category: 'Authentication', icon: 'workos', confidence: 95, evidence: ['Enterprise SSO login endpoints'], description: 'Enterprise Auth', website: 'https://workos.com' }
        ]
      },
      images: {
        category: 'images',
        label: 'Images & Media',
        techs: [
          { name: 'Vercel Image Optimization', category: 'Images & Media', icon: 'vercel', confidence: 100, evidence: ['`/_next/image` route with AVIF format'], description: 'On-demand image transform', website: 'https://vercel.com' }
        ]
      },
      cms: {
        category: 'cms',
        label: 'CMS',
        techs: [
          { name: 'Contentful', category: 'CMS', icon: 'contentful', confidence: 92, evidence: ['Contentful GraphQL asset domain'], description: 'Composable Content Platform', website: 'https://contentful.com' }
        ]
      }
    },
    security: {
      score: 'A+',
      cookiesCount: 2,
      headers: [
        { header: 'Strict-Transport-Security', status: 'PRESENT', value: 'max-age=63072000; includeSubDomains; preload', recommendation: 'HSTS enabled.' },
        { header: 'X-Frame-Options', status: 'PRESENT', value: 'SAMEORIGIN', recommendation: 'Frame security enabled.' }
      ]
    },
    performance: {
      score: 98,
      ttfbMs: 65,
      htmlSizeBytes: 142000,
      totalScriptCount: 8,
      totalStyleCount: 2,
      totalImageCount: 16
    },
    aiAnalysis: {
      stackSummary: 'This looks like a cutting-edge Jamstack SaaS architecture. Next.js App Router + Vercel Edge + Geist Font + Tailwind + Contentful.',
      archetype: 'Edge-First Full Stack SaaS',
      architecturalPros: [
        'Native Vercel Edge Runtime ensures sub-70ms global latency',
        'Geist typography and Tailwind CSS v4 ensure immaculate aesthetic consistency',
        'Vercel Analytics tracks Core Web Vitals without blocking render'
      ],
      architecturalCons: ['Tight vendor coupling to Vercel ecosystem ecosystem primitives'],
      recommendedAlternatives: [
        { useCase: 'For Multi-Cloud Setup', stack: 'Next.js + AWS Amplify / CloudFront + Tailwind', rationale: 'Avoid single vendor lock-in while preserving React SSR capabilities.' }
      ],
      developerTip: '💡 Pro Tip: Vercel uses Partial Prerendering (PPR) to stream dynamic content inside static shell frames!'
    },
    rawStats: { htmlLength: 142000, metaTagsCount: 28, scriptsCount: 8, headersCount: 16 }
  }
};
