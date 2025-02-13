import * as Yup from "yup";

export const validationSchema = Yup.object({
  bookName: Yup.string().required("Book name is required"),
  authorName: Yup.string().required("Author name is required"),
  price: Yup.number()
    .positive("Price must be positive")
    .required("Price is required"),
  quantity: Yup.string().required("quantity is required"),
  bookType: Yup.string().required("Book type is required"),
});
//interface
export interface Book {
  id: string;
  bookName: string;
  authorName: string;
  price: number;
  quantity: number;
  bookType: string;
  image: string | File;
  shopname: string;
}

export interface Order {
  id: string;
  date: string;
  books: Book[];
}
export interface userinfo {
  name: string;
  email: string;
  address: string;
  role: string;
  shopname: string;
  password: string;
  logo: string;
}
