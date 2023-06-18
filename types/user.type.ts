export type UserType = {
  name: string;
  lastName: string;
  email: string;
  address: string;
  postalCode: number;
  products: {
    price: number;
    quantity: number;
    productName: string;
  }[];
  _id:string
};
