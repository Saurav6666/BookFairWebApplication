export interface ConfirmDelete {
  isOpen: boolean;
  bookId: string | null;
  bookName: string;
}

export interface DeleteModalProps {
  confirmDelete: ConfirmDelete;
  setConfirmDelete: React.Dispatch<React.SetStateAction<ConfirmDelete>>;
  handleDeleteBook: () => void;
}
export interface Book {
  id: string;
  bookName: string;
  authorName: string;
  price: number;
  quantity: number;
  bookType: string;
  image: string | File;
}

export interface Order {
  id: string;
  date: string;
  books: Book[];
}
//header interface
export type HeaderProps = {
  hadleRegistration?: () => void;
  hadleLogin?: () => void;
};
export type User = {
  role: "buyer" | "seller";
  shopname?: string;
  profilepictureBase64?: File;
  logoBase64?: File;
};
