import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router";
import Header from "../../components/Header";
import bookvideo from "../../assets/login.mp4";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const handleRegistration = () => {
    navigate("/register"); // Update the path as needed
  };

  const handleLogin = () => {
    navigate("/login"); // This might not be necessary as we are already in login
  };
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
  return (
    <>
      <div className="relative z-20 w-full h-16  sticky top-0 z-50">
        <Header
          hadleRegistration={handleRegistration}
          hadleLogin={handleLogin}
        />
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-700 p-6">
        <video
          src={bookvideo}
          autoPlay
          muted
          loop
          className="fixed top-0 left-0 w-full h-full object-cover z-0"
        ></video>
        <div className=" relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          {/* Left Side - Description */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Welcome to the Book Fair
            </h2>
            <p className="text-gray-600">
              Join us for an amazing experience where you can explore a vast
              collection of books, meet your favorite authors, and enjoy
              exclusive discounts.
            </p>
          </div>

          {/* Right Side - Form */}
          <div>
            <h2 className="text-center text-blue-600 font-semibold mb-4 text-2xl">
              Register Now
            </h2>
            <Formik
              initialValues={{
                profilepicture: null,
                name: "",
                email: "",
                role: "",
                shopname: "",
                address: "",
                password: "",
                confirmpasword: "",
                logo: null,
                logoBase64: "",
                profilepictureBase64: "",
              }}
              validationSchema={Yup.object({
                profilepicture: Yup.string().required(
                  "profile picture is required"
                ),
                name: Yup.string().required("Name is required"),
                email: Yup.string()
                  .email("Invalid email format")
                  .required("Email is required"),
                role: Yup.string().required("Please select a role"),
                password: Yup.string().required("Password is required"),
                confirmpasword: Yup.string()
                  .oneOf([Yup.ref("password")], "Password must match")
                  .required("confirmpasword is required"),
                shopname: Yup.string().when("role", {
                  is: "seller",
                  then: (schema) => schema.required("Shop name is required"),
                  otherwise: (schema) => schema.notRequired(),
                }),
                address: Yup.string().when("role", {
                  is: "seller",
                  then: (schema) => schema.required("Address is required"),
                  otherwise: (schema) => schema.notRequired(),
                }),
                logo: Yup.mixed().when("role", {
                  is: "seller",
                  then: (schema) => schema.required("Logo is required"),
                  otherwise: (schema) => schema.notRequired(),
                }),
              })}
              onSubmit={async (values, { setSubmitting, setFieldError }) => {
                const storedUsers = localStorage.getItem("users");
                const users = storedUsers ? JSON.parse(storedUsers) : [];

                console.log("Existing Users:", users); // Debugging

                const emailExists = users.some(
                  (user: { email: string }) => user.email === values.email
                );
                if (emailExists) {
                  setFieldError("email", "Email already exists");
                  setSubmitting(false);
                  return;
                }

                // Convert profile picture & logo safely
                if (
                  values.logo &&
                  values.logo instanceof FileList &&
                  values.logo.length > 0
                ) {
                  const file = values.logo[0]; // Extract file
                  values.logoBase64 = await convertToBase64(file);
                }

                if (
                  values.profilepicture &&
                  values.profilepicture instanceof FileList &&
                  values.profilepicture.length > 0
                ) {
                  const file = values.profilepicture[0]; // Extract file
                  values.profilepictureBase64 = await convertToBase64(file);
                }

                // Save to localStorage
                users.push({ ...values, password: values.password }); // Avoid storing confirm password
                localStorage.setItem("users", JSON.stringify(users));

                console.log("Form Submitted & Stored:", values);
                navigate("/login");
              }}
            >
              {({ setFieldValue, isSubmitting, values }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium">
                      Profile Picture
                    </label>
                    <div
                      className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-gray-600 cursor-pointer hover:border-blue-500 transition"
                      onClick={() =>
                        document.getElementById("profileUpload")?.click()
                      }
                    >
                      {values.profilepictureBase64 ? (
                        <img
                          src={values.profilepictureBase64}
                          alt="Profile Preview"
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      ) : (
                        <p className="text-sm text-center">
                          Drag & drop or click to upload an image
                        </p>
                      )}

                      <input
                        id="profileUpload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (event) => {
                          const file = event.target.files?.[0]; // Extract single file
                          if (file) {
                            const base64 = await convertToBase64(file);
                            setFieldValue("profilepicture", event.target.files); // Store FileList
                            setFieldValue("profilepictureBase64", base64);
                          }
                        }}
                      />
                    </div>
                    <ErrorMessage
                      name="profilepicture"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Two fields in one row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700">Name</label>
                      <Field
                        name="name"
                        type="text"
                        className="w-full p-2 border rounded-lg"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700">Email</label>
                      <Field
                        name="email"
                        type="email"
                        className="w-full p-2 border rounded-lg"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Another row of two fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700">Address</label>
                      <Field
                        name="address"
                        type="text"
                        className="w-full p-2 border rounded-lg"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700">Role</label>
                      <Field
                        as="select"
                        name="role"
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="">Select Role</option>
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                      </Field>
                      <ErrorMessage
                        name="role"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {values.role === "seller" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700">Shop Name</label>
                        <Field
                          name="shopname"
                          type="text"
                          className="w-full p-2 border rounded-lg"
                        />
                        <ErrorMessage
                          name="shopname"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700">Shop Logo</label>
                        <input
                          type="file"
                          accept="image/*"
                          className="w-full p-2 border rounded-lg"
                          onChange={async (event) => {
                            const file = event.target.files?.[0];
                            if (file) {
                              const base64 = await convertToBase64(file);
                              setFieldValue("logo", file);
                              setFieldValue("logoBase64", base64);
                            }
                          }}
                        />

                        <ErrorMessage
                          name="logo"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                  )}

                  {/* Password Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700">Password</label>
                      <Field
                        name="password"
                        type="password"
                        className="w-full p-2 border rounded-lg"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700">
                        Confirm Password
                      </label>
                      <Field
                        name="confirmpasword"
                        type="password"
                        className="w-full p-2 border rounded-lg"
                      />
                      <ErrorMessage
                        name="confirmpasword"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    Register
                  </button>
                  <div className="w-full text-end">
                    <NavLink
                      to={"/login"}
                      className="text-blue-600 font-semibold"
                    >
                      Login
                    </NavLink>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
export default RegistrationForm;
