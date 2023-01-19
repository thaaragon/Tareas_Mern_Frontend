import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"

const FormularioProyecto = () => {

    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    const params = useParams();
    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

    useEffect(() => {
        if (params.id) {
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)

        } else {
            console.log('Nuevo proyecto')
        }
    }, [params])

    const handleSubmit = async e => {
        e.preventDefault();
        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        //Pasar datos a provider
        await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente })
        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')

    }
    const { msg } = alerta

    return (
        <form className=" py-10 px-5 md:w-1/2 bg-gray-200 border border-gray-300 shadow rounded-md"
            onSubmit={handleSubmit}>

            {msg && <Alerta alerta={alerta} />}
            <div className="mb-5">
                <label className=" uppercase text-sm" htmlFor="nombre">Nombre Proyecto</label>
                <input id="nombre" type="text" className="border w-full p-2 mt-2 placeholder-gray-400 rounded" placeholder="Nombre del proyecto"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label className=" uppercase text-sm" htmlFor="descripcion">Descripcion</label>
                <textarea id="descripcion" className="border w-full p-2 mt-2 placeholder-gray-400 rounded" placeholder="Descripción del proyecto"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label className=" uppercase text-sm" htmlFor="fecha-entrega">Fecha entrega</label>
                <input id="fecha-entrega" type="date" className="border w-full p-2 mt-2 placeholder-gray-400 rounded"
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label className=" uppercase text-sm" htmlFor="cliente">Nombre Cliente</label>
                <input id="cliente" type="text" className="border w-full p-2 mt-2 placeholder-gray-400 rounded" placeholder="Nombre del Cliente"
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                />
            </div>
            <input type="submit" value={id ? 'Actualizar proyecto' : 'Crear Proyecto'} className="text-gray-200 text-sm bg-cyan-700 p-3 rounded-md uppercase w-full cursor-pointer hover:bg-cyan-900 transition-colors" />

        </form>
    )
}

export default FormularioProyecto