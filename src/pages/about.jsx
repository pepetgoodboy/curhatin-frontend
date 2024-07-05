import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import Cat from "../../public/images/catCute.png";
import Image from "next/image";
import Head from "next/head";

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About - Curhatin</title>
      </Head>
      <div className="pt-8 font-comfortaa">
        <div className="w-80 mx-auto mb-2">
          <Image src={Cat} alt="Cat" priority />
        </div>
        <div className="max-w-max mx-auto text-center font-medium text-lg leading-tight pt-2">
          <p className="text-3xl">Curhatin</p>
          <div className="w-11/12 md:w-4/6 mx-auto mt-5 mb-10">
            <div className="w-full border px-6 py-4 bg-[#FFEAA0] border-black rounded-lgm outline-none placeholder:text-black drop-shadow-br h-full">
              <p className="text-start">
                Curhatin adalah platform berbasis web yang dirancang untuk
                menjadi ruang aman dan nyaman bagi siapa saja yang ingin berbagi
                cerita, pengalaman, atau perasaan mereka. Di tengah kesibukan
                dan tantangan hidup sehari-hari, terkadang kita membutuhkan
                tempat untuk menuangkan isi hati tanpa takut dihakimi😉.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-max mx-auto text-center font-medium text-lg leading-tight pt-2">
          <p className="text-3xl">Apa itu Curhatin?</p>
          <div className="w-11/12 md:w-4/6 mx-auto mt-5 mb-10">
            <div className="w-full border px-6 py-4 bg-[#FFEAA0] border-black rounded-lgm outline-none placeholder:text-black drop-shadow-br h-full flex flex-col gap-3 md:gap-4">
              <p className="text-start">
                - Sebuah komunitas online yang memungkinkan Anda untuk bercerita
                atau "curhat" secara anonim atau dengan identitas Anda.
              </p>
              <p className="text-start">
                - Platform yang menghubungkan orang-orang dengan pengalaman
                serupa, membangun rasa empati dan dukungan.
              </p>
              <p className="text-start">
                - Tempat untuk mendapatkan perspektif baru dan dukungan
                emosional dari pengguna lain.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-max mx-auto text-center font-medium text-lg leading-tight pt-2">
          <p className="text-3xl">Fitur Utama</p>
          <div className="w-11/12 md:w-4/6 mx-auto mt-5 mb-10">
            <div className="w-full border px-6 py-4 bg-[#FFEAA0] border-black rounded-lgm outline-none placeholder:text-black drop-shadow-br h-full flex flex-col gap-3 md:gap-4">
              <p className="text-start">
                - Berbagi Cerita: Tuangkan isi hati Anda dalam bentuk postingan
                singkat atau panjang.
              </p>
              <p className="text-start">
                - Anonimitas Opsional: Pilih untuk berbagi secara anonim atau
                dengan nama Anda.
              </p>
              <p className="text-start">
                - Interaksi Positif: Berikan like dan komentar untuk mendukung
                cerita orang lain.
              </p>
              <p className="text-start">
                - Komunitas Supportif: Temukan orang-orang yang memahami dan
                mendukung Anda.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-max mx-auto text-center font-medium text-lg leading-tight pt-2">
          <p className="text-3xl">Mengapa Curhatin?</p>
          <div className="w-11/12 md:w-4/6 mx-auto mt-5 mb-10">
            <div className="w-full border px-6 py-4 bg-[#FFEAA0] border-black rounded-lgm outline-none placeholder:text-black drop-shadow-br h-full flex flex-col gap-3 md:gap-4">
              <p className="text-start">
                Di Curhatin, kami percaya bahwa setiap orang memiliki cerita
                yang layak didengar. Dengan berbagi, kita tidak hanya
                meringankan beban diri sendiri tetapi juga mungkin membantu
                orang lain yang mengalami hal serupa. Curhatin hadir sebagai
                teman setia Anda, siap mendengarkan kapan pun Anda
                membutuhkannya.
              </p>
              <p className="text-start">
                Bergabunglah dengan Curhatin hari ini dan mulailah perjalanan
                Anda dalam berbagi, mendengarkan, dan tumbuh bersama komunitas
                yang peduli. Karena di sini, setiap cerita berarti, dan setiap
                suara didengar.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}
