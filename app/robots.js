export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: 'https://nexai-solutions10.vercel.app/sitemap.xml',
  };
}
