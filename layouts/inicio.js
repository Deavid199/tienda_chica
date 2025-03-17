import { ToastContainer } from "react-toastify"
import Head from "next/head"
import Header from "../components/header"
import Footer from "../components/footer"

import 'react-toastify/dist/ReactToastify.css';
// import Wsp from "@/components/wsp";

export default function Inicio({ children, title = '', description = '' }) {
  return (
    <>
      <Head>
        <title>{`Vicky XL - ${title}`}</title>
        <meta name="description" content={description} />
      </Head>

      <Header />
      {children}
      {/* <Wsp /> */}
      {/* <Footer /> */}
      <ToastContainer />
    </>
  )
}
