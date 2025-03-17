import { useState, useEffect } from "react";
import { useAllCategoriasQuery } from "@/features/apis/apiCategorias";
import Link from "next/link";
import Image from "next/image";
import useAuth from "@/hook/useAuth";
import Logo from "@/assets/logo.svg";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const { data: categorias = [] } = useAllCategoriasQuery();
  const { auth, cargando } = useAuth();

  // Plegado automático tras 10 segundos
  useEffect(() => {
    if (openDropdown !== null) {
      const timer = setTimeout(() => setOpenDropdown(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [openDropdown]);

  // Filtrar categorías por categoria_id
  const getSubcategories = (categoria_id) => {
    return categorias.filter((item) => item.categoria_id === categoria_id);
  };

  return (
    <nav className="w-full bg-gray-200 p-4 border-b-grey-400 border">
      <div className="flex justify-between items-center md:px-10">
        {/* <div className="text-white text-2xl font-bold">Mi Tienda</div> */}
        <Link href={"/"} className="flex items-center gap-x-2">
          <Image src={Logo} width={50} alt="Logo" priority />
          <p className="text-xl font-semibold">Vicky XXL</p>
        </Link>

        {/* Botón para móviles */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl block md:hidden"
        >
          ☰
        </button>

        {/* Menú desktop */}
        <div className="hidden md:flex space-x-4 gap-x-10 mr-5">
          {(auth.role_id === 2 || auth.role_id === 3) && (
            <Link href="/administracion/inicio" className="text-xl font-semibold">
              Administración
            </Link>
          )}
          {["Damas", "Caballeros"].map((category, index) => (
            <div key={category} className="relative">
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === category ? null : category)
                }
                className="font-semibold text-xl"
              >
                {category}
              </button>
              {openDropdown === category && (
                <div className="absolute -right-12 bg-gray-200 mt-2 p-2 rounded animate-fadeIn z-50">
                  {getSubcategories(index + 1).map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/catalogo/${sub?.name}`}
                      className="block w-36 text-center px-4 py-2 hover:bg-gray-300"
                    >
                      {sub.name}
                    </Link>
                    // <Link href={`/catalogo/${sub?.name}`} className='cursor-pointer capitalize font-semibold text-xl hover:text-2xl duration-300 hover:text-red-700' key={sub.id}>{sub.name}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden mt-4">
          {(auth.role_id === 2 || auth.role_id === 3) && (
            <Link href="/administracion/inicio" className="font-bold">
              Administración
            </Link>
          )}
          {["Damas", "Caballeros"].map((category, index) => (
            <div key={category} className="my-4">
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === category ? null : category)
                }
                className="font-bold"
              >
                {category}
              </button>
              {openDropdown === category && (
                <div className="ml-4 mt-1 animate-fadeIn">
                  {getSubcategories(index + 1).map((sub) => (
                    <a
                      key={sub.id}
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-300"
                    >
                      {sub.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
