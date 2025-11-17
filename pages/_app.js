import "@/styles/globals.css";
import Script from "next/script";
import { Analytics } from '@vercel/analytics/next';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-QJ4XF5HF0X"
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QJ4XF5HF0X', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      {/* Tu aplicación */}
      <Component {...pageProps} />

      {/* Vercel Analytics */}
      <Analytics />
    </>
  );
}
