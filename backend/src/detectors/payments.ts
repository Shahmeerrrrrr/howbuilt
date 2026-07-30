import * as cheerio from 'cheerio';
import { DetectedTech } from './types.js';

export function detectPayments(html: string, $: cheerio.CheerioAPI): DetectedTech[] {
  const results: DetectedTech[] = [];
  const lowerHtml = html.toLowerCase();

  // Stripe
  if (
    lowerHtml.includes('js.stripe.com') ||
    lowerHtml.includes('stripe.com') ||
    lowerHtml.includes('stripe-elements') ||
    lowerHtml.includes('__stripe')
  ) {
    results.push({
      name: 'Stripe',
      category: 'Payments',
      icon: 'stripe',
      confidence: 99,
      evidence: ['Found `js.stripe.com/v3/` checkout SDK script tag'],
      description: 'Financial infrastructure for the internet',
      website: 'https://stripe.com'
    });
  }

  // Paddle
  if (lowerHtml.includes('cdn.paddle.com') || lowerHtml.includes('paddle.js') || lowerHtml.includes('paddle.setup')) {
    results.push({
      name: 'Paddle',
      category: 'Payments',
      icon: 'paddle',
      confidence: 98,
      evidence: ['Found `cdn.paddle.com/paddle/paddle.js` merchant overlay'],
      description: 'The complete payments, tax, and subscriptions platform for SaaS',
      website: 'https://paddle.com'
    });
  }

  // LemonSqueezy
  if (lowerHtml.includes('lemonsqueezy.com') || lowerHtml.includes('lemonsqueezy-button') || lowerHtml.includes('lmsqueezy')) {
    results.push({
      name: 'LemonSqueezy',
      category: 'Payments',
      icon: 'lemonsqueezy',
      confidence: 99,
      evidence: ['Found `assets.lemonsqueezy.com/lemon.js` checkout overlay script'],
      description: 'Payments, tax, and subscriptions for software companies',
      website: 'https://lemonsqueezy.com'
    });
  }

  // PayPal
  if (lowerHtml.includes('paypal.com/sdk') || lowerHtml.includes('paypalobjects.com')) {
    results.push({
      name: 'PayPal',
      category: 'Payments',
      icon: 'paypal',
      confidence: 97,
      evidence: ['Found `paypal.com/sdk/js` smart payment buttons script'],
      description: 'Global online payment system',
      website: 'https://paypal.com'
    });
  }

  return results;
}
