import { useTranslations } from "next-intl";
import BreadCrumb from "../helpers/BreadCrumb";
import StaticHtmlViewer from "./html/StaticHtmlViewer";

interface Props {
  data: { content: string };
}

const InnerTerms = ({ data }: Props) => {
  const t = useTranslations("BreadC");
  const items = [{ name: t("terms"), link: "#" }]; // for breadcrumb

  return (
    <div>
      <BreadCrumb items={items} />
      <div className="wrapper">
        <div className="mt-4 md:mt-0 w-full md:max-w-[800px]">
          <StaticHtmlViewer html={data.content} />
        </div>
      </div>
    </div>
  );
};

export default InnerTerms;
