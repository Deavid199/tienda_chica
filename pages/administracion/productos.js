import { useState, useEffect } from "react";
import { useAllCategoriasQuery } from "@/features/apis/apiCategorias";
import { useGetByCategoryQuery } from "@/features/apis/apiProductos";
import Image from "next/image";
import Admin from "@/layouts/admin";
import ModalVerProducto from "@/components/modalVerProducto";
import ModalProducto from "@/components/modalProducto";
export const runtime = "edge";
export default function Productos() {

  const [openModal, setOpenModal] = useState(false);
  const [productoModal, setProductoModal] = useState(false);
  const [elId, setElId] = useState(null);
  const [producto, setProducto] = useState({});
  const [inicio, setInicio] = useState(true);

  const { data: categorias = [], isLoading } = useAllCategoriasQuery();
  const { data: productoById = [], isUninitialized } = useGetByCategoryQuery(
    elId,
    { skip: inicio }
  );

  const handleChange = (e) => {
    setInicio(false);
    setElId(e.target.value);
    console.log(e.target)
  };

  const handleVer = (id) => {
    setProductoModal(true);
    const oneProduct = productoById.find((producto) => producto.id === id);
    setProducto(oneProduct);
  };

  return (
    <div className="h-screen flex">
      <Admin title={"Productos"} description={"Se visualiza y carga productos"}>
        <div className="relative w-full h-screen overflow-y-scroll">
          <div className="flex items-center mt-16 px-16">
            <div className="w-full flex flex-col lg:flex-row gap-4 relative">
              <button
                onClick={() => setOpenModal(true)}
                className="w-full lg:w-48 bg-neutral-950 cursor-pointer text-white py-4 rounded-lg"
              >
                Crear Producto
              </button>
              <select
                className="w-full lg:w-96 py-4 rounded-lg bg-violet-300 pl-4 lg:mx-4 text-xl font-semibold capitalize"
                onChange={handleChange}
              >
                <option className="text-xl font-semibold">
                  - Seleccionar Categoria -
                </option>
                {categorias.map((cat) => (
                  <option
                    className="text-xl font-semibold capitalize"
                    key={cat.id}
                    value={cat.id}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 grid-row-col gap-6 px-12 mt-16">
            {productoById.map((product) => (
              <div
                className="relative"
                key={product.id}
                onClick={() => handleVer(product.id)}
              >
                <h2 className="text-xl font-semibold">
                  Categoria: {product.categoria.name}.
                </h2>
                
                <Image
                  className="w-full h-2/4"
                  // src={product.imagen.url}
                  src={product.imagenes[0]?.url}
                  width={150}
                  height={150}
                  alt="productos"
                  priority
                />
                <button
                  className="absolute top-6 right-0 bg-blue-700 px-4 py-3 text-white font-bold rounded-2xl"
                  onClick={() => handleVer(product.id)}
                >
                  Ver
                </button>
                {/* <button
                  className='absolute top-6 right-0 bg-neutral-950 px-5 py-3 text-white font-bold'
                >X</button> */}
                <div className="text-xl font-semibold flex flex-col gap-2">
                  <h3>ID Producto: {product.id}.</h3>
                  <h3>Nombre: {product.nombre}.</h3>
                  <p>Descripcion: {product.descripcion}.</p>
                  <p>
                    Precio: ${" "}
                    {product.precio.toLocaleString("es-AR", {
                      minimumFractionDigits: 0,
                    })}
                  </p>
                  <p>
                    Precio fake: ${" "}
                    {product.fake?.toLocaleString("es-AR", {
                      minimumFractionDigits: 0,
                    })}
                  </p>
                  <p>Stock: {product.stock}</p>
                  {/* Aquí puedes mostrar otros detalles del producto */}
                </div>
              </div>
            ))}
          </div>
        </div>
        <ModalProducto open={openModal} onClose={() => setOpenModal(false)} />
        <ModalVerProducto
          open={productoModal}
          onClose={() => setProductoModal(false)}
          producto={producto}
        />
      </Admin>
    </div>
  );
}
