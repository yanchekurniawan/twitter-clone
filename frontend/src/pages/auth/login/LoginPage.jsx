import { useState } from "react";
import { Link } from "react-router-dom";
import XSvg from "../../../components/svgs/X";
import { MdOutlineMail, MdPassword } from "react-icons/md";
import axios from "axios";

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnChange = (e) => {
    e.preventDefault();
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(loginForm);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          ...loginForm,
        }
      );
      console.log(response);
    } catch (error) {
      setErrorMessage(error.response.data.error);
      console.log(`Error at handleFormSubmit: ${error.response.data.error}`);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      <div className="flex-1 hidden lg:flex items-center justify-center">
        <XSvg className="lg:w-2/3 fill-white" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <form
          className="flex flex-col w-full lg:w-2/3 gap-4 px-14 lg:px-0"
          /* mx-auto md:mx-20 */
          onSubmit={handleFormSubmit}
        >
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-extrabold text-white">Enter X</h1>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="text"
              className="grow"
              name="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={handleOnChange}
            />
          </label>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              name="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={handleOnChange}
            />
          </label>
          <button className="btn btn-primary rounded-full text-white">
            Login
          </button>
        </form>
        <div className="flex gap-1 my-1 px-14 w-full lg:w-2/3 lg:px-0">
          <div className="flex justify-center items-center flex-1">
            <div className="h-px bg-zinc-700 w-full"></div>
          </div>
          <div className="flex justify-center items-center">
            <p className="mx-2 text-white">or</p>
          </div>
          <div className="flex justify-center items-center flex-1">
            <div className="h-px bg-zinc-700 w-full"></div>
          </div>
        </div>
        <div className="flex flex-col px-14 w-full lg:w-2/3 lg:px-0">
          <Link to={"/signup"}>
            <button className="btn btn-primary btn-outline rounded-full text-white w-full">
              Create an account
            </button>
          </Link>

          <p className="text-xs text-wrap mt-2 text-zinc-500">
            By registering, you agree to{" "}
            <span className="text-primary">the Terms of Service</span> and{" "}
            <span className="text-primary">Privacy Policy</span>, including{" "}
            <span className="text-primary">Use of Cookies</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
