import Admin from "@/layouts/admin";
import React from "react";

export default function Inicio() {
  return (
    <div className="h-screen flex">
      <Admin 
        title={"Inicio"} 
        description={"Administración bienvenido :D"}
      >
      <div className="relative w-full h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold uppercase">Bienvenido</h2>
      </div>
      </Admin>
    </div>
  );
}
