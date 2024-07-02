import React from "react";
import { useSession, signOut } from "next-auth/react";

export default function Logout() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-150 ease-in-out"
          onClick={() => signOut()}
        >
          ログアウト
        </button>
      </div>
    );
  }
  return null;
}
