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
export type SearchState = {
  name: string;

  searchtag: string;
};
export type SearchActions = {
  setSearchName: (name: string) => void;

  setSearchTag: (tag: string) => void;
};
export type SearchStore = SearchState & SearchActions;

export const defaultInitSearchState: SearchState = {
  name: "",
  searchtag: "",
};
export const useSearchStore = create<SearchStore>((set) => ({
  ...defaultInitSearchState,

  setSearchName: (name: string) => set(() => ({ name: name })),

  setSearchTag: (searchtag: string) => set(() => ({ searchtag: searchtag })),
}));
