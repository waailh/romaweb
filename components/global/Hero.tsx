import { getFetchOptions } from "@/lib/utils";
import DownOpacityAnimator from "../animators/DownOpacityLogoAnimator";
import MainSliders from "../hero/MainSliders";

const getData = async () => {
  const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchOptions = getFetchOptions();

  const res = await fetch(`${backendHost}/sliders`, fetchOptions);
  const data = await res.json();

  return data?.data || [];
};

const Hero = async () => {
  const sliders = await getData();

  return (
    <div className="py-4">
      <DownOpacityAnimator>
        <div className="slider-wrapper">
          <MainSliders sliders={sliders} />
        </div>
      </DownOpacityAnimator>
      {/* <div className="">lang: {t("appTitle")}</div>
      <Test />
      <LocaleChanger locale={locale} /> */}
    </div>
  );
};

export default Hero;
