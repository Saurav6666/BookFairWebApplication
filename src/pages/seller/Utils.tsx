import * as Yup from "yup";

export const validationSchema = Yup.object({
  bookName: Yup.string().required("Book name is required"),
  authorName: Yup.string().required("Author name is required"),
  price: Yup.number()
    .positive("Price must be positive")
    .required("Price is required"),
  bookType: Yup.string().required("Book type is required"),
});
//interface
export interface Book {
  id: string;
  bookName: string;
  authorName: string;
  price: number;
  bookType: string;
  image: string | File;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  books: Book[];
}
