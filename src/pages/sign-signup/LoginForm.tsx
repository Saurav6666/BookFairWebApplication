import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import bookvideo from "../../assets/login.mp4";
import Header from "../../components/Header";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLoginSubmit = (values: { email: string; password: string }) => {
    const storedUsers = localStorage.getItem("users");
    // Retrieve users array from localStorage
    const users: { email: string; password: string; role: string }[] =
      storedUsers ? JSON.parse(storedUsers) : [];

    // Find the user with matching email and password
    const storedUser = users.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (storedUser) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(storedUser));

      if (storedUser.role === "seller") {
        navigate("/seller-dashboard");
      } else {
        navigate("/home");
      }
    } else {
      alert("Invalid credentials!");
    }
  };

  const handleRegistration = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="relative z-20 w-full sticky top-0 z-50">
        <Header hadleRegistration={handleRegistration} />
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <video
          src={bookvideo}
          autoPlay
          muted
          loop
          className="fixed top-0 left-0 w-full h-full object-cover z-0"
        ></video>
        <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-full max-w-4xl mx-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">
                Welcome Back!
              </h2>
              <p className="text-gray-600">
                Login to continue exploring a vast collection of books, meeting
                your favorite authors, and enjoying exclusive discounts.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Login</h2>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email("Invalid email format")
                    .required("Email is required"),
                  password: Yup.string().required("Password is required"),
                })}
                onSubmit={handleLoginSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    <div>
                      <label className="block text-gray-700">Your Email</label>
                      <div className="relative">
                        <Field
                          name="email"
                          type="email"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="name@example.com"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700">Password</label>
                      <div className="relative">
                        <Field
                          name="password"
                          type="password"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Enter your password"
                        />
                        <ErrorMessage
                          name="password"
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
                      Login
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
