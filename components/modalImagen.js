import { useState, useEffect, useRef } from "react";
import styles from "@/styles/modalImagen.module.css";
import Image from "next/image";

export default function ModalImagen({ open, onClose, onImageUpload }) {
  const [cargando, setCargando] = useState(false);
  const [showModal, setShowModal] = useState(open);

  const cloud_name = "dv2wnyckx";
  const preset_name = "checkingupload";

  const formRef = useRef();
  const [files, setFiles] = useState([]);

  const handleInputFiles = async (e) => {
    const files = e.target.files;

    const newFiles = [...files].filter((file) => {
      if (file.size < 1024 * 1024 && file.type.startsWith("image/")) {
        return file;
      }
    });
    setFiles((prev) => [...newFiles, ...prev]);
    formRef.current.reset();
  };

  const handleQuitar = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  useEffect(() => {
    setShowModal(open);
  }, [open]);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!files.length) {
      return alert("No hay imágenes para subir.");
    }
    if (files.length > 3) {
      return alert("Solo se permiten hasta 3 imágenes.");
    }

    try {
      setCargando(true);
      const uploadedImages = [];

      // Subir cada imagen a Cloudinary
      for (const file of files) {
        console.log("Subiendo archivo:", file); // Verifica el archivo antes de enviarlo

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset_name); // Tu preset de Cloudinary
        formData.append("folder", "tienda-ropa"); // Carpeta donde se guardarán las imágenes

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error de respuesta de Cloudinary:", errorData);
          throw new Error(
            `Error al subir la imagen: ${errorData.error.message}`
          );
        }

        const data = await response.json();
        console.log(data)
        uploadedImages.push({
          url: data.secure_url,
          public_id: data.public_id,
        });
      }

      console.log("Imágenes subidas con éxito:", uploadedImages);
      // Aquí podrías manejar la subida, por ahora solo mostramos los datos en consola

      // Enviar URLs y public_ids al backend para almacenar en la base de datos
      const token = localStorage.getItem("token");
      const saveResponse = await fetch(
        `${process.env.API_URL}/api/upload-image`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ images: uploadedImages }),
        }
      );

      if (!saveResponse.ok) {
        throw new Error("Error al guardar las imágenes en la base de datos.");
      }

      console.log("Imágenes guardadas en la base de datos.");

      // Limpia el estado de archivos si la carga es exitosa
      setFiles([]);
      onImageUpload();
    } catch (error) {
      console.error("Error al cargar las imágenes:", error);
    } finally {
      setCargando(false);
      onClose();
    }
  };

  if (!showModal) return null;
  return (
    <div onClick={onClose} className={styles.overlay}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.modalContainer}
      >
        <div className={styles.modalRight}>
          <p className={styles.closeBtn} onClick={onClose}>
            X
          </p>
          <div className={styles.content}>
            <form onSubmit={handleUpload} ref={formRef}>
              {cargando ? (
                <h2 className="text-2xl font-bold mb-4">
                  Cargando Imagenes, no Cerrar
                </h2>
              ) : (
                ""
              )}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleInputFiles}
                />
                <h5 className="text-red-700">
                  (*) solo se aceptan imagenes livianas, max 3
                </h5>
                <div className="flex gap-4 overflow-x-auto py-12">
                  {files.map((file, index) => (
                    <div key={index}>
                      <div className="w-48 h-48">
                        <Image
                          className="w-full h-full border-2 border-blue-800 rounded-lg"
                          src={URL.createObjectURL(file)}
                          width={90}
                          height={90}
                          alt="asd"
                          priority
                        />
                      </div>
                      <button
                        className="bg-blue-800 text-white text-xl mt-2 w-full rounded py-2"
                        type="button"
                        onClick={() => handleQuitar(index)}
                      >
                        Quitar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="bg-red-700 text-white text-2xl w-4/6 py-3 rounded"
                type="submit"
              >
                Subir Imagenes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
