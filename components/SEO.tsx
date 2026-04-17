import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  image?: string;
  schemaType?: string;
}

const SITE_URL = 'https://sikanderart.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const DEFAULT_KEYWORDS = 'painting contractor Karachi, house painting services Karachi, interior painting Karachi, exterior painting Karachi, waterproofing Karachi, texture painting Karachi, epoxy flooring Karachi, wood polish Karachi, commercial painting Karachi, wall paint services Karachi';

const upsertMetaByName = (name: string, content: string) => {
  let element = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const upsertMetaByProperty = (property: string, content: string) => {
  let element = document.head.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const upsertLink = (rel: string, href: string) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

const upsertJsonLd = (schema: Record<string, unknown>) => {
  const selector = 'script[type="application/ld+json"][data-seo-schema="true"]';
  let element = document.head.querySelector(selector) as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.setAttribute('data-seo-schema', 'true');
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(schema);
};

const normalizeUrl = (url?: string) => {
  if (!url) {
    return SITE_URL;
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  const normalizedPath = url.startsWith('/') ? url : `/${url}`;
  return `${SITE_URL}${normalizedPath}`;
};

const SEO = ({
  title,
  description,
  keywords = DEFAULT_KEYWORDS,
  url = SITE_URL,
  image = DEFAULT_IMAGE,
  schemaType = 'LocalBusiness',
}: SEOProps) => {
  useEffect(() => {
    const canonicalUrl = normalizeUrl(url);
    const imageUrl = normalizeUrl(image);

    document.title = title;
    document.documentElement.lang = 'en';

    upsertMetaByName('description', description);
    upsertMetaByName('keywords', keywords);
    upsertMetaByName('robots', 'index, follow');
    upsertMetaByName('author', 'Sikander Arts');
    upsertMetaByName('language', 'English');

    upsertLink('canonical', canonicalUrl);

    upsertMetaByProperty('og:title', title);
    upsertMetaByProperty('og:description', description);
    upsertMetaByProperty('og:url', canonicalUrl);
    upsertMetaByProperty('og:image', imageUrl);
    upsertMetaByProperty('og:type', 'website');
    upsertMetaByProperty('og:site_name', 'Sikander Arts');
    upsertMetaByProperty('og:locale', 'en_PK');

    upsertMetaByName('twitter:card', 'summary_large_image');
    upsertMetaByName('twitter:title', title);
    upsertMetaByName('twitter:description', description);
    upsertMetaByName('twitter:image', imageUrl);

    const schema = {
      '@context': 'https://schema.org',
      '@type': schemaType,
      name: 'Sikander Arts',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      image: imageUrl,
      description,
      telephone: '+923022911088',
      email: 'bilal_azeemlab@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kharadar',
        addressLocality: 'Karachi',
        addressRegion: 'Sindh',
        addressCountry: 'PK',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '24.8607',
        longitude: '67.0566',
      },
      openingHours: 'Mo-Sa 09:00-19:00',
      priceRange: '$$',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '150',
      },
      serviceType: [
        'Interior Painting',
        'Exterior Painting',
        'Texture & Decorative Painting',
        'Waterproofing',
        'Wood Painting & Polish',
        'Steel & Metal Painting',
        'Commercial & Industrial Painting',
        'Epoxy Floor Coating',
      ],
      areaServed: [
        'DHA Karachi',
        'Clifton',
        'Gulshan-e-Iqbal',
        'North Nazimabad',
        'PECHS',
        'Bahria Town Karachi',
        'Korangi',
        'Saddar',
        'Malir',
        'Scheme 33',
        'FB Area',
        'Nazimabad',
        'Defence',
        'Landhi',
      ],
      sameAs: ['https://wa.me/923022911088'],
    };

    upsertJsonLd(schema);
  }, [description, image, keywords, schemaType, title, url]);

  return null;
};

export type { SEOProps };
export default SEO;