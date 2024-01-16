import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      emailVerified: Date | null;
      role: "ADMIN" | "USER";
    } & DefaultSession["user"];
  }
}
