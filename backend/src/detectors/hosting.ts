import { DetectedTech } from './types.js';

export function detectHosting(html: string, headers: Record<string, string>): DetectedTech[] {
  const results: DetectedTech[] = [];
  const server = (headers['server'] || '').toLowerCase();
  const via = (headers['via'] || '').toLowerCase();
  const lowerHtml = html.toLowerCase();

  // Vercel
  if (
    server.includes('vercel') ||
    headers['x-vercel-id'] ||
    headers['x-vercel-cache'] ||
    via.includes('vercel')
  ) {
    results.push({
      name: 'Vercel',
      category: 'Hosting & CDN',
      icon: 'vercel',
      confidence: 99,
      evidence: [
        headers['x-vercel-id'] ? `Header \`x-vercel-id\`: ${headers['x-vercel-id']}` : 'Server header `Vercel` detected'
      ],
      description: 'Develop. Preview. Ship. Frontend Cloud platform',
      website: 'https://vercel.com'
    });
  }

  // Cloudflare
  if (
    server.includes('cloudflare') ||
    headers['cf-ray'] ||
    headers['cf-cache-status'] ||
    lowerHtml.includes('cloudflare')
  ) {
    results.push({
      name: 'Cloudflare',
      category: 'Hosting & CDN',
      icon: 'cloudflare',
      confidence: 99,
      evidence: [
        headers['cf-ray'] ? `Header \`cf-ray\`: ${headers['cf-ray']}` : 'Server response header `cloudflare`'
      ],
      description: 'Global cloud edge network, CDN, and security platform',
      website: 'https://cloudflare.com'
    });
  }

  // Netlify
  if (
    server.includes('netlify') ||
    headers['x-nf-request-id'] ||
    headers['x-netlify-cache'] ||
    lowerHtml.includes('netlify')
  ) {
    results.push({
      name: 'Netlify',
      category: 'Hosting & CDN',
      icon: 'netlify',
      confidence: 99,
      evidence: [
        headers['x-nf-request-id'] ? `Header \`x-nf-request-id\`: ${headers['x-nf-request-id']}` : 'Netlify edge server'
      ],
      description: 'The modern web development platform',
      website: 'https://netlify.com'
    });
  }

  // AWS CloudFront / S3
  if (
    via.includes('cloudfront') ||
    headers['x-amz-cf-id'] ||
    headers['x-amz-cf-pop'] ||
    server.includes('amazons3')
  ) {
    results.push({
      name: 'AWS CloudFront / S3',
      category: 'Hosting & CDN',
      icon: 'aws',
      confidence: 98,
      evidence: [
        headers['x-amz-cf-id'] ? `Header \`x-amz-cf-id\`: ${headers['x-amz-cf-id']}` : 'AWS CloudFront proxy via header'
      ],
      description: 'Amazon Web Services global content delivery network',
      website: 'https://aws.amazon.com/cloudfront/'
    });
  }

  // Fastly CDN
  if (headers['x-fastly-request-id'] || via.includes('fastly')) {
    results.push({
      name: 'Fastly CDN',
      category: 'Hosting & CDN',
      icon: 'fastly',
      confidence: 98,
      evidence: [`Header \`x-fastly-request-id\`: ${headers['x-fastly-request-id'] || 'Detected'}`],
      description: 'Edge cloud platform built for speed and security',
      website: 'https://fastly.com'
    });
  }

  // GitHub Pages
  if (server.includes('github.com') || headers['x-github-request-id']) {
    results.push({
      name: 'GitHub Pages',
      category: 'Hosting & CDN',
      icon: 'github',
      confidence: 99,
      evidence: ['Server header `GitHub.com` or `x-github-request-id`'],
      description: 'Websites hosted directly from a GitHub repository',
      website: 'https://pages.github.com'
    });
  }

  // Render
  if (server.includes('render') || headers['rndr-id']) {
    results.push({
      name: 'Render',
      category: 'Hosting & CDN',
      icon: 'render',
      confidence: 95,
      evidence: ['Server header `Render` or `rndr-id` header'],
      description: 'Cloud Application Hosting Platform',
      website: 'https://render.com'
    });
  }

  // Fly.io
  if (server.includes('fly') || headers['fly-request-id']) {
    results.push({
      name: 'Fly.io',
      category: 'Hosting & CDN',
      icon: 'flyio',
      confidence: 96,
      evidence: ['Header `fly-request-id` present'],
      description: 'Deploy app servers close to your users',
      website: 'https://fly.io'
    });
  }

  // Nginx
  if (server.includes('nginx') && !results.some(r => r.name === 'Vercel')) {
    results.push({
      name: 'Nginx',
      category: 'Hosting & CDN',
      icon: 'nginx',
      confidence: 85,
      evidence: [`Server HTTP header: \`${headers['server']}\``],
      description: 'High-performance HTTP server and reverse proxy',
      website: 'https://nginx.org'
    });
  }

  return results;
}
