import NavbarItem from "@/components/NavbarItem";

import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import MobileMenu from "@/components/MobileMenu";
import { useCallback, useEffect, useState } from "react";
import AccountMenu from "./AccountMenu";

const TOP_SCROLL_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      setShowBackground(top > TOP_SCROLL_OFFSET);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showBackground]);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((prev) => !prev);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((prev) => !prev);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center trantsition duration-500 ${
          showBackground ? "bg-zinc-900 opacity-90" : ""
        }`}
      >
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex ">
          <NavbarItem label={"Home"} />
          <NavbarItem label={"Series"} />

          <NavbarItem label={"Films"} />

          <NavbarItem label={"New & Popular"} />

          <NavbarItem label={"My List"} />

          <NavbarItem label={"Browse by languages"} />
        </div>
        <div
          className="lg:hidden flex flex-row gap-2 ml-8 items-center cursor-pointer relative"
          onClick={toggleMobileMenu}
        >
          <p className="text-white  text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition  ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch className="w-6" />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell className="w-6" />
          </div>
          <div className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div
              className=" w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden"
              onClick={toggleAccountMenu}
            >
              <img src="/images/default-blue.png" alt="profile" />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }  `}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
