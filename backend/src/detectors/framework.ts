import * as cheerio from 'cheerio';
import { DetectedTech } from './types.js';

export function detectFramework(html: string, headers: Record<string, string>, $: cheerio.CheerioAPI): DetectedTech[] {
  const results: DetectedTech[] = [];
  const lowerHtml = html.toLowerCase();
  const generator = $('meta[name="generator"]').attr('content') || '';
  const lowerGen = generator.toLowerCase();

  // Next.js
  if (
    lowerHtml.includes('_next/') ||
    lowerHtml.includes('__next_data__') ||
    lowerHtml.includes('__next') ||
    headers['x-nextjs-page'] ||
    headers['x-powered-by']?.toLowerCase().includes('next.js')
  ) {
    const evidence = [];
    if (lowerHtml.includes('_next/')) evidence.push('Found JS bundle path `_next/`');
    if (lowerHtml.includes('__next_data__')) evidence.push('Found JSON state payload `__NEXT_DATA__`');
    if (headers['x-nextjs-page']) evidence.push('Header `x-nextjs-page` present');
    results.push({
      name: 'Next.js',
      category: 'Framework',
      icon: 'nextjs',
      confidence: 99,
      evidence,
      description: 'The React Framework for the Web by Vercel',
      website: 'https://nextjs.org'
    });
  }

  // Astro
  if (lowerHtml.includes('astro-') || lowerGen.includes('astro') || $('[data-astro-cid]').length > 0) {
    results.push({
      name: 'Astro',
      category: 'Framework',
      icon: 'astro',
      confidence: 95,
      evidence: ['Found `data-astro-cid` HTML attributes or generator tag'],
      description: 'The web framework for content-driven websites',
      website: 'https://astro.build'
    });
  }

  // Nuxt
  if (
    lowerHtml.includes('_nuxt/') ||
    lowerHtml.includes('__nuxt') ||
    lowerHtml.includes('$nuxt') ||
    headers['x-powered-by']?.toLowerCase().includes('nuxt')
  ) {
    results.push({
      name: 'Nuxt.js',
      category: 'Framework',
      icon: 'nuxtjs',
      confidence: 98,
      evidence: ['Found `_nuxt/` asset path or `__NUXT__` global scope'],
      description: 'The Intuitive Vue Framework',
      website: 'https://nuxt.com'
    });
  }

  // Gatsby
  if (lowerHtml.includes('gatsby-') || lowerGen.includes('gatsby') || lowerHtml.includes('___gatsby')) {
    results.push({
      name: 'Gatsby',
      category: 'Framework',
      icon: 'gatsby',
      confidence: 95,
      evidence: ['Found Gatsby wrapper element or generator meta tag'],
      description: 'The open-source framework based on React',
      website: 'https://www.gatsbyjs.com'
    });
  }

  // Remix
  if (lowerHtml.includes('__remixcontext') || lowerHtml.includes('remix-')) {
    results.push({
      name: 'Remix',
      category: 'Framework',
      icon: 'remix',
      confidence: 96,
      evidence: ['Found `__remixContext` global hydration state'],
      description: 'Full stack web framework focused on web standards',
      website: 'https://remix.run'
    });
  }

  // Svelte / SvelteKit
  if (lowerHtml.includes('svelte-') || lowerGen.includes('svelte') || lowerHtml.includes('__sveltekit')) {
    results.push({
      name: 'SvelteKit / Svelte',
      category: 'Framework',
      icon: 'svelte',
      confidence: 92,
      evidence: ['Found Svelte component markers or `__sveltekit` manifest'],
      description: 'Cybernetically enhanced web apps',
      website: 'https://svelte.dev'
    });
  }

  // SolidJS / SolidStart
  if (lowerHtml.includes('solid-js') || lowerHtml.includes('_solid')) {
    results.push({
      name: 'SolidJS',
      category: 'Framework',
      icon: 'solidjs',
      confidence: 90,
      evidence: ['Detected SolidJS signal runtime markers'],
      description: 'Declarative, efficient and flexible JavaScript library for building user interfaces',
      website: 'https://www.solidjs.com'
    });
  }

  // React (Core UI Library) - if not already identified via Next.js/Gatsby/Remix
  if (
    (lowerHtml.includes('react') || lowerHtml.includes('react-dom') || lowerHtml.includes('data-reactroot')) &&
    !results.some(r => ['Next.js', 'Gatsby', 'Remix'].includes(r.name))
  ) {
    results.push({
      name: 'React',
      category: 'Framework',
      icon: 'react',
      confidence: 88,
      evidence: ['Found React DOM attributes or React bundle scripts'],
      description: 'The library for web and native user interfaces',
      website: 'https://react.dev'
    });
  }

  // Vue.js
  if (
    (lowerHtml.includes('vue') || lowerHtml.includes('data-v-') || lowerHtml.includes('v-bind')) &&
    !results.some(r => r.name === 'Nuxt.js')
  ) {
    results.push({
      name: 'Vue.js',
      category: 'Framework',
      icon: 'vue',
      confidence: 88,
      evidence: ['Found Vue `data-v-` component scope attributes'],
      description: 'The Progressive JavaScript Framework',
      website: 'https://vuejs.org'
    });
  }

  // Angular
  if (lowerHtml.includes('ng-version') || lowerHtml.includes('ng-app') || lowerHtml.includes('app-root')) {
    results.push({
      name: 'Angular',
      category: 'Framework',
      icon: 'angular',
      confidence: 95,
      evidence: ['Found `ng-version` or `<app-root>` Angular tags'],
      description: 'Deliver web apps with modern web developer platform',
      website: 'https://angular.dev'
    });
  }

  // WordPress
  if (lowerHtml.includes('wp-content') || lowerHtml.includes('wp-includes') || lowerGen.includes('wordpress')) {
    results.push({
      name: 'WordPress',
      category: 'Framework',
      icon: 'wordpress',
      confidence: 99,
      evidence: ['Found `/wp-content/` media paths or generator tag'],
      description: 'Open source publishing platform',
      website: 'https://wordpress.org'
    });
  }

  // Webflow
  if (lowerHtml.includes('webflow') || lowerGen.includes('webflow') || lowerHtml.includes('w-nav')) {
    results.push({
      name: 'Webflow',
      category: 'Framework',
      icon: 'webflow',
      confidence: 96,
      evidence: ['Found Webflow CSS class prefix `w-` or script markers'],
      description: 'Visual web development platform',
      website: 'https://webflow.com'
    });
  }

  // Framer
  if (lowerHtml.includes('framer') || lowerGen.includes('framer')) {
    results.push({
      name: 'Framer',
      category: 'Framework',
      icon: 'framer',
      confidence: 96,
      evidence: ['Found Framer motion site canvas generator tag'],
      description: 'Design and publish web apps visually',
      website: 'https://framer.com'
    });
  }

  // Shopify
  if (lowerHtml.includes('cdn.shopify.com') || lowerHtml.includes('shopify') || headers['x-shopid']) {
    results.push({
      name: 'Shopify',
      category: 'Framework',
      icon: 'shopify',
      confidence: 98,
      evidence: ['Found `cdn.shopify.com` assets or `x-shopid` headers'],
      description: 'E-commerce platform',
      website: 'https://shopify.com'
    });
  }

  // Vite build tool indicator
  if (lowerHtml.includes('@vite/client') || lowerHtml.includes('vite/assets')) {
    results.push({
      name: 'Vite',
      category: 'Framework',
      icon: 'vite',
      confidence: 90,
      evidence: ['Found `@vite/client` module script tag'],
      description: 'Next Generation Frontend Tooling',
      website: 'https://vitejs.dev'
    });
  }

  return results;
}
