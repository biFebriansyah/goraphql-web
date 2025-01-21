export type Users = {
  [key: string]: any;
  readonly _id: string;
  readonly name: string;
  readonly email: string;
  readonly admin: boolean;
  readonly created_at: string;
};

export type Product = {
  [key: string]: any;
  readonly _id: string;
  readonly name: string;
  readonly price: number;
  readonly stock: number;
  readonly created_at: string;
};

export type MetaData = {
  readonly total: number;
  readonly prev: number;
  readonly next: number;
};

export type UsersDetail = {
  data: Users[];
  meta: MetaData;
};

export type ProductsDetail = {
  data: Product[];
  meta: MetaData;
};

export type UserSignin = {
  readonly email: string;
  readonly password: string;
};

export type UserSignup = {
  [key: string]: any;
  readonly name: string;
  readonly email: string;
  readonly admin: boolean;
  readonly password: string;
};

export type Newproduct = {
  [key: string]: any;
  readonly name: string;
  readonly price: number;
  readonly stock: number;
};
