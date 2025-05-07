// export const dynamic = "force-dynamic";
import { Lato } from "next/font/google";
import { Cairo } from "next/font/google";
import "@/app/globals.css";

import MobileFixedButtons from "@/components/helpers/MobileFixedButtons";
import NavbarAll from "@/components/navbar/NavbarAll";
import PreFooter from "@/components/footer/PreFooter";
import Footer from "@/components/footer/Footer";
import DesktopButtons from "@/components/helpers/DesktopButtons";
import { Toaster } from "react-hot-toast";
import LayoutIncludes from "@/components/helpers/LayoutIncludes";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import GlobalMessage from "@/components/navbar/GlobalMessage";

import NextIntlClientProviderComponent from "@/components/global/NextIntlClientProviderComponent";

// import { fetchSiteSettings } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  params: { lang: string };
}

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

const cairo = Cairo({
  weight: ["200", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

const gtmId = process.env.NEXT_PUBLIC_GTM_ID!;
const gaId = process.env.NEXT_PUBLIC_GA_ID!;

export default async function Layout({ children, params: { lang } }: Props) {
  // const siteSettings = await fetchSiteSettings();

  return (
    <html lang={lang} dir={lang == "ar" ? "rtl" : "ltr"}>
      <GoogleTagManager gtmId={gtmId} />
      {/* <GoogleAnalytics gaId={gaId} /> */}

      <body
        className={`${
          lang == "ar" ? `${cairo.className}` : `${lato.className}`
        } more`}
      >
        {/* <HydrateStore settings={siteSettings} /> */}
        <NextIntlClientProviderComponent>
          <Toaster containerStyle={{ zIndex: 9999999999999 }} />

          {/* extra needed components */}
          <LayoutIncludes />

          <NavbarAll />
          <GlobalMessage />
          {children}

          <PreFooter />
          <Footer />
          <MobileFixedButtons />

          <DesktopButtons />
        </NextIntlClientProviderComponent>
      </body>
    </html>
  );
}
