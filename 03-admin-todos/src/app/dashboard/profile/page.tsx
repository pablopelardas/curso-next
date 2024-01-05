"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();
  return (
    <div>
      <h1>Hello Profile</h1>
      <hr />
      <div className="flex flex-col">
        <span>{session?.user?.name}</span>
        <span>{session?.user?.email}</span>
        <span>{session?.user?.image}</span>
        <span>{session?.user?.id}</span>
        <span>{session?.user?.roles?.join(", ")}</span>
        <span>{session?.user?.isActive}</span>
      </div>
    </div>
  );
}
