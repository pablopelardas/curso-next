"use server";

import { signIn } from "@/auth.config";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export async function authenticate(_: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return "Authenticated";
  } catch (error) {
    if ((error as any).type === "CredentialsSignin") return "CredentialsSignin";

    return "UnknownError";
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password, redirect: false });
    return {
      ok: true,
      message: "Usuario logueado correctamente",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al iniciar sesión",
    };
  }
};
