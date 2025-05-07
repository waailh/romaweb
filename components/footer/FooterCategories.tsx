"use client";

import dynamic from "next/dynamic";

import { DisclosureButton, DisclosurePanel } from "@headlessui/react";
const Disclosure = dynamic(
  () => import("@headlessui/react").then((mod) => mod.Disclosure),
  { ssr: false }
);

import { Link } from "@/i18n.config";
import { useCategories } from "@/store/global/categories";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import { motion } from "framer-motion";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useGlobals } from "@/store/global/globals";

const FooterCategories = () => {
  const { cats } = useCategories();
  const { lang } = useParams();
  const { isMobileLayout } = useGlobals();

  const t = useTranslations("Cats");
  // const [state, setstate] = useState();

  return (
    <>
      {cats && (
        <div className="w-full">
          <Disclosure
            as="div"
            className="w-full cursor-pointer bg-white md:bg-transparent"
            defaultOpen={!isMobileLayout}
          >
            <DisclosureButton
              disabled={!isMobileLayout}
              className="group rounded-t p-[6px] md:p-0 flex w-full items-center justify-between"
            >
              <h4 className="text-black md:text-grayee text-sm font-bold">
                {t("cats")}
              </h4>
              <PlusIcon className="size-4 md:hidden" />
            </DisclosureButton>
            <DisclosurePanel className="my-1 text-black py-2 px-2 md:px-0">
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col text-fgray text-md space-y-2"
              >
                {cats.map((one, i) => (
                  <li
                    key={i}
                    className="w-fit shrink-0 hover:text-black hover:underline transition-all ease-in-out duration-500"
                  >
                    <Link href={`/category/${one.slug}`}>
                      {lang == "ar" ? one.ar_name : one.name}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            </DisclosurePanel>
          </Disclosure>
        </div>
      )}
    </>
  );
};

export default FooterCategories;
