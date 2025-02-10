import React from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/16/solid";
import { Book } from "./Utils";
interface BookCardProps {
  book: Book;
  handleOpenModal: () => void;
  setConfirmDelete: () => void;
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
          src={book.image}
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
        <p className="text-sm font-semibold">Price: ${book.price}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleOpenModal(book)}
          className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
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
          className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default BookCard;
