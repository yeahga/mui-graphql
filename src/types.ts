export type Option = {
  name: string;
  id: string | number;
  custom?: boolean;
};

export type Inputs = {
  name: string;
  bio: string;
  position: Option | null;
  relation: Option[];
};
