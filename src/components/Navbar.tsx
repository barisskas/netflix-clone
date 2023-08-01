import NavbarItem from "@/components/NavbarItem";

import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import MobileMenu from "@/components/MobileMenu";
import { useCallback, useState } from "react";
import AccountMenu from "./AccountMenu";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((prev) => !prev);
  }, []);

  return (
    <nav className="w-full fixed z-48">
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
        <div
          className="lg:hidden flex flex-row gap-2 ml-8 items-center cursor-pointer relative"
          onClick={toggleMobileMenu}
        >
          <p className="text-white  text-sm">Browse</p>
          <BsChevronDown className="text-white transition " />
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
            <div className=" w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="profile" />
            </div>
            <BsChevronDown className="text-white transition " />
            <AccountMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
