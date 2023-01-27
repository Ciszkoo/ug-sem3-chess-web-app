import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useAppDispatch } from "../../reducers/hooks";
import { sessionCheck } from "../../reducers/authReducer";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("http://localhost:5000/api/auth/login", data);
      dispatch(sessionCheck());
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
  });

  return (
    <form
      className="flex flex-col gap-2 p-5 bg-stone-700 shadow-md shadow-stone-600 rounded-xl"
      onSubmit={onSubmit}
    >
      <p className="font-bold self-center">Logowanie</p>
      <input
        className="bg-stone-500 p-2 rounded-md active:outline-none focus:outline-none"
        type="email"
        placeholder="E-mail..."
        {...register("email")}
      />
      <input
        className="bg-stone-500 p-2 rounded-md active:outline-none focus:outline-none"
        type="password"
        placeholder="Password..."
        {...register("password")}
      />
      <button
        className="bg-stone-500 self-center py-2 px-4 rounded-full shadow-stone-600 shadow-md active:shadow-inner"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
