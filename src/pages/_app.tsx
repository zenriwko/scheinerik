import "./variables.css";
import "./globals.css";

import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

import StarsBackground from "@/components/StarsBackground";
import FixedButtons from "@/components/FixedButtons/FixedButtons";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
// import CookieBanner from "@/components/%Cookies/CookieBanner";

import type { AppProps } from "next/app";

const SITE_NAME = "Noční Nebe";
const SITE_URL = "https://www.nocni-nebe.eu";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const observeSections = () => {
      if (observer) observer.disconnect();

      const sections = document.querySelectorAll("section");

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05 }
      );

      sections.forEach((section) => {
        section.classList.remove("is-visible");
        observer!.observe(section);
      });
    };

    observeSections();

    const handleRouteDone = () => {
      requestAnimationFrame(() => observeSections());
    };

    router.events.on("routeChangeComplete", handleRouteDone);

    return () => {
      router.events.off("routeChangeComplete", handleRouteDone);
      if (observer) observer.disconnect();
    };
  }, [router.events]);

  return (
    <>
      <Head>
        {/* Global defaults only (page-specific SEO is handled by <SEO />) */}
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/og.jpg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${SITE_URL}/og.jpg`} />
      </Head>

      <div className="background-wrapper">
        <StarsBackground />
      </div>

      {/* <CookieBanner /> */}

      <FixedButtons />
      <Navigation />

      <main>
        <Component {...pageProps} />
      </main>

      <Footer />
    </>
  );
}
