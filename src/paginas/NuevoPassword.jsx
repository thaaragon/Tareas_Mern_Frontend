import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"


const NuevoPassword = () => {

  const [password, setPassword] = useState('')
  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()
  const { token } = params


  useEffect(() => {
    const comporbarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        })

      }
    }
    comporbarToken()
  }, [])
  const handleSubmit = async e => {
    e.preventDefault();
    if(password.length < 6){
      setAlerta({
        msg: 'El password debe ser mínimo de 6 carácteres',
        error: true
      })
      return
    }
    try{
      const url = `/usuarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url, {password})
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordModificado(true)


    }catch (error){
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
    
  }

  const {msg} = alerta
  return (
    <>
      <h1 className="text-gray-300  pb-10 text-2xl text-center uppercase">Restablece Password</h1>
      
      
      {msg && <Alerta alerta={alerta}/> }
      {tokenValido && (
        <form className="bg-gray-800  border border-gray-500 shadow rounded-xl p-10"
        onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-300 block text-md font-bold" htmlFor="password">Nuevo Password</label>
            <input id="password" type="password" placeholder="Nuevo Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={e => setPassword(e.target.value)}
             />
          </div>

          <input type="submit" value="Guardar Nuevo Password" className="bg-sky-900 mb-5 p-3 text-gray-300 mt-5 w-full rounded-xl hover:cursor-pointer hover:bg-sky-600 transition-colors" />
        </form>
      )}

      {passwordModificado && (
              <Link className='block text-center my-5 text-gray-300 uppercase text-sm' to="/">Inicia Sesión</Link>
            )}
    </>
  )
}

export default NuevoPassword