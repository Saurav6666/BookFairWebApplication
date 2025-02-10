import React from "react";
import { DeleteModalProps } from "./Utils";
const DeleteModal: React.FC<DeleteModalProps> = ({
  confirmDelete,
  setConfirmDelete,
  handleDeleteBook,
}) => {
  if (!confirmDelete.isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
        <p>
          Are you sure you want to delete{" "}
          <strong>{confirmDelete.bookName}</strong>?
        </p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() =>
              setConfirmDelete({
                isOpen: false,
                bookId: null,
                bookName: "",
              })
            }
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteBook}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
