import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom';
import "./auth.css"

const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState ('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const {loginUser} = useAuth()


    
    const from = location.state?.from?.pathname || '/home'

    const handleSubmit = async (el) => {
        el.preventDefault()

        if(!email || !password){
            setError('Por favor rellene los campos');
            setTimeout(()=> setError(''), 5000);
            return
        }

        try {
            const response = await loginUser({email,password});
            if (response.statusCode === 200) {
                localStorage.setItem('token', response.token)
                localStorage.setItem('role', response.role)
                navigate(from, {replace: true})
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    }
  return (
    <div className="auth-container">
        <div className='form-container'>
            {error && <p className="error-message" style={{color:"red"}}>{error}</p>}
            <form onSubmit={handleSubmit} className='form'>
               <h2>Ingresa!</h2>
                <div className="form-group">
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className='detail-button' type="submit">Iniciar Sesion</button>
            <p className="register-link">
                No tenes una cuenta? <a href="/register">Registrate</a>
            </p>
            </form>

        </div>
         
        </div>
  )
}

export default LoginPage