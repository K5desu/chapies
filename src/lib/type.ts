export type articleprops = {
  action: string;
};
export type articleCard = {
  id?: string | undefined;
  title: string;
  content: string;
  tags: string;
  campas: boolean;
  img: string;
  url: string | null;
  userid: string;
};
export type articleUser = {
  uid?: string | undefined;
  image?: string | null;
  name?: string | null;
};
export type user = {
  uid?: string | undefined;
  mail?: string | undefined;
  message?: string | null;
  instagram?: string | null;
  X?: string | null;
  github?: string | null;
  name?: string | null;
  comment?: string | null;
  image?: string | null;
};
