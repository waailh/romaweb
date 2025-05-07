import InnerWishlist from "@/components/wishlist/InnerWishlist";
import { Metadata } from "next";

interface MetaProps {
  params: { lang: string };
}

export async function generateMetadata({
  params: { lang },
}: MetaProps): Promise<Metadata> {
  const ar_title = "المفضلة";
  const en_title = "Wishlist";

  const title = lang == "ar" ? ar_title : en_title;

  return {
    title,
    robots: {
      index: false,
    },
  };
}

interface Props {
  params: { uid: string };
}

const WishlistPage = ({ params: { uid } }: Props) => {
  return (
    <div className="py-2 md:py-4 w-full">
      <InnerWishlist />
    </div>
  );
};

export default WishlistPage;
