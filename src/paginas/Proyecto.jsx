import { useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";
import ModalForrmularioTarea from "../components/ModalFormularioTarea";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import ModalEliminarColaborador from "../components/ModalEliminarcolaborador";
import Tarea from "../components/Tarea";
import Alerta from "../components/Alerta";
import Colaborador from "../components/Colaborador";
import io from 'socket.io-client'


let socket;


const Proyecto = () => {

    const params = useParams();
    const { obtenerProyecto, proyecto, cargando, handleModalTarea, alerta, submitTareasProyecto, eliminarTareaProyecto, actualizarTareaProyecto, cambiarEstadoTarea } = useProyectos()
    
    const admin = useAdmin()

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL) 
        socket.emit('abrir proyecto', params.id)

    }, [])

    useEffect(() => {
        socket.on('tarea agregada', tareaNueva  => {
            if(tareaNueva.proyecto === proyecto._id){
                submitTareasProyecto(tareaNueva)

            }

        })
        socket.on('tarea eliminada', tareaEliminada => {
            if(tareaEliminada.proyecto === proyecto._id){
                eliminarTareaProyecto(tareaEliminada)

            }
        })
        
        socket.on('tarea actualizada', tareaActualizada => {
            if(tareaActualizada.proyecto._id === proyecto._id) {
              actualizarTareaProyecto(tareaActualizada)
            }
        })
        socket.on('nuevo estado', nuevoEstadoTarea => {
            if(nuevoEstadoTarea.proyecto._id === proyecto._id) {
              cambiarEstadoTarea(nuevoEstadoTarea)

            }
        })
    })

    const { nombre } = proyecto

    if (cargando) return 'Cargando...'
    const { msg } = alerta


    return (
            <>
                <div className="flex justify-between">
                    <h1 className="text-2xl uppercase">{nombre}</h1>

                    {admin && ( 
                    <div className="flex items-center gap-2 text-gray-200 p-2 uppercase rounded-lg bg-teal-800 hover:bg-teal-900 text-sm md:w-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        <Link to={`/proyectos/editar/${params.id}`} className="uppercase">Editar</Link>

                    </div>
                    )}

                </div>
                {admin && (
                <button onClick={handleModalTarea} type="button" className="text-sm bg-yellow-600 p-2 w-full items-center md:w-auto rounded-lg uppercase mt-3 text-gray-200 flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    Nueva Tarea
                    </button>

                )}
                <p className="text-xl mt-10">Tareas del Proyecto</p>
    

                <div className="bg-gray-200 shadow mt-10 rounded-lg">
                    {proyecto.tareas?.length ?
                        proyecto.tareas?.map(tarea => (
                            <Tarea
                                key={tarea._id}
                                tarea={tarea}
                            />
                        )) :
                        <p className="text-center text-gray-600 uppercase p-5">No hay tareas en este proyecto</p>}
                </div>
                {admin && (
                    <>
                <div className="flex items-center justify-between">
                    <p className="text-xl mt-10">Colaboradores</p>
                    <Link
                        to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                        className='text-gray-600 mt-10 uppercase hover:text-gray-500'>Añadir colaborador</Link>
                </div>
                <div className="bg-gray-200 shadow mt-10 rounded-lg">
                    {proyecto.colaboradores?.length ?
                        proyecto.colaboradores?.map(colaborador => (
                            <Colaborador
                                key={colaborador._id}
                                colaborador={colaborador}
                            />


                        )) :
                        <p className="text-center text-gray-600 uppercase p-5">No hay Colaboradores en este proyecto</p>}
                </div>
                </>
                )}

                <ModalForrmularioTarea />
                <ModalEliminarTarea />
                <ModalEliminarColaborador />

            </>
        )
}

export default Proyecto