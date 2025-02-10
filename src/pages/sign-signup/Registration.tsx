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
  return (
    <>
      <div className="relative z-20 w-full h-16">
        <Header
          hadleRegistration={handleRegistration}
          hadleLogin={handleLogin}
        />
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
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
            <h2 className="text-xl font-semibold mb-4">Register Now</h2>
            <Formik
              initialValues={{
                name: "",
                email: "",
                role: "",
                shopname: "",
                address: "",
                password: "",
                confirmpasword: "",
                logo: null,
              }}
              validationSchema={Yup.object({
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
              onSubmit={(values, { setSubmitting, setFieldError }) => {
                const storedUsers = localStorage.getItem("users");

                const users = storedUsers ? JSON.parse(storedUsers) : [];
                const emailExists = users.some(
                  (user: { email: string }) => user.email === values.email
                );

                if (emailExists) {
                  setFieldError("email", "Email already exists");
                  setSubmitting(false);
                } else {
                  users.push(values);
                  localStorage.setItem("users", JSON.stringify(users));
                  console.log("Form Submitted", values);
                  navigate("/login");
                }
              }}
            >
              {({ isSubmitting, values }) => (
                <Form className="space-y-4">
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

                  {values.role === "seller" && (
                    <>
                      {" "}
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
                        <label className="block text-gray-700">Shop Logo</label>
                        <Field
                          name="logo"
                          type="file"
                          className="w-full p-2 border rounded-lg"
                        />
                        <ErrorMessage
                          name="logo"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </>
                  )}
                  <div>
                    <label className="block text-gray-700">Password</label>
                    <Field
                      name="password"
                      type="text"
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
                      type="text"
                      className="w-full p-2 border rounded-lg"
                    />
                    <ErrorMessage
                      name="confirmpasword"
                      component="div"
                      className="text-red-500 text-sm"
                    />
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
                      {" "}
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
