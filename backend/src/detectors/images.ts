import * as cheerio from 'cheerio';
import { DetectedTech } from './types.js';

export function detectImages(html: string, $: cheerio.CheerioAPI): DetectedTech[] {
  const results: DetectedTech[] = [];
  const lowerHtml = html.toLowerCase();

  // Cloudinary
  if (lowerHtml.includes('res.cloudinary.com') || lowerHtml.includes('cloudinary')) {
    results.push({
      name: 'Cloudinary',
      category: 'Images & Media',
      icon: 'cloudinary',
      confidence: 99,
      evidence: ['Found `res.cloudinary.com` media assets URL'],
      description: 'End-to-end image and video management platform',
      website: 'https://cloudinary.com'
    });
  }

  // Imgix
  if (lowerHtml.includes('imgix.net') || lowerHtml.includes('imgix.org')) {
    results.push({
      name: 'Imgix',
      category: 'Images & Media',
      icon: 'imgix',
      confidence: 98,
      evidence: ['Found `*.imgix.net` real-time image processing CDN domain'],
      description: 'Real-time image processing and optimization API',
      website: 'https://imgix.com'
    });
  }

  // AWS S3
  if (lowerHtml.includes('.s3.amazonaws.com') || lowerHtml.includes('s3.dualstack.')) {
    results.push({
      name: 'AWS S3',
      category: 'Images & Media',
      icon: 'aws',
      confidence: 97,
      evidence: ['Found `*.s3.amazonaws.com` asset storage bucket URLs'],
      description: 'Amazon Simple Storage Service',
      website: 'https://aws.amazon.com/s3/'
    });
  }

  // ImageKit
  if (lowerHtml.includes('ik.imagekit.io') || lowerHtml.includes('imagekit.io')) {
    results.push({
      name: 'ImageKit.io',
      category: 'Images & Media',
      icon: 'imagekit',
      confidence: 99,
      evidence: ['Found `ik.imagekit.io` media CDN URL'],
      description: 'Real-time image optimization and digital asset management',
      website: 'https://imagekit.io'
    });
  }

  // Uploadthing
  if (lowerHtml.includes('utfs.io') || lowerHtml.includes('uploadthing.com')) {
    results.push({
      name: 'Uploadthing',
      category: 'Images & Media',
      icon: 'uploadthing',
      confidence: 99,
      evidence: ['Found `utfs.io` Uploadthing serverless file upload CDN link'],
      description: 'File uploads for Next.js and TypeScript developers',
      website: 'https://uploadthing.com'
    });
  }

  // Sanity CDN
  if (lowerHtml.includes('cdn.sanity.io')) {
    results.push({
      name: 'Sanity Asset CDN',
      category: 'Images & Media',
      icon: 'sanity',
      confidence: 99,
      evidence: ['Found `cdn.sanity.io/images/` content image URLs'],
      description: 'High performance image CDN integrated with Sanity CMS',
      website: 'https://www.sanity.io'
    });
  }

  // Vercel Image Optimization
  if (lowerHtml.includes('_next/image') || lowerHtml.includes('/_next/image?url=')) {
    results.push({
      name: 'Vercel Image Optimization',
      category: 'Images & Media',
      icon: 'vercel',
      confidence: 95,
      evidence: ['Found `/_next/image` automatic webp/avif dynamic optimization route'],
      description: 'Automatic image resizing, optimization, and WebP transformation',
      website: 'https://vercel.com/docs/image-optimization'
    });
  }

  return results;
}
