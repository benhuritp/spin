import { Inter, Montserrat } from "next/font/google";
import "normalize.css";

import "./style.scss";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
  weight: ["400" , "500","700"]
});

export const metadata = {
  title: "Coin",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
