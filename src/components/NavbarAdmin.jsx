import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { IoIosMenu } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { RxExit } from "react-icons/rx";

export default function NavbarAdmin() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleNavbar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("tokenAdmin"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tokenAdmin");
    setIsLoggedIn(false);
    router.push("/admin");
  };

  return (
    <nav>
      <div className="fixed bottom-8 right-4 sm:right-12 z-50">
        <div className="relative">
          <button
            type="button"
            onClick={toggleNavbar}
            className="text-3xl sm:text-4xl bg-purple-500 py-1.5 sm:py-2 px-2.5 rounded-lgm border border-black drop-shadow-br hover:-translate-y-1 transition-all duration-300 ease-in-out"
          >
            <IoIosMenu
              className={`transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <IoClose
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>
        </div>
        <div
          className={`transition-all duration-300 ease-in-out ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <button
            className={`absolute text-3xl sm:text-4xl bg-purple-500 py-1.5 sm:py-2 px-2.5 rounded-lgm border border-black drop-shadow-br bottom-0 right-16 sm:right-[70px] hover:-translate-y-1 transition-all duration-300 ease-in-out ${
              open ? "translate-y-0" : "translate-y-full"
            }`}
            onClick={handleLogout}
          >
            <RxExit />
          </button>
          <Link href="/admin/dashboard">
            <button
              className={`absolute text-3xl sm:text-4xl bg-purple-500 py-1.5 sm:py-2 px-2.5 rounded-lgm border border-black drop-shadow-br bottom-0 right-32 sm:right-[140px] hover:-translate-y-1 transition-all duration-300 ease-in-out ${
                open ? "translate-y-0" : "translate-y-full"
              }`}
              onClick={toggleNavbar}
            >
              <MdHome />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
