const CartModalProductLoader = () => {
  return (
    <div className="w-full">
      <div className="min-h-48 md:min-h-60 border-gray-300 w-full">
        <div className="animate-pulse flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-s-2">
          <div className="rounded bg-gray-300 h-40 w-full md:w-44 md:h-44"></div>
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

export default CartModalProductLoader;
