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
