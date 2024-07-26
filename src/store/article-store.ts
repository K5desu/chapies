import { create } from "zustand";
export type ArticleState = {
  title: string;
  img: string;
  tag: string;
  content: string;
};

export type ArticleActions = {
  setArticleTitle: (title: string) => void;
  setArticleImg: (img: string) => void;
  setArticleTag: (tag: string) => void;
  setArticleContent: (content: string) => void;
};
export type ArticleStore = ArticleState & ArticleActions;

export const defaultInitState: ArticleState = {
  title: "",
  img: "",
  tag: "",
  content: "",
};
export const useArticleStore = create<ArticleStore>((set) => ({
  ...defaultInitState,

  setArticleTitle: (title: string) => set(() => ({ title: title })),
  setArticleImg: (img: string) => set(() => ({ img: img })),
  setArticleTag: (tag: string) => set(() => ({ tag: tag })),
  setArticleContent: (content: string) => set(() => ({ content: content })),
}));
