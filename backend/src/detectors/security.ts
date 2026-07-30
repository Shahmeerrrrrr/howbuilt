import { SecurityReport, SecurityHeaderReport } from './types.js';

export function evaluateSecurity(headers: Record<string, string>, cookiesHeader: string | undefined): SecurityReport {
  const reports: SecurityHeaderReport[] = [];
  let scorePoints = 100;

  // 1. Content-Security-Policy
  const csp = headers['content-security-policy'];
  if (csp) {
    reports.push({
      header: 'Content-Security-Policy',
      status: 'PRESENT',
      value: csp.length > 50 ? csp.substring(0, 50) + '...' : csp,
      recommendation: 'Excellent! CSP is active to mitigate XSS and injection attacks.'
    });
  } else {
    scorePoints -= 25;
    reports.push({
      header: 'Content-Security-Policy',
      status: 'MISSING',
      recommendation: 'Add a CSP header to prevent unauthorized script execution and XSS attacks.'
    });
  }

  // 2. Strict-Transport-Security (HSTS)
  const hsts = headers['strict-transport-security'];
  if (hsts) {
    reports.push({
      header: 'Strict-Transport-Security',
      status: 'PRESENT',
      value: hsts,
      recommendation: 'Enforces HTTPS connections to prevent SSL stripping.'
    });
  } else {
    scorePoints -= 20;
    reports.push({
      header: 'Strict-Transport-Security',
      status: 'MISSING',
      recommendation: 'Enable HSTS (max-age=31536000; includeSubDomains; preload).'
    });
  }

  // 3. X-Frame-Options
  const xframe = headers['x-frame-options'];
  if (xframe) {
    reports.push({
      header: 'X-Frame-Options',
      status: 'PRESENT',
      value: xframe,
      recommendation: 'Prevents clickjacking by controlling framing permission.'
    });
  } else {
    scorePoints -= 15;
    reports.push({
      header: 'X-Frame-Options',
      status: 'MISSING',
      recommendation: 'Set `X-Frame-Options: DENY` or `SAMEORIGIN` to defeat clickjacking.'
    });
  }

  // 4. X-Content-Type-Options
  const xcontent = headers['x-content-type-options'];
  if (xcontent) {
    reports.push({
      header: 'X-Content-Type-Options',
      status: 'PRESENT',
      value: xcontent,
      recommendation: 'Blocks MIME-type sniffing.'
    });
  } else {
    scorePoints -= 10;
    reports.push({
      header: 'X-Content-Type-Options',
      status: 'MISSING',
      recommendation: 'Set `X-Content-Type-Options: nosniff`.'
    });
  }

  // 5. Referrer-Policy
  const refPolicy = headers['referrer-policy'];
  if (refPolicy) {
    reports.push({
      header: 'Referrer-Policy',
      status: 'PRESENT',
      value: refPolicy,
      recommendation: 'Controls how much referrer information is passed with requests.'
    });
  } else {
    scorePoints -= 10;
    reports.push({
      header: 'Referrer-Policy',
      status: 'MISSING',
      recommendation: 'Set `Referrer-Policy: strict-origin-when-cross-origin`.'
    });
  }

  // Calculate grade
  let grade = 'A+';
  if (scorePoints >= 95) grade = 'A+';
  else if (scorePoints >= 85) grade = 'A';
  else if (scorePoints >= 70) grade = 'B';
  else if (scorePoints >= 55) grade = 'C';
  else grade = 'F';

  // Count cookies
  let cookiesCount = 0;
  if (cookiesHeader) {
    if (Array.isArray(cookiesHeader)) {
      cookiesCount = cookiesHeader.length;
    } else if (typeof cookiesHeader === 'string') {
      cookiesCount = cookiesHeader.split(';').length;
    }
  }

  return {
    score: grade,
    cookiesCount,
    headers: reports
  };
}
