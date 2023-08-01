import Image from "next/image";
import { Inter } from "next/font/google";

import { signOut, getSession } from "next-auth/react";
import { NextPageContext } from "next";
import useCurrentUser from "@/hooks/useCurrentUser";
import NavbarItem from "@/components/NavbarItem";

import { BsChevronDown } from "react-icons/bs";
import MobileMenu from "@/components/MobileMenu";
import Navbar from "@/components/Navbar";

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
    <>
      <Navbar />
    </>
  );
}
