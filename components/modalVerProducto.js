import { useState, useEffect } from "react";
import { useAllCategoriasQuery } from "@/features/apis/apiCategorias";
import {
  useDeleteProductoMutation,
  useUpdateProductoMutation,
} from "@/features/apis/apiProductos";
import styles from "@/styles/modalVerProducto.module.css";
import Image from "next/image";

export default function ModalVerProducto({ open, onClose, producto }) {

  const [showProductoModal, setShowProductoModal] = useState(open);

  const { data: categorias = [], isLoading } = useAllCategoriasQuery();
  const [deleteProducto] = useDeleteProductoMutation();
  const [putProducto] = useUpdateProductoMutation();

  const [id, setId] = useState(null);
  const [img, setImg] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [disponible, setDisponible] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [precio, setPrecio] = useState(null);
  const [fake, setFake] = useState(null);
  const [descripcion, setDescripcion] = useState(null);
  const [stock, setStock] = useState(null);

  useEffect(() => {
    if (producto) {
      setId(producto.id);
      setImg(producto.imagen?.url);
      setCategoria(producto.categoria);
      setDisponible(producto.disponible);
      setNombre(producto.nombre);
      setPrecio(producto.precio);
      setFake(producto.fake);
      setDescripcion(producto.descripcion);
      setStock(producto.stock);
    }
  }, [producto]);

  useEffect(() => {
    setShowProductoModal(open);
  }, [open]);

  const handleClose = () => {
    setShowProductoModal(false);
    onClose();
  };

  const handleDelete = (id, e) => {
    e.preventDefault();
    console.log(id);
    const confirmDelete = window.confirm(
      "¿Está seguro que desea eliminar esta Producto?"
    );
    if (confirmDelete) {
      deleteProducto(id);
      handleClose();
    }
  };

  const handlePut = async (e) => {
    e.preventDefault();
    const response = await putProducto({
      id: id,
      disponible: disponible,
      nombre: nombre,
      precio: precio,
      fake: fake,
      stock: stock,
      descripcion: descripcion,
    });
    console.log(response);
  };

  if (!showProductoModal) return null;

  if (!producto) return <h2>cargando</h2>;
  return (
    <div onClick={handleClose} className={styles.overlay}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.modalContainer}
      >
        <div className={styles.modalRight}>
          <div className={styles.content}>
            <form className="h-full flex flex-col md:justify-between gap-8">
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-800 text-neutral-50 py-3 px-5 rounded-lg"
                  onClick={(e) => handleDelete(producto.id, e)}
                >
                  Eliminar Producto
                </button>
                <button
                  type="submit"
                  className="bg-blue-800 text-neutral-50 py-3 px-5 rounded-lg"
                  onClick={handlePut}
                >
                  Actualizar Producto
                </button>
                <button
                  onClick={handleClose}
                  className="bg-red-800 text-neutral-50 py-3 px-12 rounded-lg"
                >
                  Cerrar
                </button>
              </div>
              <div className="flex gap-6 mb-6">
                <div className="flex flex-col w-2/4">
                  <div className="text-xl font-bold">
                    <label htmlFor="prenda" className="text-xl font-bold">
                      Imagen del Producto
                    </label>
                    {producto.imagenes && producto.imagenes.length > 0 ? (
                      producto.imagenes.map((imagen) => (
                        <Image
                          key={imagen.id}
                          src={imagen.url}
                          width={300}
                          height={350}
                          alt={producto.nombre}
                          priority
                        />
                      ))
                    ) : (
                      <p>No hay imágenes disponibles</p>
                    )}
                  </div>
                </div>
                <div className="w-full relative h-0 flex flex-col">
                  <label htmlFor="category" className="text-xl font-bold">
                    Categoria
                  </label>
                  <select
                    className="w-full px-5 py-3 text-2xl"
                    value={categoria?.id}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                  >
                    <option className="w-full" value={categoria?.id}>
                      {categoria?.name}
                    </option>
                    {/* {categorias?.map(
                      (category) =>
                        category.id !== categoria?.id && (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        )
                    )} */}
                  </select>
                  <div className="flex flex-col">
                    <label htmlFor="dispone" className="text-xl font-bold">
                      Disponible
                    </label>
                    <input
                      id="dispone"
                      className="px-5 py-3 text-2xl placeholder:text-black"
                      placeholder="no disponible: 0, disponible: 1"
                      value={disponible}
                      onChange={(e) => setDisponible(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="nombre" className="text-xl font-bold">
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      className="px-5 py-3 text-2xl placeholder:text-black"
                      placeholder="nombre aqui"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="precio" className="text-xl font-bold">
                      Precio
                    </label>
                    <input
                      id="precio"
                      type="number"
                      placeholder="precio aqui"
                      className="px-5 py-3 text-2xl placeholder:text-black"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="precio" className="text-xl font-bold">
                      Precio fake
                    </label>
                    <input
                      id="precio"
                      type="number"
                      placeholder="precio aqui"
                      className="px-5 py-3 text-2xl placeholder:text-black"
                      value={fake}
                      onChange={(e) => setFake(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="descripcion" className="text-xl font-bold">
                      Descripcion
                    </label>
                    <textarea
                      id="descripcion"
                      className="px-5 py-3 text-2xl placeholder:text-black"
                      placeholder="descripcion aqui"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="stock" className="text-xl font-bold">
                      Stock
                    </label>
                    <input
                      id="stock"
                      type="number"
                      placeholder="stock aqui"
                      className="px-5 py-3 text-2xl placeholder:text-black"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
