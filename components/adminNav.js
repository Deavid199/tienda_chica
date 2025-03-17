import { useState } from "react";
import Image from "next/image";
import Logo from "../assets/logo.png";
import Control from "../assets/control.png";
import Link from "next/link";

export default function AdminNav() {
  const [open, setOpen] = useState(false);

  const cerrarSesion = () => {
    setUser("");
    // setBtnaction(false);
  };

  return (
    <div className="h-full flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } duration-500 h-full p-5 pt-8 bg-blue-950 relative`}
      >
        <Image
          src={Control}
          className={`absolute cursor-pointer -right-3 top-9 w-70 z-20 md:w-9 border-blue-700
           border-2 rounded-full ${!open && "rotate-180"}`}
          alt="control"
          priority
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <Image
            src={Logo}
            width={100}
            height={100}
            alt="logo"
            priority
            className={`object-scale-down h-12 w-12 cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            Administración
          </h1>
        </div>
        <ul className="pt-6">
          <Link
            href="/"
            className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-4"
          >
            <span className={`${!open && "hidden"} text-xl font-semibold origin-left duration-500`}>
              Inicio
            </span>
          </Link>
          <Link
            href="/administracion/productos"
            className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-6"
          >
            <span className={`${!open && "hidden"} text-xl font-semibold origin-left duration-500`}>
              Productos
            </span>
          </Link>
          <Link
            href="/administracion/categorias"
            className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-3"
          >
            <span className={`${!open && "hidden"} text-xl font-semibold origin-left duration-500`}>
              Categorias
            </span>
          </Link>
          <Link
            href="/administracion/imagenes"
            className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-3"
          >
            <span className={`${!open && "hidden"} text-xl font-semibold origin-left duration-500`}>
              Imagenes
            </span>
          </Link>
        </ul>
        <button 
          className={`${!open && "hidden"} absolute bottom-5 text-white text-xl font-semibold origin-left duration-500`}
          onClick={cerrarSesion}
        >Cerrar Sessión</button>
      </div>
    </div>
  );
}
