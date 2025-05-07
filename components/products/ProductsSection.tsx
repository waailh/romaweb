import { Product } from "@/typings";
import SectionTitle from "../ui/SectionTitle";
import ProductsList from "./ProductsList";

interface Props {
  title: string;
  des: string;

  prods: Product[];
}

const ProductsSection = ({ title, des, prods }: Props) => {
  return (
    <div className="md:mt-12 md:py-4">
      <div className="wrapper">
        <div className="w-full flex flex-col">
          <SectionTitle title={title} />
          <p>{des}</p>
        </div>
      </div>
      <div className="wrapper">
        <ProductsList products={prods} />
      </div>
    </div>
  );
};

export default ProductsSection;
