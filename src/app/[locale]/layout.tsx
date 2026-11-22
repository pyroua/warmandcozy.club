import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import "../globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const descriptions: Record<string, string> = {
    nl: 'Professionele schoonmaakservice in Veghel en omgeving. Dieptereiniging woningen & kantoorschoonmaak op contract. Bel +31 617 615 757.',
    en: 'Professional cleaning service in Veghel and surroundings. Deep cleaning homes & office cleaning on contract. Call +31 617 615 757.',
    fr: 'Service de nettoyage professionnel à Veghel et environs. Nettoyage en profondeur et entretien bureaux. Appelez le +31 617 615 757.',
    de: 'Professioneller Reinigungsservice in Veghel und Umgebung. Tiefenreinigung Wohnungen & Büroreinigung auf Vertragsbasis. Anrufen +31 617 615 757.',
  };

  return {
    title: "Schoonmaak Warm and Cozy | Veghel",
    description: descriptions[locale] || descriptions.nl,
    keywords: ['schoonmaak', 'Veghel', 'dieptereiniging', 'kantoorschoonmaak', 'schoonmaakbedrijf', 'cleaning', 'Eindhoven', 'Den Bosch'],
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    manifest: '/manifest.webmanifest',
    openGraph: {
      title: 'Warm and Cozy',
      description: descriptions[locale] || descriptions.nl,
      url: 'https://warmandcozy.club',
      siteName: 'Warm and Cozy',
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Warm and Cozy' }],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Warm and Cozy | Veghel',
      description: descriptions[locale] || descriptions.nl,
      images: ['/images/og-image.png'],
    },
    alternates: {
      canonical: `https://warmandcozy.club`,
      languages: {
        'nl': 'https://warmandcozy.club/nl',
        'en': 'https://warmandcozy.club/en',
        'fr': 'https://warmandcozy.club/fr',
        'de': 'https://warmandcozy.club/de',
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    metadataBase: new URL('https://warmandcozy.club'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Load messages directly from file — no headers() call (compatible with static export)
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className={nunito.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Warm and Cozy",
              "image": "https://warmandcozy.club/images/og-image.png",
              "logo": "https://warmandcozy.club/images/logo.png",
              "telephone": "+31617615757",
              "email": "info@warmandcozy.club",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "De Omgang 17",
                "addressLocality": "Veghel",
                "postalCode": "5463KZ",
                "addressCountry": "NL"
              },
              "url": "https://warmandcozy.club",
              "sameAs": ["https://www.instagram.com/schoonmaak_warm.cozy/"],
              "priceRange": "€€",
              "openingHours": "Mo-Su 06:00-22:00",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 51.6124,
                "longitude": 5.5462
              },
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 51.6124,
                  "longitude": 5.5462
                },
                "geoRadius": 25000
              },
              "serviceType": ["Dieptereiniging", "Kantoorschoonmaak", "Woningschoonmaak"]
            })
          }}
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
