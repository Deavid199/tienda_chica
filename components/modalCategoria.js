import { useState, useEffect } from "react";
import {
  useCreateCategoriaMutation,
  usePutCategoriaMutation,
} from "@/features/apis/apiCategorias";
import styles from "../styles/modalCategoria.module.css";

export default function ModalCategoria({
  open,
  onClose,
}) {
  const [createCat] = useCreateCategoriaMutation();
  const [updateCat] = usePutCategoriaMutation();

  const [nombreCategoria, setNombreCategoria] = useState("");
  const [subcategoria, setSubcategoria] = useState('');
  const [showModal, setShowModal] = useState(open);

  useEffect(() => {
    setShowModal(open);
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
      createCat({
        nombre: nombreCategoria,
        categoria_id: subcategoria
      });
      setNombreCategoria("");
      setSubcategoria("");
    onClose();
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
            <h2 className="text-2xl font-bold mb-4">
            Crear Categoría
            </h2>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <label htmlFor="nombre" className="text-xl font-bold">
                Nombre
              </label>
              <input
                id="nombre"
                className="px-5 py-3 text-2xl"
                value={nombreCategoria}
                onChange={(e) => setNombreCategoria(e.target.value)}
                placeholder="Escribe tu Categoria Aquì"
              />
              <label htmlFor="category" className="text-xl font-bold">
                Categoria Principal
              </label>
              <select
                id="category"
                className="px-5 py-3 text-2xl mb-16"
                value={subcategoria}
                onChange={(e) => setSubcategoria(e.target.value)}
                required
              >
                <option className="text-xl font-semibold" value="" selected disabled>
                  - Seleccionar Categoria -
                </option>
                <option
                  className="capitalize text-lg md:text-xl font-semibold"
                  value="1"
                >
                  Damas
                </option>
                <option
                  className="capitalize text-lg md:text-xl font-semibold"
                  value="2"
                >
                  Caballeros
                </option>
              </select>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-800 text-neutral-50 py-3 w-full rounded-lg"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
