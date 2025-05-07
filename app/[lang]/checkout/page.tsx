import CartList from "@/components/cart/CartList";
import CheckoutCart from "@/components/cart/CheckoutCart";
import CheckoutArea from "@/components/checkout/CheckoutArea";
import CheckoutAreaWrapper from "@/components/checkout/CheckoutArea";
import CheckoutStepsBar from "@/components/checkout/CheckoutStepsBar";
import BreadCrumb from "@/components/helpers/BreadCrumb";
import MyImage from "@/components/ui/MyImage";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

interface MetaProps {
  params: { lang: string };
}

export async function generateMetadata({
  params: { lang },
}: MetaProps): Promise<Metadata> {
  const ar_title = "اكمال الطلب";
  const en_title = "Checkout";

  const title = lang == "ar" ? ar_title : en_title;

  return {
    title,
    robots: {
      index: false,
    },
  };
}

const CheckoutPage = () => {
  const t = useTranslations("BreadC");

  const items = [
    { name: t("crt"), link: "/cart" },
    { name: t("chkout"), link: "#" },
  ]; // for breadcrumb

  return (
    <div>
      <BreadCrumb items={items} />
      <div className="wrapper">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-6 order-2 lg:order-1">
            <CheckoutArea />
          </div>
          <div className="col-span-12 lg:col-span-6 order-1 lg:order-2">
            <CheckoutCart />
          </div>
        </div>

        {/* <CheckoutStepsBar /> */}

        <div className=""></div>
      </div>
    </div>
  );
};

export default CheckoutPage;
