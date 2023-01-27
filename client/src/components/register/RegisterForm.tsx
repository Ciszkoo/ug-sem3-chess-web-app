import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RegisterSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
  const { register, handleSubmit, reset } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", data);
      console.log("Registered!");
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
      <p className="font-bold self-center">Rejestracja</p>
      <input
        className="bg-stone-500 p-2 rounded-md active:outline-none focus:outline-none"
        type="text"
        placeholder="Username..."
        {...register("username")}
      />
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
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
