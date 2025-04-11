import { DefaultSeoProps } from 'next-seo';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://penify.dev';

const SEO: DefaultSeoProps = {
  titleTemplate: '%s | Penify.dev',
  defaultTitle: 'Penify.dev | Automated Documentation Generation',
  description: 'Automate human-like docstring/documentation for Python, Java, TypeScript, JavaScript, Kotlin in GitHub, GitLab, Bitbucket.',
  canonical: baseUrl,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Penify.dev',
    title: 'Penify.dev | Automated Documentation Generation',
    description: 'Automate human-like docstring/documentation for Python, Java, TypeScript, JavaScript, Kotlin in GitHub, GitLab, Bitbucket.',
    images: [
      {
        url: `${baseUrl}/images/penify-og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Penify.dev',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    handle: '@penifydev',
    site: '@penifydev',
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon-32x32.png',
      sizes: '32x32',
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon-16x16.png',
      sizes: '16x16',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#000000',
    },
    {
      name: 'keywords',
      content: 'Penify.dev, ai docstring, Automated Documentation, GitHub Integration, Source Code Documentation, Intelligent Tracking, Smart Generation, Programming Languages, Python, JavaScript, TypeScript, Java, Kotlin, Real-Time Documentation, Privacy-Focused',
    },
    {
      name: 'author',
      content: 'Penify.dev',
    },
  ],
};

export default SEO;
