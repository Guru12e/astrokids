import Header from "@/components/Header";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Aura",
  description: "Get You Baby Report Now",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/images/logo.png' type='image/png' />
      </head>
      <body className={poppins.variable}>
        <Header />
        {children}
      </body>
    </html>
  );
}
