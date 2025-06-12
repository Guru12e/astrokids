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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How does Astro Kids create a child’s astrology report?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Astro Kids uses your child’s birth details—date, time, and place—to generate a personalized Vedic astrology chart. This helps decode your child’s personality, emotions, learning style, strengths, and growth path.",
                  },
                },
                {
                  "@type": "Question",
                  name: "When will I receive the report after purchase?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You will receive your child’s personalized astrology report within 12 to 24 hours of placing your order. The report will be sent to your email.",
                  },
                },
                {
                  "@type": "Question",
                  name: " Is this suitable for children of all age groups?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Whether your child is an infant, toddler, school-age, or teenager, the insights are tailored to support their specific developmental stage and emotional needs.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do I need astrology knowledge to understand the report?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Not at all. The report is written in clear, easy-to-understand language for modern parents. No astrology background is required—just a desire to connect more deeply with your child.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How is healing incorporated into the report?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Each report integrates personalized healing techniques like affirmations, yoga-inspired practices, and mindful parenting tools aligned with your child’s birth chart to nurture their emotional and energetic balance.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I order reports for more than one child?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Absolutely. Each child’s report is uniquely crafted. Just submit the birth details individually to receive personalized insights for each child.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does Astro Kids offer continuing parenting guidance?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! With select packages, you can receive ongoing daily or weekly WhatsApp affirmations and mindful parenting tips, aligned with your child’s evolving astrological phases.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is the Astro Kids report scientifically validated?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Astro Kids is based on the Vedic astrology system, a centuries-old wisdom tradition. While it is not a science in the modern sense, it provides time-tested insights for parenting with intuition, empathy, and awareness.",
                  },
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Service",
                name: "Starter Parenting",
                description:
                  "A free astrology-based parenting guide to understand your child's strengths, emotions, and basic traits.",
                provider: {
                  "@type": "Organization",
                  name: "AstroKids",
                  url: "https://www.astrokids.ai",
                },
                serviceType: "Child Astrology Report",

                offers: {
                  "@type": "Offer",
                  priceCurrency: "INR",
                  price: "0.00",
                  availability: "https://schema.org/InStock",
                  url: "https://www.astrokids.ai/plans",
                },
                image:
                  "https://www.astrokids.ai/_next/image?url=%2Fimages%2Fbook-cover0.png&w=1920&q=75",
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                name: "Pro Parenting",
                description:
                  "A detailed parenting plan powered by Vedic astrology, offering deeper insights into child wellness and education.",
                provider: {
                  "@type": "Organization",
                  name: "AstroKids",
                  url: "https://www.astrokids.ai",
                },
                offers: {
                  "@type": "Offer",
                  priceCurrency: "INR",
                  price: "499.00",
                  availability: "https://schema.org/InStock",
                  url: "https://www.astrokids.ai/plans",
                },
                image:
                  "https://www.astrokids.ai/_next/image?url=%2Fimages%2Fbook-cover1.png&w=1920&q=75",
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                name: "Ultimate Parenting",
                description:
                  "Comprehensive report covering emotional guidance, talents, challenges, and future career insights.",
                provider: {
                  "@type": "Organization",
                  name: "AstroKids",
                  url: "https://www.astrokids.ai",
                },
                offers: {
                  "@type": "Offer",
                  priceCurrency: "INR",
                  price: "999.00",
                  availability: "https://schema.org/InStock",
                  url: "https://www.astrokids.ai/plans",
                },
                image:
                  "https://www.astrokids.ai/_next/image?url=%2Fimages%2Fbook-cover2.png&w=1920&q=75",
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                name: "Master Parenting",
                description:
                  "All-in-one personalized astrology and parenting plan for holistic child development and parental support.",
                provider: {
                  "@type": "Organization",
                  name: "AstroKids",
                  url: "https://www.astrokids.ai",
                },
                offers: {
                  "@type": "Offer",
                  priceCurrency: "INR",
                  price: "1299.00",
                  availability: "https://schema.org/InStock",
                  url: "https://www.astrokids.ai/plans",
                },
                image:
                  "https://www.astrokids.ai/_next/image?url=%2Fimages%2Fbook-cover3.png&w=1920&q=75",
              },
            ]),
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
