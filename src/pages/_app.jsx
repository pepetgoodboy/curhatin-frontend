import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="any" />
        <title>Curhatin</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
