import AccountMainArea from "@/components/account/AccountMainArea";
import AccountTabs from "@/components/account/AccountTabs";
import BreadCrumb from "@/components/helpers/BreadCrumb";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

interface MetaProps {
  params: { lang: string };
}

export async function generateMetadata({
  params: { lang },
}: MetaProps): Promise<Metadata> {
  const ar_title = "الحساب";
  const en_title = "My Account";

  const title = lang == "ar" ? ar_title : en_title;

  return {
    title,
    robots: {
      index: false,
    },
  };
}

const AccountPage = () => {
  const t = useTranslations("BreadC");
  const items = [{ name: t("acc"), link: "#" }]; // for breadcrumb

  return (
    <div>
      <BreadCrumb items={items} />
      <div className="wrapper">
        <div className="flex flex-col md:flex-row md:space-s-4 md:items-start">
          <AccountTabs />
          <AccountMainArea />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
