import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            if(!token){
                setCargando(false);
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                setCargando(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-perfil`, config);
                if (!response.ok) throw new Error("Error en la autenticación");

                const data = await response.json();
                setAuth(data.userData);
            } catch (error) {
                setAuth({})
            }
            setCargando(false);
        }
        autenticarUsuario();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                setAuth,
                auth,
                cargando,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;