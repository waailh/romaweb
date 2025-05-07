import { axiosPure } from "@/lib/auth/axios/axios";
import { useBlogs } from "@/store/blog";

export const useFetchArticles = () => {
  type FuncParams = { page: number; keyword: string; cat: number | "all" };

  const { loading, setLoading, setBlogs, setBlogsMeta } = useBlogs();

  const fetchArticles = ({ page, keyword, cat }: FuncParams) => {
    if (page !== null) {
      let params = new URLSearchParams();

      params.set("page", page.toString());
      params.set("search", keyword.toString());
      params.set("selected_categories", cat == "all" ? "" : cat.toString());

      const searchParams = params.toString();

      const axios = axiosPure();
      setLoading(true);

      axios
        .get(`/blog?${searchParams}`)
        .then((res) => {
          setLoading(false);
          if (res.data.success) {
            const {
              articles: { data: posts, current_page, last_page, total },
            } = res.data.data;
            setBlogs(posts);
            setBlogsMeta({ current_page, last_page, total });
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  return { fetchArticles };
};
