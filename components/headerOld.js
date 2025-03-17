import useAuth from "@/hook/useAuth";
import React, { useState } from "react";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { auth, cargando } = useAuth();

  const productos = [
    "Producto 1",
    "Producto 2",
    "Producto 3",
    "Producto 4",
    "Producto 5",
    "Producto 6",
    "Producto 7",
    "Producto 8",
    "Producto 9",
    "Producto 10",
    "Producto 11",
    "Producto 12",
    "Producto 13",
    "Producto 14",
    "Producto 15",
  ];

  const itemsPerColumn = 5;

  // Crear una estructura de columnas dinámicamente
  const columnas = [];
  for (let i = 0; i < productos.length; i += itemsPerColumn) {
    columnas.push(productos.slice(i, i + itemsPerColumn));
  }

  return (
    <div className="container w-full bg-white rounded-lg p-4 grid md:grid-cols-12 gap-4 items-center justify-center mx-auto">
      <h1 className="md:col-span-2 flex justify-center md:justify-start font-bold cursor-pointer text-3xl">
        Brand
      </h1>
      <form className="md:col-span-4 flex items-center justify-center gap-2">
        <input
          type="text"
          className="w-full bg-gray-100 outline-none p-2 rounded-lg"
          placeholder="Buscar"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </form>
      <nav className="md:col-span-6 flex items-center gap-4 justify-end relative z-50">
        {auth?.role == "administrador" ? 
        <button
          className="xl:py-1 xl:px-2 rounded-lg bg-blue-600 text-white hover:bg-blue-400 transition-colors text-xl font-semibold"
        >
          Admin
        </button>
        : ''}
        <button
          className="xl:py-1 xl:px-2 rounded-lg hover:bg-gray-100 transition-colors text-xl font-semibold"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Categorias
        </button>
        <button
          className="xl:py-1 xl:px-2 rounded-lg hover:bg-gray-100 transition-colors text-xl font-semibold"
        >
          Ubicación
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full mt-4 w-full bg-gray-500 border border-gray-200 shadow-lg rounded">
            <div className="grid grid-cols-3 gap-4 py-4">
              {columnas.map((columna, colIndex) => (
                <div key={colIndex}>
                  {columna.map((producto, index) => (
                    <div
                      key={index}
                      className="py-2 hover:bg-gray-400 px-2 text-center w-full cursor-pointer text-white"
                    >
                      {producto}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
