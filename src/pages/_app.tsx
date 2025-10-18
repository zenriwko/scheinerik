import "./variables.css";
import "./globals.css";

import StarsBackground from "@/components/StarsBackground";
import FixedButtons from "@/components/FixedButtons/FixedButtons";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Fixed background behind everything */}
      <div className="background-wrapper">
        <StarsBackground />
      </div>

      {/* Floating fixed buttons */}
      <FixedButtons />

      {/* Persistent header */}
      <Navigation />

      {/* Scrollable page content */}
      <main>
        
        <Component {...pageProps} />
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </>
  );
}