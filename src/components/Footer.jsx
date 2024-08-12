import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container font-comfortaa pt-20">
      <div className="w-11/12 md:w-4/6 mx-auto">
        <div className="w-full bg-purple-500 border border-black rounded-lgm drop-shadow-br">
          <div className="absolute left-1 top-2 lg:top-3 px-1 py-1 rounded-full border border-black bg-white"></div>
          <div className="absolute right-1 top-2 lg:top-3 px-1 py-1 rounded-full border border-black bg-white"></div>
          <p className="py-1.5 text-center text-[11px] md:text-sm lg:text-base font-semibold">
            " Terima Kasih telah mengunjungi Curhatin."
          </p>
        </div>
        <div className="w-full mt-16 font-comfortaa text-center font-semibold text-sm">
          <p>
            Made with ❤️ from{" "}
            <Link
              href="https://www.instagram.com/m.iqbalm_/"
              target="_blank"
              className="hover:underline"
            >
              pepetgoodboy
            </Link>
            - <br></br> &copy; Copyright 2024 - All Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
