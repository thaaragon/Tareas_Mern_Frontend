import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"

const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  
  const handleSubmit = async e => {
    e.preventDefault();
    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }
    if(password !== repetirPassword){
      setAlerta({
        msg: 'Los password no son iguales',
        error: true
      })
      return
    }
    if(password.length < 6 ){
      setAlerta({
        msg: 'El password tiene que tener al menos 6 carácteres',
        error: true
      })
      return
    }

    setAlerta({})
    //Crear usuario api

    try{
      const {data} = await clienteAxios.post(`/usuarios`, {nombre, email, password})
      setAlerta({
        msg: data.msg,
        error: false
      })
      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')

    } catch (error){
      setAlerta({msg: error.response.data.msg, error: true})

    }
    
  }

  const {msg} = alerta

  return (
    <>
    <h1 className="text-gray-300  pb-10 text-2xl text-center uppercase">Crea una cuenta</h1>
    {msg && <Alerta alerta={alerta} />}
    <form action="" className="bg-gray-800 border border-gray-500 shadow rounded-xl p-10"
    onSubmit={handleSubmit}> 
    <div className="my-5">
        <label className="uppercase text-gray-300 block text-md font-bold" htmlFor="nombre">Nombre</label>
        <input id="nombre" type="text" placeholder="Nombre" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
        value={nombre} onChange={e => setNombre(e.target.value)}/>
      </div>
      <div className="my-5">
        <label className="uppercase text-gray-300 block text-md font-bold" htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="Email de registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
         value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="my-5">
        <label className="uppercase text-gray-300 block text-md font-bold" htmlFor="password">Password</label>
        <input id="password" type="password" placeholder="Email de registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
         value={password} onChange={e => setPassword(e.target.value)}  />
      </div>
      <div className="my-5">
        <label className="uppercase text-gray-300 block text-md font-bold" htmlFor="password">Repetir Password</label>
        <input id="password2" type="password" placeholder="Repetir password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
         value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} />
      </div>
      <input type="submit" value="Crear Cuenta" className="bg-sky-900 mb-5 p-3 text-gray-300 mt-5 w-full rounded-xl hover:cursor-pointer hover:bg-sky-600 transition-colors"/>
    </form>

    <nav className="lg:flex lg:justify-between"> 
      <Link className='block text-center my-5 text-gray-300 uppercase text-sm' to="/">Inicia Sesión</Link>
      <Link className='block text-center my-5 text-gray-300 uppercase text-sm' to="/olvide-password">Olvide mi password</Link>


    </nav>
  </>
  )
}

export default Registrar