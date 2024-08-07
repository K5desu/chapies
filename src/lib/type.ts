export type articleprops = {
  action: string;
};
export type articleCard = {
  id: string;
  title: string;
  content: string;
  tags: string;
  campas: boolean;
  img: string;
  url: string | null;
  userid: string;
};
export type articleUser = {
  id: string;
  image?: string | null;
  name?: string | null;
};
export type user = {
  id: string;
  mail: string;
  instagram?: string | null;
  X?: string | null;
  github?: string | null;
  name?: string | null;
  comment?: string | null;
  image?: string | null;
};
