import * as cheerio from 'cheerio';
import { DetectedTech } from './types.js';

export function detectAnalytics(html: string, $: cheerio.CheerioAPI): DetectedTech[] {
  const results: DetectedTech[] = [];
  const lowerHtml = html.toLowerCase();

  // Google Analytics / GA4
  if (
    lowerHtml.includes('googletagmanager.com') ||
    lowerHtml.includes('google-analytics.com') ||
    lowerHtml.includes('gtag(') ||
    lowerHtml.includes('ga(')
  ) {
    results.push({
      name: 'Google Analytics (GA4)',
      category: 'Analytics',
      icon: 'googleanalytics',
      confidence: 99,
      evidence: ['Found `googletagmanager.com/gtag/js` script tag or `gtag()` invocation'],
      description: 'Web analytics service offered by Google',
      website: 'https://analytics.google.com'
    });
  }

  // PostHog
  if (lowerHtml.includes('posthog') || lowerHtml.includes('app.posthog.com') || lowerHtml.includes('us.i.posthog.com')) {
    results.push({
      name: 'PostHog',
      category: 'Analytics',
      icon: 'posthog',
      confidence: 98,
      evidence: ['Found `posthog.init()` bundle script or PostHog ingestion domain'],
      description: 'Open source product analytics and feature flags',
      website: 'https://posthog.com'
    });
  }

  // Mixpanel
  if (lowerHtml.includes('mixpanel') || lowerHtml.includes('cdn.mxpnl.com')) {
    results.push({
      name: 'Mixpanel',
      category: 'Analytics',
      icon: 'mixpanel',
      confidence: 97,
      evidence: ['Found `cdn.mxpnl.com` tracking script or `mixpanel.init`'],
      description: 'Product analytics software for mobile & web',
      website: 'https://mixpanel.com'
    });
  }

  // Amplitude
  if (lowerHtml.includes('amplitude.com') || lowerHtml.includes('cdn.amplitude.com')) {
    results.push({
      name: 'Amplitude',
      category: 'Analytics',
      icon: 'amplitude',
      confidence: 97,
      evidence: ['Found `amplitude.com` script tag'],
      description: 'Digital analytics platform',
      website: 'https://amplitude.com'
    });
  }

  // Plausible Analytics
  if (lowerHtml.includes('plausible.io') || lowerHtml.includes('plausible.js')) {
    results.push({
      name: 'Plausible Analytics',
      category: 'Analytics',
      icon: 'plausible',
      confidence: 99,
      evidence: ['Found `plausible.js` lightweight script embedding'],
      description: 'Privacy-friendly open source web analytics',
      website: 'https://plausible.io'
    });
  }

  // Segment
  if (lowerHtml.includes('cdn.segment.com') || lowerHtml.includes('analytics.js')) {
    results.push({
      name: 'Segment',
      category: 'Analytics',
      icon: 'segment',
      confidence: 95,
      evidence: ['Found `cdn.segment.com/analytics.js` script injection'],
      description: 'Customer Data Platform (CDP)',
      website: 'https://segment.com'
    });
  }

  // Hotjar
  if (lowerHtml.includes('static.hotjar.com') || lowerHtml.includes('hj(')) {
    results.push({
      name: 'Hotjar',
      category: 'Analytics',
      icon: 'hotjar',
      confidence: 98,
      evidence: ['Found `static.hotjar.com` heatmaps tracking script'],
      description: 'Website heatmaps and behavior analytics tool',
      website: 'https://hotjar.com'
    });
  }

  return results;
}
