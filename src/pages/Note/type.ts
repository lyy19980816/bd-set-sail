export type noteType = {
  key: string;
  title: string;
  children?: noteType[];
  [k: string]: unknown;
};
export type noteCentent = {
  key: string;
  title: string;
  desc: string;
  children?: noteType[];
  [k: string]: unknown;
};
