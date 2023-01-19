import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"


const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({});
  const[cuentaConfirmada, setCuentaConfirmada] = useState(false) 
  const params = useParams();
  const {id} = params;

  useEffect(() => {
    const confirmarCuenta = async () => {

      try{
        const url = `/usuarios/confirmar/${id}`
        const {data} = await clienteAxios(url)

        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true)
      }catch (error){
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmarCuenta();
  }, [])
  const {msg} = alerta
  return (
    <>
          <h1 className="text-gray-300  pb-10 text-2xl text-center uppercase">confirma tu Cuenta</h1>

          <div className="mt-20 md:mt-5 p-10 border border-gray-500 shadow rounded-xl bg-gray-800 ">
            {msg && <Alerta alerta={alerta}/> }
            {cuentaConfirmada && (
              <Link className='block text-center my-5 text-gray-300 uppercase text-sm' to="/">Inicia Sesión</Link>
            )}
          </div>

    </>
  )
}

export default ConfirmarCuenta