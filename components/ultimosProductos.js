import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useLastProductosQuery } from "@/features/apis/apiProductos";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function UltimosProductos() {
  const { data: last10Productos = [], isLoading } = useLastProductosQuery();

  return (
    <div className="my-16">
      <div className="container mx-auto flex items-center gap-4 mb-8">
        <h2 className="font-semibold mx-auto text-2xl md:text-4xl mb-1">
          Ultimos Productos Añadidos
        </h2>
      </div>
      <Swiper
        modules={[Autoplay, Navigation]}
        loop={false}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          1440: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        pagination={{
          clickable: true,
        }}
        className="productSlider mx-auto w-11/12"
      >
        <>
          {last10Productos?.map((producto) => {
            return (
              <SwiperSlide key={producto.id}>
                <Link 
                  href={{
                    pathname: `/producto/${producto.id}`,
                    query: { producto: JSON.stringify(producto) }, // Serializar producto
                  }}
                >
                  <div className="grad w-full h-[362px] bg-purple-200 rounded-[8px] overflow-hidden relative group">
                    <div className="absolute bg-red-700 text-neutral-50 text-[12px] font-bold uppercase top-4 right-4 px-2 rounded-full z-10">
                      nuevo
                    </div>
                    <div className="w-full h-[200px] flex items-center justify-center relative">
                      <Image
                        className="w-[160px] lg:w-auto h-full group-hover:scale-125 transition-all"
                        width={100}
                        height={100}
                        src={producto.imagenes[0]?.url}
                        alt="ultimo producto añadido"
                        priority
                      />
                    </div>
                    <div className="px-6 pb-8 flex flex-col">
                      <div className="text-md font-semibold text-neutral-800 capitalize mb-2">
                        {producto.nombre}
                      </div>
                      <div className="text-lg font-semibold mb-4 lg:mb-9">
                        {producto.descripcion.substring(0, 15)}...
                      </div>
                      {producto.fake > producto.precio ? (
                        <div className="flex gap-5">
                          <div className="text-lg font-semibold text-neutral-800 italic line-through">
                            ${" "}
                            {producto.fake.toLocaleString("es-AR", {
                              minimumFractionDigits: 0,
                            })}
                          </div>
                          <div className="text-lg font-semibold text-neutral-800">
                            ${" "}
                            {producto.precio.toLocaleString("es-AR", {
                              minimumFractionDigits: 0,
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="text-lg font-semibold text-neutral-800">
                          ${" "}
                          {producto.precio.toLocaleString("es-AR", {
                            minimumFractionDigits: 0,
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </>
      </Swiper>
    </div>
  );
}
