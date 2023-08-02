import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
//import axios from 'axios';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const ConfirmarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})

    const params = useParams()
    //console.log(params);
    const { id } = params 
    //alert (id)

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/veterinarios/confirmar/${id}`
                //const url = `http://localhost:4000/api/veterinarios/confirmar/${id}`
                //console.log(url);
                //const { data } = await axios(url)
                const { data } = await clienteAxios(url)
                //console.log(data)
                setCuentaConfirmada(true)
                setAlerta({
                    msg: data.msg
                })

            } catch (error) {
                //console.log(error.response)
                setAlerta({
                    msg: error.response.data.msg,
                    error:true
                })
            }

            setCargando(false)
        }
        confirmarCuenta();
    }, [])

    // una vez que cargando este como false, muestra el mensaje

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Confirma tu Cuenta y Comienza a Administrar {""}  
                    <span className="text-black">tus Pacientes</span>
                </h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {!cargando && 
                    <Alerta             
                    alerta={alerta}
                />}
                {cuentaConfirmada && (
                    <Link
                    className='block text-center my-5 text-gray-500' 
                    to="/">Iniciar Sesión</Link>   
                )}
            </div>
        </>
    )
};

export default ConfirmarCuenta;