import "./variables.css";
import "./globals.css";

import { useEffect } from "react";
import { useRouter } from "next/router";

import StarsBackground from "@/components/StarsBackground";
import FixedButtons from "@/components/FixedButtons/FixedButtons";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";
// import CookieBanner from "@/components/%Cookies/CookieBanner";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const observeSections = () => {
      // disconnect previous observer (important)
      if (observer) observer.disconnect();

      const sections = document.querySelectorAll("section");

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target); // animate once
            }
          });
        },
        { threshold: 0.05 }
      );

      sections.forEach((section) => {
        // reset state so it can animate on each page nav
        section.classList.remove("is-visible");
        observer!.observe(section);
      });
    };

    // run on first load
    observeSections();

    // run after every client-side route change
    const handleRouteDone = () => {
      // wait one frame so the new page DOM is definitely mounted
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