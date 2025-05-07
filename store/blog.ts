import { BlogArticle, BlogCategory } from "@/typings";
import { create } from "zustand";

type BlogsMeta = { current_page: number; last_page: number; total: number };

interface ColorsState {
  activeBlogCat: number | "all";
  setActiveBlogCat: (data: number | "all") => void;

  keyword: string;
  setKeyword: (data: string) => void;

  loading: boolean;
  setLoading: (data: boolean) => void;

  blogs: BlogArticle[];
  setBlogs: (data: BlogArticle[]) => void;

  blogsMeta: BlogsMeta | null;
  setBlogsMeta: (data: BlogsMeta) => void;
}

export const useBlogs = create<ColorsState>((set) => ({
  activeBlogCat: "all",
  setActiveBlogCat: (data) => set(() => ({ activeBlogCat: data })),

  keyword: "",
  setKeyword: (data) => set(() => ({ keyword: data })),

  loading: false,
  setLoading: (data) => set(() => ({ loading: data })),

  blogs: [],
  setBlogs: (data) => set(() => ({ blogs: data })),

  blogsMeta: null,
  setBlogsMeta: (data) => set(() => ({ blogsMeta: data })),
}));
