import { useEffect } from "react"
import FormularioColaborador from "../components/FormularioColaborador"
import useProyectos from "../hooks/useProyectos"
import { useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
const NuevoColaborador = () => {
  const {obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, alerta} = useProyectos()
  const params = useParams()

  useEffect(() => {
    obtenerProyecto(params.id)

  }, []);

  if(!proyecto?._id) return <Alerta alerta={alerta} />


  return (
    <>

      <h1 className="text-2xl">Añadir Colaborador/a al proyecto: {proyecto.nombre}</h1>
      <div className="mt-10 flex justify-center">

        <FormularioColaborador/>

      </div>
      {cargando ? <p className="text-center">Cargando...</p> : colaborador?._id && (
        <div className="flex justify-center mt-10">
          <div className="bg-gray-200 py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
            <h2 className="text-center mb-10 text-xl">Resultado</h2>
            <div className="flex justify-between items-center">
              <p>{colaborador.nombre}</p>
              <button type="button" className='bg-slate-900 hover:bg-slate-700 px-5 py-2 text-sm text-gray-200 uppercase cursor-pointer transition-colors rounded-md' 
              onClick={() => agregarColaborador({
                email: colaborador.email
              })}>Agregar al Proyecto</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NuevoColaborador