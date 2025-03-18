import { useState } from "react";
import {
  useAllImgQuery,
  useBorrarImgMutation,
} from "@/features/apis/apiImagenes";
import Image from "next/image";
import Admin from "@/layouts/admin";
import ModalImagen from "@/components/modalImagen";

export default function Imagenes() {
  const [cargando, setCargando] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data: imagenes = [], refetch: refetchAllImages } = useAllImgQuery();
  const [borrarImg] = useBorrarImgMutation();

  const handleDeleteImagen = (id) => {
    const confirmDelete = window.confirm(
      "¿Está seguro que desea eliminar esta imagen?"
    );

    if (confirmDelete) {
      borrarImg(id);
    }
  };

  return (
    <div className="h-screen w-full flex">
      <Admin title={"Imagenes"} description={"Se cargan las imagenes"}>
        <div className="relative w-full h-full overflow-y-auto pb-12">
          <div className="flex justify-center items-center mt-16">
            <button
              onClick={() => setOpenModal(true)}
              className="mx-auto bg-neutral-950 cursor-pointer text-white px-10 py-4"
            >
              Subir Imagenes
            </button>
          </div>
          {cargando ? (
            <h2 className="text-center mt-5 bg-red-700 w-2/3 mx-auto text-white text-2xl">
              ELIMINANDO IMAGEN
            </h2>
          ) : (
            ""
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 grid-row-col gap-6 px-12 mt-12">
            {imagenes.map((img, index) => (
              <div className="relative" key={img.id || index}>
                <Image
                  className="w-full h-full"
                  src={img.url}
                  width={200}
                  height={200}
                  alt="productos"
                  priority
                />
                <button
                  onClick={() => handleDeleteImagen(img.id)}
                  className="absolute top-0 right-0 bg-neutral-950 px-5 py-3 text-white font-bold"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <ModalImagen
          open={openModal}
          onClose={() => setOpenModal(false)}
          onImageUpload={refetchAllImages}
        />
      </Admin>
    </div>
  );
}
