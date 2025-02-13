import React from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/16/solid";
import { Book } from "./Utils";
import Soldout from "../../../public/images/soldout.png";

interface BookCardProps {
  book: Book;
  handleOpenModal: (book: Book) => void; // ✅ Accepts a Book argument
  setConfirmDelete: (confirmData: {
    isOpen: boolean;
    bookId: string | null;
    bookName: string;
  }) => void; // ✅ Accepts an object
}

const BookCard = ({
  book,
  handleOpenModal,
  setConfirmDelete,
}: BookCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4">
      {book.image ? (
        <img
          src={
            book.image instanceof File
              ? URL.createObjectURL(book.image)
              : book.image
          }
          alt={book.bookName}
          className="w-16 h-16 object-cover rounded-md"
        />
      ) : (
        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md">
          📚
        </div>
      )}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{book.bookName}</h3>
        <p className="text-sm text-gray-600">{book.authorName}</p>
        <p className="text-sm text-gray-600">Category: {book.bookType}</p>
        <p className="text-sm text-gray-600 flex">
          Quantity: {book.quantity}{" "}
          {Number(book.quantity) === 0 && (
            <span>
              <img
                src={Soldout}
                alt="Sold Out"
                className="w-24 h-10 object-contain"
              />
            </span>
          )}
        </p>
        <p className="text-sm font-semibold">Price: ${book.price}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleOpenModal(book)}
          className="px-3 py-1 bg-primary  text-white text-xs rounded-md hover:bg-primaryDark"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() =>
            setConfirmDelete({
              isOpen: true,
              bookId: book.id,
              bookName: book.bookName,
            })
          }
          className="px-3 py-1 bg-danger text-white text-xs rounded-md hover:bg-dangerDark"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default BookCard;
