import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import styles from "@/styles/privado.module.css";
import useAuth from "@/hook/useAuth";
import Inicio from "@/layouts/inicio";

export default function Privado() {
  const [isRegisterActive, setIsRegisterActive] = useState(false);

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const { setAuth, auth, cargando } = useAuth();

  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = { usuario, password };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en la solicitud');
      }
  
      const data = await response.json();
  
      if(data.user.role_id == 2 || data.user.role_id == 3){

        localStorage.setItem('token', data.token);
        toast.success('¡Bienvenido!', { theme: "dark" });
        setAuth(data.user);
        router.push('/administracion/inicio');
      } else {
        router.push('/');
      }
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        setAuth(data.user);
      }

      toast.success("Registrado Correctamente!!!", { theme: "dark" });
      const timer = setTimeout(() => {
        setUsuario("");
        setPassword("");
      }, 2000);

      return () => clearTimeout(timer);
    } catch (error) {
      toast.error(error.message, { theme: "dark" });
      // toast.error(error.response.data.error, { theme: "dark" });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = { usuario, password };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la solicitud');
      }
  
      const data = await response.json();

      if(data.user.role_id == 2 || data.user.role_id == 3){
        localStorage.setItem('token', data.token);
        toast.success('¡Hola de nuevo!', { theme: "dark" });
        setAuth(data.user);
        router.push('/administracion/inicio');
      } 
      else {
        router.push('/');
      }
      const timer = setTimeout(() => {
        setUsuario("");
        setPassword("");
      }, 2000);
  
      return () => clearTimeout(timer);
    } catch (error) {
      toast.error(error.message, { theme: "dark" });
    }

  };

  const registerLink = () => {
    setIsRegisterActive(true);
  };

  const loginLink = () => {
    setIsRegisterActive(false);
  };

  return (
    <Inicio
      title={'Inicio'}
      description={'Inicio'}
    >
    <div className={styles.contenedor}>
      <div className={`${styles.wrapper} ${isRegisterActive ? styles.active : ''}`}>
        <div className={`${styles.form_box} ${styles.login}`}>
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <div className={styles.input_box}>
              <input 
                type="text" 
                placeholder="Usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)} 
              />
              <FaUser className={styles.icon} />
            </div>
            <div className={styles.input_box}>
              <input 
                type="password" 
                placeholder="Contraseña" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className={styles.icon} />
            </div>
            <div className={styles.remember_forgot}>
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <span>¿Olvidaste tu Contraseña?</span>
            </div>
            <button className={styles.btn} type="submit">Login</button>
            <div className={styles.register_link}>
              <p>
                ¿No tienes una cuenta? <button type="button" onClick={registerLink}>Regístrate</button>
              </p>
            </div>
          </form>
        </div>

        <div className={`${styles.form_box} ${styles.register}`}>
          <form onSubmit={handleRegister}>
            <h2>Registro</h2>
            <div className={styles.input_box}>
              <input 
                type="text" 
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Usuario" 
                required 
              />
              <FaUser className={styles.icon} />
            </div>
            <div className={styles.input_box}>
              <input 
                type="password" 
                placeholder="Contraseña" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <FaLock className={styles.icon} />
            </div>
            <div className={styles.remember_forgot}>
              <label>
                <input type="checkbox" />
                Acepto los términos y condiciones
              </label>
            </div>
            <button className={styles.btn} type="submit">Registro</button>
            <div className={styles.register_link}>
              <p>
                ¿Tienes una cuenta? <button type="button" onClick={loginLink}>Inicia Sesión</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>

    </Inicio>
  );
}
