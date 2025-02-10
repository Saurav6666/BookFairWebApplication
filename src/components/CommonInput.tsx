import React from "react";
import { Field, ErrorMessage } from "formik";

interface CommonInputProps {
  label: string;
  name: string;
  type?: string;
  as?: string;
  options?: { value: string; label: string }[];
}

const CommonInput: React.FC<CommonInputProps> = ({
  label,
  name,
  type = "text",
  as,
  options,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      {as === "select" && options ? (
        <Field
          as="select"
          name={name}
          id={name}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      ) : (
        <Field
          type={type}
          name={name}
          id={name}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      )}

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default CommonInput;
