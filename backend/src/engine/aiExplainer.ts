import { CategoryResult, AIAnalysis } from '../detectors/types.js';

export function generateAIAnalysis(
  domain: string,
  categories: Record<string, CategoryResult>
): AIAnalysis {
  // Collect all detected tech names
  const allTechs: string[] = [];
  Object.values(categories).forEach(cat => {
    cat.techs.forEach(t => allTechs.push(t.name));
  });

  const hasNext = allTechs.some(t => t.includes('Next.js'));
  const hasAstro = allTechs.some(t => t.includes('Astro'));
  const hasVue = allTechs.some(t => t.includes('Vue') || t.includes('Nuxt'));
  const hasTailwind = allTechs.some(t => t.includes('Tailwind'));
  const hasStripe = allTechs.some(t => t.includes('Stripe'));
  const hasPosthog = allTechs.some(t => t.includes('PostHog'));
  const hasClerk = allTechs.some(t => t.includes('Clerk'));
  const hasSupabase = allTechs.some(t => t.includes('Supabase'));
  const hasSanity = allTechs.some(t => t.includes('Sanity'));
  const hasCloudflare = allTechs.some(t => t.includes('Cloudflare'));
  const hasVercel = allTechs.some(t => t.includes('Vercel'));

  // Archetype
  let archetype = 'Modern Full-Stack SaaS';
  if (hasAstro) archetype = 'High-Performance Content & Marketing Stack';
  else if (allTechs.some(t => t.includes('WordPress') || t.includes('Shopify'))) archetype = 'Traditional CMS / E-Commerce Monolith';
  else if (allTechs.some(t => t.includes('React') || t.includes('Vite'))) archetype = 'Single Page Application (SPA)';

  // Key highlight stack
  const stackHighlight = allTechs.slice(0, 5).join(' + ');

  const summary = `This looks like a ${archetype}. Built with ${stackHighlight || 'modern web technologies'}. Optimized for global edge delivery, rapid UI rendering, and scalable infrastructure.`;

  // Pros
  const pros: string[] = [];
  if (hasNext || hasVercel) pros.push('Hybrid SSR/SSG rendering enables instant TTFB and SEO excellence');
  if (hasTailwind) pros.push('Utility-first CSS minimizes bundle overhead and accelerates design system iteration');
  if (hasCloudflare || hasVercel) pros.push('Global CDN edge distribution ensures low latency for international users');
  if (hasStripe) pros.push('Enterprise-grade payment processing with pre-built PCI compliance');
  if (hasClerk || hasSupabase) pros.push('Decoupled authentication offloads security overhead and session management');
  if (pros.length === 0) pros.push('Clean componentized architecture with modern JavaScript tooling');

  // Cons / Potential bottlenecks
  const cons: string[] = [];
  if (hasNext) cons.push('Serverless cold starts may occasionally introduce minor latency on dynamic routes');
  if (hasPosthog || allTechs.some(t => t.includes('Analytics'))) cons.push('Multiple analytics scripts increase client-side JavaScript execution payload');
  if (allTechs.length > 8) cons.push('Third-party vendor dependencies require ongoing API secret and version management');
  if (cons.length === 0) cons.push('Relies heavily on third-party SaaS integrations for core backend primitives');

  // Recommendations
  const recommendedAlternatives = [
    {
      useCase: 'For Ultra-Fast Static Marketing Pages',
      stack: 'Astro + Tailwind CSS + Cloudflare Pages + Resend',
      rationale: 'Delivers zero-JS default bundles, achieving 100/100 Lighthouse performance scores.'
    },
    {
      useCase: 'For High-Scale Full Stack Application',
      stack: 'Next.js 14 App Router + Supabase + Stripe + Tailwind',
      rationale: 'Combines Postgres serverless database, realtime subscriptions, and seamless subscription billing.'
    }
  ];

  const developerTip = hasTailwind && hasNext
    ? '💡 Pro Tip: Leverage Next.js App Router Server Components for data fetching to strip unnecessary client JavaScript!'
    : '💡 Pro Tip: Set up aggressive HTTP caching headers and image optimization to maximize core web vitals!';

  return {
    stackSummary: summary,
    archetype,
    architecturalPros: pros,
    architecturalCons: cons,
    recommendedAlternatives,
    developerTip
  };
}
