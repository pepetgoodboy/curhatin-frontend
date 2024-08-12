import { useState } from "react";
import { useRouter } from "next/router";
import { loginAdmin } from "../../utils/api";
import Cat from "../../../public/images/catCute.png";
import Image from "next/image";
import Swal from "sweetalert2";
import NavbarAdmin from "@/components/NavbarAdmin";
import Head from "next/head";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAdmin(email, password);
      if (!response.data.token) {
        Swal.fire({
          icon: "error",
          title: "Internal server error. Coba lagi nanti. Thank you!",
          confirmButtonColor: "#87e1a0",
          focusConfirm: true,
          isConfirm: true,
        });
      }
      localStorage.setItem("tokenAdmin", response.data.token);
      const result = await Swal.fire({
        title: "Login Berhasil!",
        icon: "success",
        confirmButtonColor: "#87e1a0",
        confirmButtonText: "Oke",
        allowOutsideClick: false,
      });

      if (result.isConfirmed) {
        router.push("/admin/dashboard");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title:
          error.response.data.message || "Oopss! username atau password salah!",
        confirmButtonColor: "#87e1a0",
        focusConfirm: true,
        isConfirm: true,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Admin - Curhatin</title>
      </Head>
      <div>
        <div className="flex flex-col justify-center items-center min-h-screen font-comfortaa bg-gray-100">
          <section className="container">
            <div className="w-[340px] mx-auto">
              <Image src={Cat} alt="Cute Cat" priority />
            </div>
            <div className="mx-auto max-w-max text-center text-lg font-medium">
              <p>Admin Curhatin</p>
            </div>
          </section>
          <section className="container">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-5">
              <div className="w-11/12 md:w-96 flex flex-col gap-6 mx-auto">
                <div className="relative shadow-lg drop-shadow-2xl">
                  <input
                    type="email"
                    id="email"
                    placeholder="Isi emailmu"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer relative w-full bg-neutral-100 border px-6 py-[10px] border-black rounded-lgm outline-none placeholder:text-center placeholder:text-sm placeholder:text-black drop-shadow-br"
                  />
                </div>
                <div className="relative shadow-lg drop-shadow-2xl">
                  <input
                    type="password"
                    id="password"
                    placeholder="Isi passwordmu"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-neutral-100 border px-6 py-[10px] border-black rounded-lgm outline-none placeholder:text-center placeholder:text-sm placeholder:text-black drop-shadow-br"
                  />
                </div>
                <div className="relative">
                  <button
                    type="submit"
                    className="relative w-full border px-6 py-[10px] bg-[#87e1a0] font-semibold border-black rounded-lgm drop-shadow-br hover:bg-neutral-100 transition-all duration-300 ease-in-out"
                  >
                    login!
                  </button>
                </div>
              </div>
            </form>
          </section>
          <section>
            <NavbarAdmin />
          </section>
        </div>
      </div>
    </>
  );
}
