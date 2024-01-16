"use client";

import { login, registerUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { name, email, password } = data;
    // Server action
    const response = await registerUser(name, email, password);
    if (!response.ok) {
      setErrorMessage(response.message);
      return;
    }
    const logResponse = await login(email, password);
    if (!logResponse.ok) {
      setErrorMessage("Error al iniciar sesión, intente nuevamente");
      return;
    }
    window.location.replace("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="texto">Nombre completo</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded", {
          "border-red-500": errors.name?.type === "required",
        })}
        type="name"
        autoFocus
        {...register("name", { required: true })}
      />
      <span className="mb-7"></span>

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded", {
          "border-red-500": errors.name?.type === "required",
        })}
        type="email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email?.type === "pattern" ? (
        <span className="text-red-500 text-sm mb-5">
          El correo no es válido
        </span>
      ) : (
        <span className="mb-7"></span>
      )}
      <label htmlFor="password">Contraseña</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded", {
          "border-red-500": errors.name?.type === "required",
        })}
        type="password"
        {...register("password", { required: true, minLength: 6 })}
      />
      {errors.password?.type === "minLength" ? (
        <span className="text-red-500 text-sm mb-5">
          La contraseña debe tener al menos 6 caracteres
        </span>
      ) : (
        <span className="mb-7"></span>
      )}

      {errorMessage ? (
        <span className="text-red-500 text-sm mb-5">{errorMessage}</span>
      ) : (
        <span className="mt-7"></span>
      )}

      <button className="btn-primary">Crear cuenta</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
};
