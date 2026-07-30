import * as cheerio from 'cheerio';
import { PerformanceReport } from './types.js';

export function evaluatePerformance(
  html: string,
  ttfbMs: number,
  $: cheerio.CheerioAPI
): PerformanceReport {
  const htmlSizeBytes = Buffer.byteLength(html, 'utf8');
  const totalScriptCount = $('script').length;
  const totalStyleCount = $('style, link[rel="stylesheet"]').length;
  const totalImageCount = $('img, svg').length;

  // Compute performance score 0-100
  let score = 100;
  if (ttfbMs > 800) score -= 30;
  else if (ttfbMs > 400) score -= 15;
  else if (ttfbMs > 200) score -= 5;

  if (htmlSizeBytes > 500000) score -= 20; // >500KB HTML
  else if (htmlSizeBytes > 200000) score -= 10;

  if (totalScriptCount > 40) score -= 15;
  else if (totalScriptCount > 20) score -= 8;

  score = Math.max(10, Math.min(99, score));

  return {
    score,
    ttfbMs,
    htmlSizeBytes,
    totalScriptCount,
    totalStyleCount,
    totalImageCount
  };
}
