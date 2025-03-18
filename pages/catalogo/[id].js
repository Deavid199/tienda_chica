import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAllCategoriasQuery } from "@/features/apis/apiCategorias";
import { usePorSlugQuery } from "@/features/apis/apiProductos";
import Link from "next/link";
import Image from "next/image";
import Inicio from "@/layouts/inicio";

export default function Catalogo() {
  const router = useRouter();
  const { id } = router.query;

  const [categoriaThis, SetCategoriaThis] = useState("");
  const [productoById, setProductoById] = useState(null);

  const { data: categorias = [], isLoading } = useAllCategoriasQuery();
  const { data: productos = [] } = usePorSlugQuery(productoById);

  useEffect(() => {
    if (id) {
      const categoria = categorias.find((categoria) => categoria.name === id);
      if (categoria) {
        SetCategoriaThis(categoria.name);
        setProductoById(categoria.id);
      }
    }
  }, [id, categorias]);

  return (
    <Inicio title={"Catalogo"} description={"Productos"}>
      <div className="mb-16 lg:pt-0">
        <div className="w-full mx-auto px-2">

            <div className="container lg:flex lg:w-full">
            </div>
            <div className="bg-white">
              <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mb-8 mt-4 text-2xl uppercase italic font-semibold">
                  <h2 className="text-center">{categoriaThis}</h2>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 xl:gap-x-8">
                  {productos?.map((producto) => (  
                    <Link
                      key={producto.id}
                      href={{
                        pathname: `/producto/${producto.id}`,
                        query: { producto: JSON.stringify(producto) }, // Serializar producto
                      }}
                      className="group relative border border-grey-600 rounded"
                    >
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <Image
                          src={producto.imagenes[0]?.url}
                          className="h-full w-full object-cover object-center"
                          width={100}
                          height={100}
                          alt={producto.nombre}
                          sizes="(min-width: 60em) 24vw,
                                  (min-width: 28em) 45vw,
                                  100vw"
                          priority
                        />
                      </div>
                      <div className="h-auto px-6 py-8 grid grid-cols-1 place-content-between">
                          {producto.stock >= 1 ?
                          <h2 className="text-lg text-950 capitalize mb-2 font-bold">{producto.nombre.substring(0, 40)}...</h2>
                          :<h2 className="text-lg text-950 capitalize mb-2 font-bold">Vendido</h2>
                          }
                        <div className="text-[15px] mb-4 lg:mb-9">
                          {producto.descripcion.substring(0, 100)}...
                        </div>
                        {producto.fake > producto.precio ? (
                          <div className="flex gap-5 text-lg text-950 font-semibold">
                            <div className="italic line-through">
                              ${" "}
                              {producto.fake.toLocaleString("es-AR", {
                                minimumFractionDigits: 0,
                              })}
                            </div>
                            <div>
                              ${" "}
                              {producto.precio.toLocaleString("es-AR", {
                                minimumFractionDigits: 0,
                              })}
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-5 text-lg text-950 font-semibold">
                            <div>
                              ${" "}
                              {producto.precio.toLocaleString("es-AR", {
                                minimumFractionDigits: 0,
                              })}
                            </div>
                          </div>
                        )}
                        <h2 className="text-md text-950 capitalize mt-2 font-bold text-red-800">
                          Envio Gratis
                        </h2>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
        </div>
      </div>
    </Inicio>
  );
}
