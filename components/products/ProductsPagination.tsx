"use client";

import { useProducts } from "@/store/products/products";
import { PageMeta } from "@/typings";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import ReactPaginate from "react-paginate";
import { useFetchProducts } from "../hooks/useFetchProducts";

interface Props {
  catId: number;
}

const ProductsPagination = ({ catId }: Props) => {
  const { meta, page, setPage } = useProducts();

  const { fetchProducts } = useFetchProducts(catId);

  // useEffect(() => {
  //   if (meta && page !== null && page >= 0) setPage(meta.current_page - 1);
  // }, [meta]);

  const handleFetch = (prevPage: number) => {
    setPage(prevPage);
    fetchProducts({ page: prevPage, maintainFilter: true });
  };

  return (
    <div dir="ltr" className="mt-6 flex items-center justify-center">
      <ReactPaginate
        previousLabel={<ChevronLeftIcon className="size-5" />}
        nextLabel={<ChevronRightIcon className="size-5" />}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageClassName={"pb-1 border-b-4 border-transparent"}
        activeClassName={"text-primary !border-primary"}
        containerClassName={"w-fit flex space-s-2"}
        forcePage={page || 0}
        pageCount={meta?.last_page || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => handleFetch(selected)}
      />
    </div>
  );
};

export default ProductsPagination;
