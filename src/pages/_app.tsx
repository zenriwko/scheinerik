import "./variables.css";
import "./globals.css";

import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";

import { spaceGrotesk, inter, geistMono } from '@/lib/fonts';

import NodeNetworkBackground from "@/components/NodeNetworkBackground";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

import type { AppProps } from "next/app";

const SITE_NAME = "Scheinerik Development";
const SITE_URL = "https://scheinerik.dev";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // Demo pages are standalone sites — hide portfolio chrome
  const isDemo = router.pathname.startsWith('/demo/');

  return (
    <>
      <div className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable}`}>

      <Head>
        <meta property="og:site_name" content={SITE_NAME} />
      </Head>

      <div className="background-wrapper">
        <NodeNetworkBackground />
      </div>

      {!isDemo && <Navigation />}

      <main>
        <Component {...pageProps} />
      </main>

      {!isDemo && <Footer />}
      {!isDemo && <ScrollToTop />}

      </div>

      {/* Google Analytics — add NEXT_PUBLIC_GA_ID to .env.local to activate */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}</Script>
        </>
      )}
    </>
  );
}
