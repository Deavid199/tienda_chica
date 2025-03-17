import { useState, useEffect } from "react";
import { useUploadProductoMutation } from "@/features/apis/apiProductos";
import { useAllCategoriasQuery } from "@/features/apis/apiCategorias";
import { useImgVaciasQuery } from "@/features/apis/apiImagenes";
import styles from "../styles/modalProducto.module.css";
import Select from "react-select";
import Image from "next/image";

const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "white",
    padding: "8px 0",
    border: state.isFocused ? "1px solid blue" : "1px solid gray",
    borderRadius: "4px",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(0, 0, 255, 0.3)" : "none",
    "&:hover": {
      border: "1px solid blue",
    },
  }),
};

export default function ModalProducto({ open, onClose }) {
  const [showModal, setShowModal] = useState(open);
  const [selectedImages, setSelectedImages] = useState([]);
  const [category_id, setCategory_id] = useState("");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [fake, setFake] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState(1);

  const { data: categorias = [], isLoading: isLoadingCategorias } = useAllCategoriasQuery();
  const { data: imagenes = [] } = useImgVaciasQuery();
  const [uploadProducto] = useUploadProductoMutation();

  useEffect(() => {
    setShowModal(open);
  }, [open]);
  
  const options = imagenes.map((imagen) => ({
    value: imagen.id,
    label: imagen.nombre,
    imageSrc: imagen.url,
  }));

  const customOptionRenderer = ({ data, innerRef, innerProps }) => (
    <div ref={innerRef} {...innerProps} className="flex items-center gap-3 p-2">
      <img src={data.imageSrc} alt={data.label} width={50} height={50} />
      <span>{data.label}</span>
    </div>
  );

  const handleSelectChange = (selectedOptions) => {
    setSelectedImages(selectedOptions || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      category_id,
      imagen_ids: selectedImages.map((img) => img.value),
      nombre,
      precio,
      fake,
      descripcion,
      stock,
    };

    try {
      await uploadProducto(formData).unwrap();
      alert("Producto creado con éxito");
      onClose();
    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert("Hubo un error al crear el producto.");
    }
  };

  if (!showModal) return null;

  return (
    <div onClick={onClose} className={styles.overlay}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.modalContainer}
      >
        <div className={styles.modalRight}>
          <p className={styles.closeBtn} onClick={onClose}>
            X
          </p>
          <div className={styles.content}>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <label className="text-xl font-bold">Categoría</label>
                <select
                  value={category_id}
                  onChange={(e) => setCategory_id(e.target.value)}
                  required
                  className="px-4 py-2 border rounded"
                >
                  <option value="" disabled>
                    - Seleccionar Categoría -
                  </option>
                  {categorias.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <label className="text-xl font-bold">Imágenes del Producto</label>
                <Select
                  isMulti
                  styles={selectStyles}
                  options={options}
                  value={selectedImages}
                  onChange={handleSelectChange}
                  components={{ Option: customOptionRenderer }}
                  placeholder="Selecciona imágenes"
                  required
                />

                <label className="text-xl font-bold">Nombre</label>
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre del producto"
                  required
                  className="px-4 py-2 border rounded"
                />

                <label className="text-xl font-bold">Precio</label>
                <input
                  type="number"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  placeholder="Precio del producto"
                  required
                  className="px-4 py-2 border rounded"
                />

                <label className="text-xl font-bold">Precio Fake</label>
                <input
                  type="number"
                  value={fake}
                  onChange={(e) => setFake(e.target.value)}
                  placeholder="Precio fake"
                  required
                  className="px-4 py-2 border rounded"
                />

                <label className="text-xl font-bold">Descripción</label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Descripción del producto"
                  required
                  className="px-4 py-2 border rounded"
                />

                <label className="text-xl font-bold">Stock</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Cantidad en stock"
                  required
                  className="px-4 py-2 border rounded"
                />
              </div>

              {/* Mostrar imágenes seleccionadas */}
              {selectedImages.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-xl font-bold">Imágenes Seleccionadas:</h4>
                  <div className="flex gap-4 mt-2">
                    {selectedImages.map((img, index) => (
                      <Image
                        key={index}
                        src={img.imageSrc}
                        alt={img.label}
                        width={100}
                        height={100}
                        priority
                        className="border rounded"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={onClose}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cerrar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Crear Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
