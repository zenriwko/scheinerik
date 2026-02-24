import "./variables.css";
import "./globals.css";

import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

import NodeNetworkBackground from "@/components/NodeNetworkBackground";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
// import CookieBanner from "@/components/%Cookies/CookieBanner";

import type { AppProps } from "next/app";

const SITE_NAME = "Scheinerik Development";
const SITE_URL = "https://scheinerik.dev";

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
      </Head>

      <div className="background-wrapper">
        <NodeNetworkBackground />
      </div>

      {/* <CookieBanner /> */}

      <Navigation />

      <main>
        <Component {...pageProps} />
      </main>

      <Footer />
    </>
  );
}
