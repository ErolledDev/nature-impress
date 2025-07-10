import "@/styles/tailwind.css";
import { Providers } from "./providers";
import { cx } from "@/utils/all";
import { Inter, Lora } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora"
});

export const metadata = {
  title: {
    default: "Nature&apos;s Whispers - Exploring the Wild",
    template: "%s | Nature&apos;s Whispers"
  },
  description: "Discover the beauty and wonder of the natural world through captivating stories, stunning photography, and deep insights into wildlife and ecology. Join us on a journey through pristine wilderness, fascinating animal behaviors, and conservation efforts.",
  keywords: [
    "Nature", "Wildlife", "Environment", "Outdoors", "Ecology", "Conservation",
    "Photography", "Wilderness", "Animals", "Plants", "Sustainability",
    "National Parks", "Biodiversity", "Climate Change", "Environmental Science"
  ],
  authors: [{ name: "Nature Explorer" }],
  creator: "Nature's Whispers",
  publisher: "Nature&apos;s Whispers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.SITE_URL || "https://mydomain.com",
    siteName: "Nature&apos;s Whispers",
    title: "Nature&apos;s Whispers - Exploring the Wild",
    description: "Discover the beauty and wonder of the natural world through captivating stories, stunning photography, and deep insights into wildlife and ecology. Join us on a journey through pristine wilderness.",
    images: [
      {
        url: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Beautiful natural landscape showcasing pristine wilderness - Nature's Whispers"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@natureswhispers",
    creator: "@natureswhispers", 
    title: "Nature&apos;s Whispers - Exploring the Wild",
    description: "Discover the beauty and wonder of the natural world through captivating stories, stunning photography, and deep insights into wildlife and ecology.",
    images: ["https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: process.env.SITE_URL || "https://mydomain.com",
    languages: {
      'en-US': process.env.SITE_URL || 'https://mydomain.com',
    },
    types: {
      'application/rss+xml': [
        { url: (process.env.SITE_URL || 'https://mydomain.com') + '/api/rss/', title: "Nature&apos;s Whispers RSS Feed" },
      ],
    },
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const metadataBase = new URL(process.env.SITE_URL || "https://mydomain.com");
  
  return (
    <html
      lang="en"
      className={cx(inter.variable, lora.variable)}>
      <head>
        <link rel="canonical" href={metadataBase.toString()} />
      </head>
      <body className="antialiased text-gray-800 dark:bg-black dark:text-gray-400">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}