"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import ReactPaginate from "react-paginate";
import { useFetchArticles } from "../hooks/useFetchArticles";
import { useBlogs } from "@/store/blog";
import { useState } from "react";

const BlogPagination = () => {
  const { blogsMeta, keyword, activeBlogCat } = useBlogs();

  const { fetchArticles } = useFetchArticles();

  const [page, setPage] = useState<number>();

  const handleFetch = (prevPage: number) => {
    setPage(prevPage);
    fetchArticles({ page: prevPage + 1, keyword: keyword, cat: activeBlogCat });
  };

  if (blogsMeta?.last_page == 1) return;

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
        pageCount={blogsMeta?.last_page || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => handleFetch(selected)}
      />
    </div>
  );
};

export default BlogPagination;
