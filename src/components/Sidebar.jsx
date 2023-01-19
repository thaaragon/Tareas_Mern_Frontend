import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Sidebar = () => {
    const {auth} = useAuth()
    console.log(auth)
  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
    <p className="text-xl text-gray-300">Hola: {auth.nombre}</p>

    <Link to="crear-proyecto" className="text-gray-200 text-sm bg-cyan-700 p-3 rounded-lg uppercase block mt-5 text-center ">Nuevo Proyecto</Link>

    </aside>
  )
}

export default Sidebar