import React, { useEffect, useState, useRef } from "react";
import { Formik, Form } from "formik";
import CommonInput from "../../components/CommonInput";
import { addBook, updateBook } from "../../api-services/bookService";
import { Book, validationSchema } from "./Utils";
import { X } from "lucide-react";

type Modaltypes = {
  handleCloseModal?: () => void;
  hanleRefresh: () => void;
  book?: Book | null | undefined;
};

const AddBook: React.FC<Modaltypes> = ({
  handleCloseModal,
  hanleRefresh,
  book,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (book?.image) {
      setImagePreview(book.image);
    }
  }, [book]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleCloseModal?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleCloseModal]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 sm:px-0 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl sm:w-10/12 sm:max-h-[80vh] max-h-[60vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={handleCloseModal}
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl  text-blue-600 font-semibold text-center mb-4">
          {book ? "Update Book" : "Add New Book"}
        </h2>

        <div className="flex flex-col sm:flex-row">
          {/* Image Preview */}
          <div className="sm:w-1/3 pr-0 sm:pr-4 mb-4 sm:mb-0">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Book Preview"
                className="w-full h-40 sm:h-64 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-40 sm:h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                No Image Selected
              </div>
            )}
          </div>

          {/* Form Section */}
          <div className="sm:w-2/3">
            <Formik
              initialValues={{
                bookName: book?.bookName || "",
                authorName: book?.authorName || "",
                price: book?.price || 0,
                quantity: book?.quantity || 1,
                bookType: book?.bookType || "",
                image: book?.image || null,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                if (!values.image || typeof values.image === "string") {
                  values.image = book?.image || null;
                }
                try {
                  if (book?.id) {
                    await updateBook(book.id, values);
                  } else {
                    await addBook(values);
                  }
                  hanleRefresh();
                  handleCloseModal?.();
                } catch (error) {
                  console.error("Error adding book:", error);
                }
              }}
            >
              {({ setFieldValue }) => (
                <Form>
                  <CommonInput
                    label="Book Name"
                    name="bookName"
                    placeholder="add book name"
                  />
                  <CommonInput
                    label="Author Name"
                    name="authorName"
                    placeholder="add author name"
                  />
                  <CommonInput label="Price" name="price" type="number" />
                  <CommonInput
                    label="Quantity"
                    name="quantity"
                    type="number"
                    placeholder="add books quantity"
                  />
                  <CommonInput
                    label="Book Type"
                    name="bookType"
                    as="select"
                    options={[
                      { value: "fiction", label: "Fiction" },
                      { value: "non-fiction", label: "Non-fiction" },
                      { value: "sci-fi", label: "Sci-fi" },
                      { value: "mystery", label: "Mystery" },
                      { value: "biography", label: "Biography" },
                      { value: "history", label: "History" },
                      { value: "romance", label: "Romance" },
                      { value: "fantasy", label: "Fantasy" },
                    ]}
                  />

                  {/* File Input */}
                  <div className="mb-4">
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Upload Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          setFieldValue("image", file);
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFieldValue("imageBase64", reader.result);
                            setImagePreview(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        } else {
                          setFieldValue("image", book?.image || null);
                        }
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="image"
                      className="mt-2 inline-block px-4 py-2 border-2 border-gray-500 bg-transparent text-gray-700 font-semibold rounded-md cursor-pointer hover:bg-gray-100 w-full"
                    >
                      Upload Book Cover
                    </label>
                  </div>

                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      {book ? "Update Book" : "Add Book"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
