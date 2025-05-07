"use client";

import { useBranches } from "@/store/branches";
import BranchesMap from "../maps/BranchesMap";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  MapIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { OurMarker, RomaBranch } from "@/typings";
import { useParams } from "next/navigation";
import MyImage from "../ui/MyImage";
import { useTranslations } from "next-intl";

interface Props {
  branches: RomaBranch[];
}

const BranchesView = ({ branches }: Props) => {
  const { active, setActiveBranch } = useBranches();
  const { lang } = useParams();

  const t = useTranslations("Statics");

  console.log(branches);

  useEffect(() => {
    // setActiveBranch(branches[0]);
  }, []);

  const handleShowOnMap = (b: RomaBranch) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveBranch(b);
  };

  return (
    <div className=" md:overflow-y-scroll hide-scrollbar md:h-[500px] relative">
      <div className="w-full grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-7 relative ">
          <div className="sticky z-layer-2 w-full top-0 right-0 left-0">
            <BranchesMap
              markers={branches.map((one) => {
                return { loc: one.loc, name: one.title } as OurMarker;
              })}
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-5 overflow-y-scroll md:overflow-y-auto hide-scrollbar h-fit">
          <div className="flex flex-col space-y-2 md:space-y-4">
            {branches.map((one, i) => (
              <Disclosure
                key={i}
                as="div"
                className={`border p-2 md:p-3 rounded-md shadow `}
                //   onClick={() => setActiveBranch(one)}
                defaultOpen={i == 0}
              >
                <DisclosureButton
                  as="div"
                  className="group w-full flex items-start space-s-2"
                >
                  <div className="shrink-0 relative size-24 md:size-32">
                    <MyImage
                      src={one.photo}
                      className="object-cover object-center rounded"
                      fill
                    />
                  </div>
                  <div className="w-full flex flex-col space-y-2">
                    <div className="w-full flex items-center justify-between">
                      <div className="font-bold text-md">
                        {lang == "ar" ? one.ar_title : one.title}
                      </div>
                      <ChevronDownIcon className="size-4 group-data-[open]:rotate-180" />
                    </div>
                    <div className="w-full flex flex-col space-y-2 text-sm">
                      <div className="flex items-center">
                        <PhoneIcon className="size-4 me-2" />
                        <span dir="ltr">{one.phone}</span>
                      </div>
                      <div className="flex items-center justify-between space-s-2">
                        <p className="text-xs">
                          <span
                            className={`underline font-bold ${
                              one.open_now
                                ? "text-green-600"
                                : "text-orange-500"
                            }`}
                          >
                            {one.open_now ? "Open Now" : "Closed"}{" "}
                          </span>
                          - {t("closes")}{" "}
                          <span className="text-md text-primary">
                            {one.closesAt}
                          </span>
                        </p>
                        <button
                          onClick={() => handleShowOnMap(one)}
                          className="flex pb-1 border-b items-center space-s-1 text-primary border-primary text-sm"
                        >
                          <MapIcon className="size-4" />
                          <span>{t("showmap")}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </DisclosureButton>
                <DisclosurePanel className="mt-2 text-sm/5 text-black/50">
                  <div className="flex flex-wrap w-full">
                    {one.workings.map((one, i) => (
                      <div
                        key={i}
                        className="shrink-0 px-2 md:px-3 py-1 border rounded-lg m-1 hover:border-primary duration-300 hover:text-primary"
                      >
                        {one}
                      </div>
                    ))}
                  </div>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchesView;
