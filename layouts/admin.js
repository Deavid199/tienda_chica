import { useEffect } from "react";
// import { useRouter } from "next/router";
import { useRouter } from 'next/navigation';
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import AdminNav from "@/components/adminNav";
import useAuth from "@/hook/useAuth";
import "react-toastify/dist/ReactToastify.css";

export default function Admin({ children, title = "", description = "" }) {
  const { auth, cargando } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!cargando && auth.role_id !== 2 && auth.role_id !== 3) {
      router.push('/');
    }
  }, [auth, cargando, router]);

  if (cargando) return "cargando :D";
  return (
    <>
      <Head>
        <title>{`Administracion - ${title}`}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="bg-gray-100 h-screen w-full flex overflow-hidden">
        <AdminNav />
        <main className="md:flex py-10 mx-auto overflow-y-auto">
          <div className="flex-1">
            {children}
          </div>
        </main>
      </div>
      <ToastContainer />
    </>
  );
}
