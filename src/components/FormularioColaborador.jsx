import { useState } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"

const FormularioColaborador = () => {
    const [email, setEmail] = useState('')

    const {mostrarAlerta, alerta, submitColaborador } = useProyectos()

    const handleSubmit = e => {
        e.preventDefault();

        if(email === ''){
            mostrarAlerta({
                msg: 'El email es obligatorio',
                error: true
            })
            return
        }
        submitColaborador(email)
        
    }

    const {msg} = alerta

    return (
        <form className="bg-gray-200 py-10 px-5 w-full md:w-1/2 rounded-lg shadow " onSubmit={handleSubmit}>
        {msg && <Alerta alerta={alerta} />}
            <div className="mb-5">
                <label className=" uppercase text-sm" htmlFor="email">Email colaborador</label>
                <input id="email" type="email" className="border w-full p-2 mt-2 placeholder-gray-400 rounded" placeholder="Email del colaborador"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <input type="submit" className='bg-yellow-600 hover:bg-yellow-500 w-full p-2 text-sm text-gray-200 uppercase cursor-pointer transition-colors rounded-md'
                value='Buscar Colaborador'
            />


        </form>
    )
}

export default FormularioColaborador