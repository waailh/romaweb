import InnerByColorPage from "@/components/products/InnerByColorPage";
import { getFetchOptions } from "@/lib/utils";
import { color } from "framer-motion";
import { Metadata } from "next";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_URL!;

interface MetaProps {
  params: { lang: string };
}

export async function generateMetadata({
  params: { lang },
}: MetaProps): Promise<Metadata> {
  const ar_title = "منتجات روما";
  const en_title = "Roma Products";

  const title = lang == "ar" ? ar_title : en_title;

  return {
    title,
    robots: {
      index: false,
    },
  };
}

interface Props {
  params: { color: string };
}

const fetchColorData = async (color: string) => {
  const fetchOptions = getFetchOptions();

  const res = await fetch(`${backendHost}/colors/one/${color}`, fetchOptions);

  const data = await res.json();
  return data?.data;
};

const ByColorPage = async ({ params: { color } }: Props) => {
  const colour = await fetchColorData(color);

  return (
    <div>
      <InnerByColorPage data={colour} />
    </div>
  );
};

export default ByColorPage;
