import logo1 from '../../assets/logo2.png'
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/home");
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
                  required
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
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
                  required
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleLogin}
                className="flex w-full justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-800 text-white shadow-sm px-4 py-1.5 rounded hover:from-blue-800 hover:to-blue-500"
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
