import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Inicio from "@/layouts/inicio";
import Image from "next/image";
import styles from "../../styles/index.module.css";
export const runtime = "edge";
export default function Producto() {
  const router = useRouter();
  const { producto: productoQuery } = router.query;
  const producto = productoQuery ? JSON.parse(productoQuery) : null;
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!producto) {
        setIsRedirecting(true);
        router.push("/");
      }

      if (producto) {
        setSelectedImage(producto.imagenes[0].url);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [producto, router]);

  if (!producto || isRedirecting) {
    return (
      <div className={styles.container}>
        <span className={styles.loader}></span>
      </div>
    );
  }

  return (
    <Inicio title={producto.nombre} description={"Detalles del Producto"}>
      <div className="container pb-20 mt-5 mx-auto">
        <div className="flex flex-col md:flex-row gap-[30px] mb-[30px]">
          <div className="flex-1 md:max-w-[40%] grad rounded-lg flex justify-center items-center relative">
            <div className="flex justify-center items-center flex-col">
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  className="w-auto h-full max-w-[60%]"
                  width={500}
                  height={500}
                  alt={producto.nombre}
                  priority
                />
              ) : (
                <h2 className="text-center text-bold text-xl">
                  Cargando Prenda
                </h2>
              )}
              <div className="mt-4 flex space-x-4">
                {producto.imagenes.map((imagen, index) => (
                  <div
                    key={imagen.id}
                    className={`cursor-pointer border-2 ${
                      selectedImage === imagen.url
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(imagen.url)}
                  >
                    <Image
                      src={imagen.url}
                      width={100}
                      height={100}
                      alt={producto.nombre}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 px-4 lg:p-8 md:p-20 rounded-lg flex flex-col justify-center mx-auto md:mx-0">
            <div className="uppercase text-neutral-950 text-4xl font-semibold mb-2">
              {producto.nombre}.
            </div>
            <p className="mb-6 text-xl font-medium">{producto.descripcion}</p>
            <h2 className="text-xl font-medium mb-4">
              Stock: {producto.stock}
            </h2>
            <div className=" lg:flex lg:items-center gap-x-8">
              {producto.fake > producto.precio ? (
                <div>
                  <div className="text-2xl text-neutral-950 font-semibold pb-4 lg:mb-0 italic line-through">
                    ${" "}
                    {producto.fake?.toLocaleString("es-AR", {
                      minimumFractionDigits: 0,
                    })}
                  </div>
                  <div className="text-3xl text-neutral-950 font-semibold lg:mb-0">
                    ${" "}
                    {producto.precio?.toLocaleString("es-AR", {
                      minimumFractionDigits: 0,
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-3xl text-neutral-950 font-semibold mb-4 lg:mb-0">
                  ${" "}
                  {producto.precio?.toLocaleString("es-AR", {
                    minimumFractionDigits: 0,
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Inicio>
  );
}
