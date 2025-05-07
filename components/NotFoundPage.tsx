"use client";

import { useTranslations } from "next-intl";

const NotFoundPage = () => {
  const t = useTranslations("Errors");

  return (
    <div className="mt-20 mb-40 flex flex-col items-center justify-center">
      <div className="text-8xl">404</div>
      <p>{t("notfound")}</p>
      <div className=""></div>
    </div>
  );
};

export default NotFoundPage;
