import { api } from "n/utils/api";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const SignUp: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const { mutate, error, data } = api.login.signUp.useMutation();

  useEffect(() => {
    if (error) {
      errorToast(error.message);
    } else if (data) {
      successToast(data?.message);
    }
  }, [error, data]);

  const errorToast = (message: string) =>
    toast.error("SERVER ERROR: " + message);
  const successToast = (message: string) => toast.success(message);

  function handleLogin(dataUser: any) {
    const { name, email, password } = dataUser;
    // validação dos dados
    mutate({ name, email, password });
  }

  return (
    <>
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit(handleLogin)}
        action=""
        className="flex h-full flex-col items-center justify-center"
      >
        {" "}
        <h1 className="m-4 text-4xl">Sign UP</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block">
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="border p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="border p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="border p-2"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Sign UP
        </button>
      </form>
    </>
  );
};

export default SignUp;
