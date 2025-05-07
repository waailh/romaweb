"use client";

import { Link, usePathname } from "@/i18n.config";
import { axiosPure } from "@/lib/auth/axios/axios";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useCategories } from "@/store/global/categories";
import { useParams } from "next/navigation";

const NavbarLinks = () => {
  const { cats } = useCategories();
  const t = useTranslations("Navbar");

  const { lang } = useParams();

  const pathname = usePathname();

  const links = [
    { id: 0, name: t("home"), href: "/" },
    // { id: 1, name: t("flash"), href: "/flash-deals" },
  ];

  return (
    <nav className="md:flex-1 flex flex-col md:flex-row md:space-s-5 space-y-4 items-center md:space-y-0 text-[1rem] md:text-normal">
      {links.map((link) => (
        <Link key={link.name} href={link.href} className="shrink-0">
          <span
            className={`hover-border-animation pb-3 font-bold ${
              pathname === link.href
                ? "md:border-b-2 md:border-green-500 md:active-link"
                : ""
            }`}
          >
            {link.name}
          </span>
          <hr className="h-[2px] mx-auto w-6 mb-2 bg-black md:hidden" />
        </Link>
      ))}
      {cats &&
        cats.map((one) => (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.3 }}
            key={one.slug}
            className="shrink-0"
          >
            <Link href={`/category/${one.slug}`}>
              <span
                className={`hover-border-animation pb-3 font-bold ${
                  pathname === `/category/${one.slug}`
                    ? "md:border-b-2 md:border-green-500 md:active-link"
                    : ""
                }`}
              >
                {lang == "ar" ? one.ar_name : one.name}
              </span>
              <hr className="h-[2px] mx-auto w-6 mb-2 bg-black md:hidden" />
            </Link>
          </motion.div>
        ))}
    </nav>
  );
};

export default NavbarLinks;
