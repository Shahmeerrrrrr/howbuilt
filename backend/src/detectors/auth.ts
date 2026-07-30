import * as cheerio from 'cheerio';
import { DetectedTech } from './types.js';

export function detectAuth(html: string, $: cheerio.CheerioAPI): DetectedTech[] {
  const results: DetectedTech[] = [];
  const lowerHtml = html.toLowerCase();

  // Clerk
  if (lowerHtml.includes('clerk.dev') || lowerHtml.includes('clerk.com') || lowerHtml.includes('clerk-js') || lowerHtml.includes('__clerk')) {
    results.push({
      name: 'Clerk',
      category: 'Authentication',
      icon: 'clerk',
      confidence: 99,
      evidence: ['Found `@clerk/clerk-react` runtime client script or `__clerk` state'],
      description: 'Complete user management and authentication suite',
      website: 'https://clerk.com'
    });
  }

  // Auth0
  if (lowerHtml.includes('auth0.com') || lowerHtml.includes('cdn.auth0.com')) {
    results.push({
      name: 'Auth0',
      category: 'Authentication',
      icon: 'auth0',
      confidence: 98,
      evidence: ['Found `cdn.auth0.com/js/auth0-spa-js` script tag'],
      description: 'Adaptable authentication and authorization platform',
      website: 'https://auth0.com'
    });
  }

  // Supabase Auth
  if (lowerHtml.includes('supabase.co') || lowerHtml.includes('supabase-auth') || lowerHtml.includes('sb-access-token')) {
    results.push({
      name: 'Supabase Auth',
      category: 'Authentication',
      icon: 'supabase',
      confidence: 96,
      evidence: ['Found `supabase.co` URL or `sb-access-token` session cookie marker'],
      description: 'Open source Firebase alternative with built-in Auth',
      website: 'https://supabase.com'
    });
  }

  // Firebase Auth
  if (lowerHtml.includes('firebaseapp.com') || lowerHtml.includes('firebasejs') || lowerHtml.includes('identitytoolkit.googleapis.com')) {
    results.push({
      name: 'Firebase Auth',
      category: 'Authentication',
      icon: 'firebase',
      confidence: 97,
      evidence: ['Found `firebasejs/auth` client library or Google Identity toolkit'],
      description: 'Google app development platform auth module',
      website: 'https://firebase.google.com'
    });
  }

  // NextAuth / Auth.js
  if (lowerHtml.includes('/api/auth/') || lowerHtml.includes('next-auth')) {
    results.push({
      name: 'NextAuth / Auth.js',
      category: 'Authentication',
      icon: 'nextauth',
      confidence: 92,
      evidence: ['Found `/api/auth/session` route handlers or NextAuth token payload'],
      description: 'Authentication for Next.js and Web Applications',
      website: 'https://authjs.dev'
    });
  }

  // WorkOS
  if (lowerHtml.includes('workos.com') || lowerHtml.includes('api.workos.com')) {
    results.push({
      name: 'WorkOS',
      category: 'Authentication',
      icon: 'workos',
      confidence: 98,
      evidence: ['Found Enterprise SSO & WorkOS authentication endpoints'],
      description: 'Enterprise readiness for your app in minutes (SSO, SCIM, MFA)',
      website: 'https://workos.com'
    });
  }

  // Kinde
  if (lowerHtml.includes('kinde.com') || lowerHtml.includes('kinde-auth')) {
    results.push({
      name: 'Kinde',
      category: 'Authentication',
      icon: 'kinde',
      confidence: 98,
      evidence: ['Found `kinde.com` auth provider configuration'],
      description: 'The simple, powerful authentication service for modern apps',
      website: 'https://kinde.com'
    });
  }

  return results;
}
