import * as cheerio from 'cheerio';
import { DetectedTech } from './types.js';

export function detectFonts(html: string, $: cheerio.CheerioAPI): DetectedTech[] {
  const results: DetectedTech[] = [];
  const lowerHtml = html.toLowerCase();

  const fontNames = [
    { name: 'Inter', key: 'inter', desc: 'A typeface specially designed for computer screens' },
    { name: 'Geist / Geist Mono', key: 'geist', desc: 'Vercels typography system for developers and designers' },
    { name: 'Poppins', key: 'poppins', desc: 'Geometric sans-serif typeface' },
    { name: 'Roboto', key: 'roboto', desc: 'Googles modern dual-nature typeface' },
    { name: 'Fira Code', key: 'fira code', desc: 'Free monospaced font containing ligatures for code' },
    { name: 'JetBrains Mono', key: 'jetbrains mono', desc: 'A typeface for developers' },
    { name: 'Space Grotesk', key: 'space grotesk', desc: 'Proportional sans-serif font family based on Space Mono' },
    { name: 'Outfit', key: 'outfit', desc: 'Geometric sans-serif font family' },
    { name: 'Plus Jakarta Sans', key: 'plus jakarta', desc: 'Modern geometric sans serif font' }
  ];

  fontNames.forEach(font => {
    if (lowerHtml.includes(font.key)) {
      results.push({
        name: font.name,
        category: 'Fonts',
        icon: 'font',
        confidence: 90,
        evidence: [`Found CSS font-family directive or \`fonts.googleapis.com\` reference matching \`${font.name}\``],
        description: font.desc,
        website: 'https://fonts.google.com'
      });
    }
  });

  // Google Fonts API
  if (lowerHtml.includes('fonts.googleapis.com') || lowerHtml.includes('fonts.gstatic.com')) {
    results.push({
      name: 'Google Fonts',
      category: 'Fonts',
      icon: 'googlefonts',
      confidence: 99,
      evidence: ['Found font link tag `fonts.googleapis.com` or `fonts.gstatic.com`'],
      description: 'Library of open source web fonts',
      website: 'https://fonts.google.com'
    });
  }

  // Adobe Fonts / Typekit
  if (lowerHtml.includes('use.typekit.net') || lowerHtml.includes('typekit')) {
    results.push({
      name: 'Adobe Fonts',
      category: 'Fonts',
      icon: 'adobe',
      confidence: 98,
      evidence: ['Found `use.typekit.net` script embedding'],
      description: 'Premium font collection service by Adobe',
      website: 'https://fonts.adobe.com'
    });
  }

  return results;
}
