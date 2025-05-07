"use client";

import { Link } from "@/i18n.config";
import MyImage from "../ui/MyImage";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

interface Props {
  slug: string;
}

const BlogArticleProduct = ({ slug }: Props) => {
  return (
    <div>
      <div className="mt-4 flex items-center justify-center">
        <div className="w-full bg-lightgray max-w-[750px] p-2 md:p-3 rounded flex flex-col space-y-2 md:flex-row md:space-y-0 md:items-center md:space-s-2">
          <div className="w-full md:w-[50%]">
            <Link href="/product/one">
              <div className="relative w-full min-h-40 aspect-[4/3] overflow-hidden rounded">
                <MyImage
                  src="/"
                  className="hover:scale-[1.02] duration-500 object-cover transition-all ease-in"
                  fill
                />
              </div>
            </Link>
          </div>
          <div className="w-full md:w-[50%] flex flex-col justify-center items-center text-center text-sm space-y-3">
            <h3>{"hhhhh"}</h3>
            <p>{"hhhhh"}</p>
            <p>{"hhhhh"}</p>
            {/* add to cart */}
            <button className="mt-1 w-full md:max-w-40 text-sm flex items-center space-s-2 justify-center px-2 py-1 md:px-4 md:py-2 border-2 border-primary bg-primary rounded hover:shadow hover:border-black hover:text-black text-white hover:bg-white transition-all duration-300 ease-in">
              <span>Add to Cart</span>
              <ShoppingCartIcon className="size-4" />
            </button>
            <Link
              href="/product/from-article"
              className="pb-1 border-b border-primary text-primary hover:text-black hover:border-black duration-300"
            >
              View Full Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogArticleProduct;
