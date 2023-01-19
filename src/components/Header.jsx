import { Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import useAuth from "../hooks/useAuth";
import Busqueda from "./Busqueda";

const Header = () => {
  const { handleBuscador, cerrarSesionProyectos } = useProyectos()
  const { cerrarSesionAuth } = useAuth()

  const handleCerrarSesion = () => {
    cerrarSesionAuth()
    cerrarSesionProyectos()
    localStorage.removeItem('token')

  }

   return (
    <header className="px-4 py-5 bg-slate-900 ">
      <div className="md:flex md:justify-between">
        <h2 className="text-3xl text-white text-center mb-5 md:mb-0 ">Tareas</h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
         
        
          <button type="button" className="text-gray-200 flex flex-row items-center uppercase"
            onClick={handleBuscador}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-white mr-1 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>Buscar proyecto</button>

          <Link to="/proyectos" className="uppercase text-gray-200">Proyectos</Link>
          <button type="button" className="text-gray-200 text-sm bg-cyan-700 p-3 rounded-md uppercase"
          onClick={handleCerrarSesion}
          >Cerrar Sesión</button>
          <Busqueda />

        </div>
      </div>
    </header>
  )
}

export default Header