import { useState } from "react";
import XSvg from "../../../components/svgs/X";
import { MdOutlineAbc, MdOutlineMail, MdPassword } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullname: "",
    password: "",
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      try {
        await axios.post("api/auth/signup", {
          ...data,
        });
        toast("Account created succesfully", {
          position: "bottom-center",
          style: {
            backgroundColor: "1D9BF0",
            color: "#fff",
          },
        });
      } catch (error) {
        toast(error.response.data.error, {
          position: "bottom-center",
          style: {
            backgroundColor: "#1D9BF0",
            color: "#fff",
          },
        });
      }
    },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      <div className="flex-1 hidden lg:flex items-center justify-center">
        <XSvg className="lg:w-2/3 fill-white" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form
          className="flex flex-col px-14 lg:w-2/3 lg:px-0 gap-4"
          onSubmit={handleFormSubmit}
        >
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-extrabold text-white">Join today.</h1>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="text"
              className="grow"
              name="email"
              placeholder="Email"
              onChange={handleOnChange}
              value={formData.email}
            />
          </label>
          <div className="flex gap-4 flex-wrap">
            <label className="input input-bordered rounded flex items-center gap-2 flex-1">
              <FaUser />
              <input
                type="text"
                className="grow"
                name="username"
                placeholder="Username"
                onChange={handleOnChange}
                value={formData.username}
              />
            </label>
            <label className="input input-bordered rounded flex items-center gap-2 flex-1">
              <MdOutlineAbc />
              <input
                type="text"
                className="grow"
                name="fullname"
                placeholder="Fullname"
                onChange={handleOnChange}
                value={formData.fullname}
              />
            </label>
          </div>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              name="password"
              placeholder="Password"
              onChange={handleOnChange}
              value={formData.password}
            />
          </label>
          <button className="btn btn-primary rounded-full text-white">
            {isPending ? "Loading..." : "Sign Up"}
          </button>
          {/* {isError && <p className="text-red-500">Something went wrong</p>} */}
        </form>
        <div className="flex flex-col px-14 w-full lg:w-2/3 lg:px-0 gap-2 mt-4">
          <p className="font-bold">Already have an account?</p>
          <Link to={"/login"}>
            <button className="btn rounded-full btn-outline btn-primary w-full text-white">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
