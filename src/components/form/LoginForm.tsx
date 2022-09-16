import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const loginInitialValue = {
    email: "",
    password: "",
  };

  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleOnSubmit = (values: any) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div className="m-auto flex h-screen max-w-xl items-center justify-center">
      <div className="w-full">
        <h1 className="mb-4 text-center text-lg font-bold">Login</h1>
        <Formik
          initialValues={loginInitialValue}
          validationSchema={loginValidationSchema}
          onSubmit={handleOnSubmit}
        >
          <Form className="flex flex-col gap-y-2">
            <div className=" flex w-full cursor-pointer flex-col rounded-xl bg-[#131313] p-2">
              <label htmlFor="email" className="text-white">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="text"
                className="bg-[#131313] text-white outline-none"
              />
              <div className="text-xs text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>

            <div className="flex w-full cursor-pointer flex-col rounded-xl bg-inputBackground p-2">
              <div className="flex w-full flex-row justify-between">
                <div className="flex flex-col">
                  <label htmlFor="password" className="text-white">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type={isPasswordShown ? "text" : "password"}
                    className="bg-inputBackground text-white outline-none"
                  />

                  <div className="text-xs text-red-500">
                    <ErrorMessage name="password" />
                  </div>
                </div>

                <a
                  onClick={toggleShowPassword}
                  className="mx-4 flex items-center"
                >
                  {isPasswordShown ? (
                    <FaEyeSlash
                      color="#FFFFFF"
                      size={20}
                      className="animate-fadeIn"
                    />
                  ) : (
                    <FaEye
                      color="#FFFFFF"
                      size={20}
                      className="animate-fadeIn"
                    />
                  )}
                </a>
              </div>
            </div>

            <button className="w-full select-none rounded-xl bg-primary py-2 text-white">
              Login
            </button>
          </Form>
        </Formik>
        <div className="flex items-center justify-center text-sm">
          <span>Doesn't have an account? </span>
          <Link to="/register" className="underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
