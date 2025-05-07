import InnerCart from "@/components/cart/InnerCart";
import { Metadata } from "next";

interface MetaProps {
  params: { lang: string };
}

export async function generateMetadata({
  params: { lang },
}: MetaProps): Promise<Metadata> {
  const ar_title = "السلة";
  const en_title = "Cart";

  const title = lang == "ar" ? ar_title : en_title;

  return {
    title,
    robots: {
      index: false,
    },
  };
}

const CartPage = async () => {
  return (
    <div className="">
      <InnerCart />
    </div>
  );
};

export default CartPage;
