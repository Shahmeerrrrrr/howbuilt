import axios from 'axios';

export interface FetchResult {
  url: string;
  normalizedUrl: string;
  domain: string;
  statusCode: number;
  headers: Record<string, string>;
  cookiesHeader?: string;
  html: string;
  ttfbMs: number;
}

export async function fetchWebsite(targetUrl: string): Promise<FetchResult> {
  // Normalize URL
  let url = targetUrl.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  const parsed = new URL(url);
  const domain = parsed.hostname.replace(/^www\./, '');

  const startTime = Date.now();

  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache'
    },
    timeout: 12000,
    maxRedirects: 5,
    validateStatus: () => true // handle non-200 gracefully
  });

  const ttfbMs = Date.now() - startTime;

  // Convert response headers to lowercase keys
  const headers: Record<string, string> = {};
  Object.keys(response.headers).forEach(k => {
    const val = response.headers[k];
    headers[k.toLowerCase()] = Array.isArray(val) ? val.join(', ') : String(val || '');
  });

  const setCookie = response.headers['set-cookie'];
  const cookiesHeader = Array.isArray(setCookie) ? setCookie.join('; ') : setCookie;

  const html = typeof response.data === 'string' ? response.data : JSON.stringify(response.data || '');

  return {
    url,
    normalizedUrl: response.request?.res?.responseUrl || url,
    domain,
    statusCode: response.status,
    headers,
    cookiesHeader,
    html,
    ttfbMs
  };
}
