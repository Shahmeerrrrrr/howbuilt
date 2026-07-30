import * as cheerio from 'cheerio';
import { DetectedTech } from './types.js';

export function detectCSS(html: string, $: cheerio.CheerioAPI): DetectedTech[] {
  const results: DetectedTech[] = [];
  const lowerHtml = html.toLowerCase();

  // Tailwind CSS (Detector 4 spec: Look for --tw or tailwind)
  const hasTwVars = lowerHtml.includes('--tw-') || lowerHtml.includes('tailwind') || lowerHtml.includes('@tailwindcss');
  const hasTwClasses = $('[class*="flex"], [class*="bg-"], [class*="text-"], [class*="p-"], [class*="m-"], [class*="grid-cols-"]').length > 5;
  if (hasTwVars || hasTwClasses) {
    const evidence = [];
    if (lowerHtml.includes('--tw-')) evidence.push('Found Tailwind CSS variables `--tw-*`');
    if (lowerHtml.includes('tailwind')) evidence.push('Found `tailwind` stylesheet or script reference');
    if (hasTwClasses) evidence.push('Found Tailwind utility class patterns (`flex`, `bg-`, `p-`)');
    results.push({
      name: 'Tailwind CSS',
      category: 'CSS / Styling',
      icon: 'tailwindcss',
      confidence: hasTwVars ? 99 : 85,
      evidence,
      description: 'A utility-first CSS framework for rapid UI development',
      website: 'https://tailwindcss.com'
    });
  }

  // Styled Components
  if (lowerHtml.includes('data-styled') || lowerHtml.includes('styled-components') || $('[class*="sc-"]').length > 0) {
    results.push({
      name: 'Styled Components',
      category: 'CSS / Styling',
      icon: 'styledcomponents',
      confidence: 95,
      evidence: ['Found `data-styled` HTML attributes or `sc-` class prefixes'],
      description: 'Visual primitives for component-age React',
      website: 'https://styled-components.com'
    });
  }

  // Emotion (used by Material UI, Framer Motion)
  if (lowerHtml.includes('css-') && (lowerHtml.includes('data-emotion') || lowerHtml.includes('@emotion'))) {
    results.push({
      name: 'Emotion CSS',
      category: 'CSS / Styling',
      icon: 'emotion',
      confidence: 90,
      evidence: ['Found `data-emotion` style injection tags'],
      description: 'Performant and flexible CSS-in-JS library',
      website: 'https://emotion.sh'
    });
  }

  // Bootstrap
  if (lowerHtml.includes('bootstrap') || $('[class*="btn-primary"], [class*="col-md-"], [class*="container-fluid"]').length > 2) {
    results.push({
      name: 'Bootstrap',
      category: 'CSS / Styling',
      icon: 'bootstrap',
      confidence: 92,
      evidence: ['Found Bootstrap grid classes (`col-md-`, `btn-primary`) or bootstrap.css link'],
      description: 'Popular HTML, CSS, and JS library',
      website: 'https://getbootstrap.com'
    });
  }

  // Radix UI / Shadcn UI primitives
  if (lowerHtml.includes('data-radix-') || lowerHtml.includes('data-state=') || lowerHtml.includes('data-orientation=')) {
    results.push({
      name: 'Shadcn / Radix UI',
      category: 'CSS / Styling',
      icon: 'radix',
      confidence: 94,
      evidence: ['Found Radix UI headless component state attributes (`data-radix-*`, `data-state`)'],
      description: 'Unstyled, accessible component primitives for React',
      website: 'https://www.radix-ui.com'
    });
  }

  return results;
}
