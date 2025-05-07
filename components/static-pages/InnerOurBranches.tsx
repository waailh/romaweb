"use client";

import { useTranslations } from "next-intl";
import BreadCrumb from "../helpers/BreadCrumb";
import BranchesView from "./BranchesView";
import { RomaBranch } from "@/typings";

interface Props {
  branches: RomaBranch[];
}

const InnerOurBranches = ({ branches }: Props) => {
  const t = useTranslations("BreadC");

  const items = [{ name: t("branches"), link: "#" }]; // for breadcrumb

  return (
    <div>
      <BreadCrumb items={items} />
      <div className="wrapper">
        {branches && <BranchesView branches={branches} />}
      </div>
    </div>
  );
};

export default InnerOurBranches;
