export type noteType = {
  key: string;
  title: string;
  children?: noteType[];
  [k: string]: unknown;
};
export type noteContent = {
  key: string;
  title: string;
  desc: string;
  children?: noteType[];
  [k: string]: unknown;
};
