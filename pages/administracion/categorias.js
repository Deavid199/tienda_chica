import { useState, useEffect } from "react";
import {
  useAllCategoriasQuery,
  useDeleteCatMutation,
  usePutCategoriaMutation,
} from "@/features/apis/apiCategorias";
import MaterialTable from "@material-table/core";
import Admin from "@/layouts/admin";
import ModalCategoria from "@/components/modalCategoria";

const columns = [
  { title: "Id", field: "id", defaultSort: "desc", editable: false },
  { title: "Categoria", field: "name", align: "center" },
  {
    title: "Principal",
    field: "categoria_id",
    align: "center",
    lookup: { 1: "Damas", 2: "Caballeros" },
  },
];

export default function Categorias() {
  const [openModal, setOpenModal] = useState(false);

  const { data: categorias = [], isLoading } = useAllCategoriasQuery();
  const [deleteCat] = useDeleteCatMutation();
  const [putCategoria] = usePutCategoriaMutation();

  const handleEditCategoria = async (categoria) => {
    try {
      const response = await putCategoria({
        id: categoria.id,
        nombre: categoria.name,
        categoria_id: categoria.categoria_id,
      }).unwrap();

      console.log("Actualización exitosa:", response);
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
    }
  };

  const handleDeleteCategoria = async (id) => {
    // const confirmDelete = window.confirm(
    //   "¿Está seguro que desea eliminar esta categoría?"
    // );
    // if (confirmDelete) {
      try {
        await deleteCat(id).unwrap(); // Esperar el resultado de la mutación
        console.log("Categoría eliminada con éxito");
      } catch (error) {
        console.error("Error al eliminar la categoría:", error);
      }
    // }
  };

  return (
    // <div className="h-screen flex">
    <Admin title={"Categorias"} description={"Categorias y subcategorias"}>
      <div className="relative w-full h-full pt-10">
        <div className="flex justify-center items-center">
          <button
            onClick={() => setOpenModal(true)}
            className="mx-auto bg-neutral-950 cursor-pointer text-white px-10 py-4 rounded-lg"
          >
            Crear Categorias
          </button>
        </div>
        <div className="flex justify-between w-full mt-8 overflow-y-scroll">
          <MaterialTable
            columns={columns}
            data={categorias}
            localization={{
              body: {
                emptyDataSourceMessage: "Elija un Inicio",
                addTooltip: "Añadir",
                deleteTooltip: "Eliminar",
                editTooltip: "Editar",
                filterRow: {
                  filterTooltip: "Filtrar",
                },
                editRow: {
                  deleteText: "¿Segura(o) que quiere eliminar?",
                  cancelTooltip: "Cancelar",
                  saveTooltip: "Guardar",
                },
              },
              grouping: {
                placeholder: "Arrastre un encabezado aquí para agrupar",
                groupedBy: "Agrupado por",
              },
              header: {
                actions: "Acciones",
              },
              pagination: {
                firstAriaLabel: "Primera página",
                firstTooltip: "Primera página",
                labelDisplayedRows: "{from}-{to} de {count}",
                labelRowsPerPage: "Filas por página:",
                labelRowsSelect: "filas",
                lastAriaLabel: "Ultima página",
                lastTooltip: "Ultima página",
                nextAriaLabel: "Pagina siguiente",
                nextTooltip: "Pagina siguiente",
                previousAriaLabel: "Pagina anterior",
                previousTooltip: "Pagina anterior",
              },
              toolbar: {
                addRemoveColumns: "Agregar o eliminar columnas",
                exportAriaLabel: "Exportar",
                exportName: "Exportar a CSV",
                exportTitle: "Exportar",
                nRowsSelected: "{0} filas seleccionadas",
                searchPlaceholder: "Buscar",
                searchTooltip: "Buscar",
                showColumnsAriaLabel: "Mostrar columnas",
                showColumnsTitle: "Mostrar columnas",
              },
            }}
            editable={{
              onRowUpdate: (newData) =>
                new Promise((resolve, reject) => {
                  handleEditCategoria(newData)
                    .then(resolve) // Resuelve si todo sale bien
                    .catch(reject); // Rechaza si ocurre un error
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  handleDeleteCategoria(oldData.id)
                    .then(resolve) // Resuelve si la eliminación es exitosa
                    .catch(reject); // Rechaza si ocurre un error
                }),
            }}
            options={{
              sorting: false,
              search: true,
              searchFieldAlignment: "left",
              paging: true,
              pageSizeOptions: [5, 10, 20, 30, 100],
              pageSize: 5,
              paginationType: "stepped",
              showFirstLastPageButtons: true,
              paginationPosition: "top",
              columnsButton: true,
              actionsColumnIndex: -1,
            }}
            title="Categorias"
          />

          {/* <table className="table mx-auto w-auto">
              <thead>
                <tr className='bg-neutral-600 text-neutral-50 text-xl'>
                  <th className='w-7/12 border-l-2 border-black'>Categoria</th>
                  <th className='w-7/12 border-x-2 border-black'>Nombre</th>
                  <th className='border-r-2 border-black'>Accion</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map(category => (
                  <tr key={category.id} className='border-solid border-b-2 border-neutral-800'>
                    <td className='capitalize text-center p-4 text-xl border-l-2 border-black'>{category.categoria_id == '1' ? 'Damas' : 'Caballeros'}</td>
                    <td className='capitalize text-center p-4 text-xl border-l-2 border-black'>{category.name}</td>
                    <td className='flex justify-center items-center text-xl gap-5 p-4 border-x-2 border-black'>
                      <button className='bg-violet-700 text-lg text-neutral-50 px-3 py-2 rounded-md' onClick={() => handleEditCategoria(category)}><FaMarker /></button>
                      <button className='bg-red-700 text-lg text-neutral-50 px-3 py-2 rounded-md' onClick={() => handleDeleteCategoria(category.id)}><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
        </div>
      </div>
      <ModalCategoria
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </Admin>
    // </div>
  );
}
