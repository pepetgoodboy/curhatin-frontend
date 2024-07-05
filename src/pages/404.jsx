import Navbar from "@/components/Navbar";
import Image from "next/image";
import Cat from "../../public/images/petCute.png";

export default function Custom404() {
  return (
    <div>
      <div className="flex flex-col gap-12 justify-center items-center min-h-screen font-comfortaa -mt-14">
        <Image src={Cat} alt="Cute Cat" className="w-[300px]" />
        <h1 className="text-lg md:text-xl font-bold px-4">
          Oopps... Halaman tidak ditemukan
        </h1>
      </div>
      <Navbar />
    </div>
  );
}
