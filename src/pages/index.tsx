import Image from "next/image";
import { Inter } from "next/font/google";

import { signOut, getSession } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrentUser from "@/hooks/useCurrentUser";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Home() {
  const { data: user } = useCurrentUser();
  console.log(user);
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Hello World</h1>
      <p className="text-2xl font-bold text-center text-white">{user?.email}</p>
      <button className="h-full w-full bg-white" onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
}
