import * as cheerio from 'cheerio';
import { DetectedTech } from './types.js';

export function detectCMS(html: string, $: cheerio.CheerioAPI): DetectedTech[] {
  const results: DetectedTech[] = [];
  const lowerHtml = html.toLowerCase();

  // Sanity
  if (lowerHtml.includes('sanity.io') || lowerHtml.includes('cdn.sanity.io') || lowerHtml.includes('sanity-studio')) {
    results.push({
      name: 'Sanity',
      category: 'CMS',
      icon: 'sanity',
      confidence: 99,
      evidence: ['Found `cdn.sanity.io` dataset query or Sanity Studio client'],
      description: 'The platform for structured content',
      website: 'https://sanity.io'
    });
  }

  // Contentful
  if (lowerHtml.includes('contentful.com') || lowerHtml.includes('assets.ctfassets.net')) {
    results.push({
      name: 'Contentful',
      category: 'CMS',
      icon: 'contentful',
      confidence: 99,
      evidence: ['Found `assets.ctfassets.net` Contentful GraphQL asset endpoint'],
      description: 'Composable content platform for digital-first business',
      website: 'https://contentful.com'
    });
  }

  // WordPress
  if (lowerHtml.includes('wp-content') || lowerHtml.includes('wp-json') || lowerHtml.includes('wordpress')) {
    results.push({
      name: 'WordPress',
      category: 'CMS',
      icon: 'wordpress',
      confidence: 99,
      evidence: ['Found `/wp-json/` REST API endpoints or `/wp-content/` directory'],
      description: 'The world\'s most popular CMS and blogging engine',
      website: 'https://wordpress.org'
    });
  }

  // Ghost
  if (lowerHtml.includes('ghost.org') || lowerHtml.includes('ghost-sdk') || $('meta[name="generator"][content*="Ghost"]').length > 0) {
    results.push({
      name: 'Ghost CMS',
      category: 'CMS',
      icon: 'ghost',
      confidence: 98,
      evidence: ['Found Ghost generator meta tag or `ghost-search` script'],
      description: 'Independent publishing software for creators and journalists',
      website: 'https://ghost.org'
    });
  }

  // Strapi
  if (lowerHtml.includes('strapi') || lowerHtml.includes('/uploads/') && lowerHtml.includes('api::')) {
    results.push({
      name: 'Strapi',
      category: 'CMS',
      icon: 'strapi',
      confidence: 94,
      evidence: ['Found Strapi headless API payload format or uploaded asset structure'],
      description: 'Open source Node.js Headless CMS',
      website: 'https://strapi.io'
    });
  }

  // Builder.io
  if (lowerHtml.includes('builder.io') || lowerHtml.includes('cdn.builder.io')) {
    results.push({
      name: 'Builder.io',
      category: 'CMS',
      icon: 'builder',
      confidence: 99,
      evidence: ['Found `cdn.builder.io` visual headless CMS content API'],
      description: 'Visual CMS for React, Vue, Qwik, and Next.js',
      website: 'https://builder.io'
    });
  }

  // Payload CMS
  if (lowerHtml.includes('payloadcms') || lowerHtml.includes('payload')) {
    results.push({
      name: 'Payload CMS',
      category: 'CMS',
      icon: 'payload',
      confidence: 90,
      evidence: ['Found Payload TypeScript Headless CMS payload format'],
      description: 'The premier Node.js & TypeScript Headless CMS',
      website: 'https://payloadcms.com'
    });
  }

  return results;
}
