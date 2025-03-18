import CarruselHome from "@/components/carruselHome";
import Ubicacion from "@/components/ubicacion";
import UltimosProductos from "@/components/ultimosProductos";
import useAuth from "@/hook/useAuth";
import Inicio from "@/layouts/inicio";

export default function Home() {

  const { auth, cargando } = useAuth();

  return (
    <Inicio
      title={'Inicio'}
      description={'Inicio'}
    >
    <div className="relative">
      <CarruselHome />
      <UltimosProductos />
    </div>
    <Ubicacion />
    </Inicio>
  );
}
