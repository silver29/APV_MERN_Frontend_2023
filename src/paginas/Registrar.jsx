import { useState } from 'react'
import { Link } from 'react-router-dom'
//import axios from 'axios';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Registrar = () => {
    const [ nombre, setNombre] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repetirPassword, setRepetirPassword] = useState('')

    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e => {
        e.preventDefault();
        //console.log('Enviando formulario')
        if([nombre, email, password, repetirPassword].includes('')){
            //console.log('Hay campos vacios')
            setAlerta({ msg:'Hay campos vacios', error: true })
            return;
        }
        //console.log('después del if')

        if(password !== repetirPassword) {
            //console.log('Los Password no son iguales')
            setAlerta({ msg:'Los Password no son iguales', error: true })
            return
        }

        if(password.length < 6){
            //console.log('El Password es muy corto, agrega mínimo 6 caracteres')
            setAlerta({ msg:'El Password es muy corto, agrega mínimo 6 caracteres', error: true })
            return
        }
        
        console.log('todo bien...')
        setAlerta({})

        // Crear el usuario en la api
        try {
            //const url = `/veterinarios`
            //const url = "http://localhost:4000/api/veterinarios"
            //const respuesta = await axios.post(url,{ nombre, email, password})
            //await axios.post(url,{ nombre, email, password})
            //await clienteAxios.post(url,{nombre, email, password})
            await clienteAxios.post(`/veterinarios`,{ nombre, email, password })
            //console.log(respuesta);
            setAlerta({
                msg: 'Creado Correctamente, revisa tu email',
                error: false
            })
        } catch (error) {
            //console.log(error.response)
            setAlerta({
                msg: error.response.data.msg,
                error:true
            })
        }
    }

    const { msg } = alerta

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Crea tu cuenta y Administra {""}  
                    <span className="text-black">tus Pacientes</span>
                </h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                { msg && <Alerta
                    alerta={alerta}
                />}
                <form 
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Nombre
                        </label>
                        <input 
                            type="text"
                            placeholder="Tu Nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={nombre}
                            onChange = { e => setNombre(e.target.value) }
                        />
                    </div>
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Email
                        </label>
                        <input 
                            type="email"
                            placeholder="Email de Registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange = { e => setEmail(e.target.value) }
                        />
                    </div>
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Password
                        </label>
                        <input 
                            type="password"
                            placeholder="Tu Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange = { e => setPassword(e.target.value) }
                        />
                    </div>
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Repetir Password
                        </label>
                        <input 
                            type="password"
                            placeholder="Repite tu Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={repetirPassword}
                            onChange = { e => setRepetirPassword(e.target.value) }
                        />
                    </div>
                    <input 
                        type="submit" 
                        value="Crear Cuenta"
                        className="bg-indigo-700 
                        w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5
                        hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                    />
                </form>

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link
                        className='block text-center my-5 text-gray-500' 
                        to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
                    <Link
                        className='block text-center my-5 text-gray-500'
                        to="/olvide-password">Olvide mi Password</Link>
                </nav>

            </div>
        </>
    )
};

export default Registrar;