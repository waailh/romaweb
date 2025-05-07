"use client";

interface Props {
  perLine?: number;
}

const ProductsLoader = ({ perLine }: Props) => {
  return (
    <div className="grid grid-cols-12 gap-2">
      <ProductLoader perLine={perLine} />
      <ProductLoader perLine={perLine} />
      <ProductLoader perLine={perLine} />
      <ProductLoader perLine={perLine} />
      <ProductLoader perLine={perLine} />
      <ProductLoader perLine={perLine} />
      <ProductLoader perLine={perLine} />
      <ProductLoader perLine={perLine} />
      <ProductLoader perLine={perLine} />
      <ProductLoader perLine={perLine} />
      <ProductLoader perLine={perLine} />
      <ProductLoader perLine={perLine} />
      <ProductLoader perLine={perLine} />
      <ProductLoader perLine={perLine} />
      <ProductLoader perLine={perLine} />
      <ProductLoader perLine={perLine} />
    </div>
  );
};

export default ProductsLoader;

const ProductLoader = ({ perLine }: Props) => {
  let cols;
  switch (perLine) {
    case 4:
      cols = "3";
      break;

    default:
      cols = "4";
      break;
  }

  return (
    <div className={`col-span-6 lg:col-span-${cols}`}>
      <div className="min-h-40 md:min-h-60 border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-s-4">
          <div className="rounded-full bg-gray-300 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-gray-300 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-gray-300 rounded col-span-2"></div>
                <div className="h-2 bg-gray-300 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-gray-300 rounded"></div>
              <div className="mt-2 h-2 bg-gray-300 rounded"></div>
              <div className="mt-2 h-2 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
