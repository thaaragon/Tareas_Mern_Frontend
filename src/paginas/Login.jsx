import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const {setAuth} = useAuth();

  const navigate = useNavigate()
 


  const handleSubmit = async e => {
    e.preventDefault();
    if([email, password].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios', 
        error: true
      });
      return
    }


    try{
      const { data } = await clienteAxios.post('/usuarios/login', {email, password})
      setAlerta({})
      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/proyectos')

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
      <h1 className="text-gray-300 text-2xl pb-10 text-center uppercase">Inicia sesión y administrar los proyectos</h1>

      {msg && <Alerta alerta={alerta} /> }
      <form className=" bg-gray-800  border border-gray-500 shadow rounded-xl p-10"
      onSubmit={handleSubmit}> 
        <div className="my-5">
          <label className="uppercase text-gray-300 block text-md font-bold" htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="Email de registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          value={email}
          onChange={e => setEmail(e.target.value)}
            />
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-300 block text-md font-bold" htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Email de registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          value={password}
          onChange={e => setPassword(e.target.value)}  />
        </div>
        <input type="submit" value="Iniciar sesión" className="bg-sky-900 mb-5 p-3 text-gray-300 mt-5 w-full rounded-xl hover:cursor-pointer hover:bg-sky-600 transition-colors"/>
      </form>

      <nav className="lg:flex lg:justify-between"> 
        <Link className='block text-center my-5 text-gray-300 uppercase text-sm' to="/registrar">Regístrate</Link>
        <Link className='block text-center my-5 text-gray-300 uppercase text-sm' to="/olvide-password">Olvide mi password</Link>


      </nav>
    </>
  )
}

export default Login