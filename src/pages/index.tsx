import Image from "next/image";
import { Inter } from "next/font/google";

import { signOut, getSession } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrentUser from "@/hooks/useCurrentUser";
import NavbarItem from "@/components/NavbarItem";

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
    <nav className="w-ful fixed z-48">
      <div className="px-4 md:px-16 py-6 flex flex-row items-center trantsition duration-500 bg-zinc-900 bg-opacity-90">
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex ">
          <NavbarItem label={"Home"} />
          <NavbarItem label={"Series"} />

          <NavbarItem label={"Films"} />

          <NavbarItem label={"New & Popular"} />

          <NavbarItem label={"My List"} />

          <NavbarItem label={"Browse by languages"} />
        </div>
      </div>
    </nav>
  );
}
