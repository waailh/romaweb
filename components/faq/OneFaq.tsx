"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { useState } from "react";

interface Props {
  key: number;
  order: number;
  faq: { question: string; ar_q: string; answer: string; ar_ans: string };
}

const OneFaq = ({ order, faq: { question, ar_q, answer, ar_ans } }: Props) => {
  // const [isActive, setIsActive] = useState<boolean>();

  const { lang } = useParams();

  return (
    <Disclosure
      as="div"
      className={`w-full px-4 py-5 rounded border-2 cursor-pointer border-primary`}
      // onClick={() => setIsActive(!isActive)}
      defaultOpen={order == 0}
    >
      <DisclosureButton className="group flex w-full items-center justify-between">
        <div className="">
          <div className="font-bold text-sm">
            {lang == "ar" ? ar_q : question}
          </div>
        </div>
        <div className="bg-transparent p-1 rounded-full group-data-[open]:bg-primary transition-all duration-500">
          <ChevronRightIcon
            className={`size-4 group-data-[open]:rotate-90 group-data-[open]:text-white ${
              lang == "ar" ? "scale-x-[-1]" : ""
            }`}
          />
        </div>
      </DisclosureButton>
      <DisclosurePanel className="mt-2 text-sm/5 text-black/50">
        <span>{lang == "ar" ? ar_ans : answer}</span>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default OneFaq;
