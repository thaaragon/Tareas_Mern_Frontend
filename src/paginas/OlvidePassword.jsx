import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"


const OlvidePassword = () => {
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();
    if (email === '' || email.length < 6) {
      setAlerta({
        msg: 'El email es obligatorio o no es correcto',
        error: true
      });
      return

    }
    try {

      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, { email })
      setAlerta({
        msg: data.msg,
        error: false
      })

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }


  }
  const { msg } = alerta
  return (
    <>
      <h1 className="text-gray-300 text-2xl text-center pb-10 uppercase">Genera una nueva contraseña</h1>

      {msg && <Alerta alerta={alerta} />}

      <form className=" bg-gray-800  border border-gray-500 shadow rounded-xl p-10"
        onSubmit={handleSubmit}>
        <div className="my-5">
          <label className="uppercase text-gray-300 block text-md font-bold" htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="Email de registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </div>

        <input type="submit" value="Enviar" className="bg-sky-900 mb-5 p-3 text-gray-300 mt-5 w-full rounded-xl hover:cursor-pointer hover:bg-sky-600 transition-colors" />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link className='block text-center my-5 text-gray-300 uppercase text-sm' to="/registrar">Regístrate</Link>
        <Link className='block text-center my-5 text-gray-300 uppercase text-sm' to="/">Inicia Sesión</Link>


      </nav>
    </>
  )
}

export default OlvidePassword