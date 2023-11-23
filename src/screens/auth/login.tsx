import { useState } from 'react';
import logo1 from '../../assets/logo2.png'
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/store/auth.context';

export const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
const [error, setError] = useState('');
const { login } = useAuth();
  
  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        const authToken = responseData.token;
        login(authToken);
        navigate("/home");
      } else {
        setError('Falha no login. Verifique seu e-mail e senha.');
      }
    } catch (error) {
      alert('Erro ao fazer login: ' + error);
    }
  };
  

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-8 lg:px-8 bg-slate-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src={logo1}
            alt="decexpress"
          />
          <h2 className="mt-6 text-center text-xl font-bold  text-gray-900">
            Autentique-se para acessar o sistema
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={loginData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 ${error ? 'border-red-500' : ''}`}
                  required
                />
              </div>
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Senha
                </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 ${error ? 'border-red-500' : ''}`}
                  required
                />
              </div>
            </div>

            {error && (
              <p className="mt-2 text-sm text-red-500">
                {error}
              </p>
            )}

            <div>
              <button
                onClick={handleLogin}
                className="flex w-full justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-800 text-white shadow-sm px-4 py-1.5 hover:from-blue-800 hover:to-blue-500"
              >
                Entrar
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Não possui uma conta?{' '}
            <a onClick={handleSignUp} className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </>
  )
};
