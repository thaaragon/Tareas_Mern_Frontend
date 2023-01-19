import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PreviewProyecto = ({ proyecto }) => {
    const { auth } = useAuth()
    const { nombre, _id, cliente, creadorProyecto } = proyecto

    return (
        <div className="border-b border-gray-300 p-5 flex flex-col md:flex-row justify-between">
            <div className="flex items-center gap-2 ">
                <p className="flex-1">{nombre} <span className="text-sm text-gray-600 uppercase">{''} {cliente}</span></p>
                {auth._id !== creadorProyecto && (
                    <p className="p-1 text-xs text-violet-500">Colaborador</p>
                )}
            </div>
            <Link to={`${_id}`} className="text-gray-600 hover:text-gray-800 uppercase text-sm">Ver Proyecto</Link>
        </div>
    )
}

export default PreviewProyecto