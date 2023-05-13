import React from "react";

import { useForm } from "react-hook-form";

const SignIn: React.FC = () => {
  const { register, handleSubmit } = useForm();

  function handleLogin(data: any) {
    console.log(data);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        action=""
        className="flex h-full flex-col items-center justify-center"
      >
        <h1 className="m-4 text-4xl">Sign In</h1>
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
          Login
        </button>
      </form>
    </>
  );
};

export default SignIn;
