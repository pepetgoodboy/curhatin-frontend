import Image from "next/image";
import Cat from "../../../public/images/catCute.png";
import Link from "next/link";
import NavbarAdmin from "@/components/NavbarAdmin";
import ValidateAdmin from "@/middleware/ValidateAdmin";
import Footer from "@/components/Footer";

export default function Dashboard() {
  ValidateAdmin();
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gray-100">
        <div className="pt-8 md:pt-14 font-comfortaa">
          <div className="w-80 mx-auto mb-2">
            <Image src={Cat} alt="Cat" priority />
          </div>
          <div className="max-w-max mx-auto text-center font-medium text-lg leading-tight pt-4">
            <p className="text-3xl">Admin Panel Curhatin</p>
            <p className="mt-2">Selamat datang di panel admin</p>
          </div>
          <div className="flex justify-center gap-[14px] mt-14 mb-16">
            <Link
              className="bg-purple-500 py-0.5 px-6 rounded-lgm border border-black drop-shadow-br transition-all duration-300 hover:bg-neutral-100"
              href="/admin/users"
            >
              Users
            </Link>
            <Link
              className="bg-[#87e1a0] py-0.5 px-6 rounded-lgm border border-black drop-shadow-br transition-all duration-300 hover:bg-neutral-100"
              href="/admin/story"
            >
              Story
            </Link>
          </div>
          <div className="flex justify-center text-center">
            <p>
              Made with ❤️ from pepetgoodboy - <br></br> &copy; Copyright 2024 -
              All Reserved.
            </p>
          </div>
          <NavbarAdmin />
        </div>
      </div>
    </div>
  );
}
