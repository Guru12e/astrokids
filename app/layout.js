import { Suspense } from "react";
import "./globals.css";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Montserrat, Quicksand } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const openSans = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700", "600", "800"],
  variable: "--font-open-sans",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "700", "300"],
  variable: "--font-quicksand",
});

const customFont = localFont({
  src: [
    {
      path: "../public/fonts/HvDTrial_Brandon_Grotesque_medium-BF64a625c84a521.otf",
      style: "normal",
    },
  ],
  variable: "--font-custom",
});

export const metadata = {
  title:
    "Astro Kids: Astrology Prediction Reports for Children, Parenting Guides, Holistic Wellness Solutions",
  description:
    "Explore Astro Kids for personalized astrology reports tailored for children and toddlers. Unlock insights into health, education, and natural talents while receiving actionable parenting guidance and holistic wellness solutions with mindfulness, healing, and psychology.",
  keywords:
    "Astrology for children, parenting astrology reports, child astrology predictions, holistic wellness for kids, mindful parenting, astrology-based parenting, healing for children, toddler astrology, career predictions for children, health insights for kids, astrology parenting guides.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo3.png" type="image/png" />
        <GoogleAnalytics gtmId="G-82PQ2WCYGX" />
        <GoogleTagManager gtmId="GTM-MDK2KCGP" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Astro Kids - Astrology Prediction Reports for Children, Parenting Guides, Holistic Wellness Solutions",
            description:
              "Explore Astro Kids for personalized astrology reports tailored for children and toddlers. Unlock insights into health, education, and natural talents while receiving actionable parenting guidance and holistic wellness solutions with mindfulness, healing, and psychology.",
            url: "https://www.astrokids.ai",
            mainEntity: [
              {
                "@type": "WebPage",
                name: "Get Child Report",
                url: "https://www.astrokids.ai/child-details",
              },
              {
                "@type": "WebPage",
                name: "Child-Related Blogs",
                url: "https://www.astrokids.ai/blogs",
              },
            ],
          })}
        </script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "AstroKids",
              url: "https://astrokids.ai/",
              logo: "https://astrokids.ai/logo.png",
              sameAs: [
                "https://www.facebook.com/profile.php?id=61568876184036",
                "https://www.instagram.com/the_astro_kids/",
                "https://www.linkedin.com/company/astrokids/",
                "https://www.youtube.com/@the_astro_kids",
                "https://in.pinterest.com/theastrokids/",
                "https://sharechat.com/profile/Astro_kids?d=n",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.astrokids.ai/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Plans",
                  item: "https://www.astrokids.ai/plans",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Resources",
                  item: "https://www.astrokids.ai/resources",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "About",
                  item: "https://www.astrokids.ai/about",
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Contact",
                  item: "https://www.astrokids.ai/contact",
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${customFont.variable} ${openSans.variable} ${quicksand.variable}`}
      >
        <Suspense>
          {children}
          <ToastContainer />
          <Analytics />
          <SpeedInsights />
        </Suspense>
      </body>
    </html>
  );
}
