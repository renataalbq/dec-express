import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();

  const cancelRegistration = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-8 lg:px-8 bg-slate-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-10">
          Cadastre-se
        </h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nome
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 bg-white"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="senha"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Senha
            </label>
            <div className="mt-2">
              <input
                id="senha"
                name="senha"
                type="senha"
                autoComplete="senha"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Selecione a categoria:</legend>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="admin"
                    name="role"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="admin" className="block text-sm font-medium leading-6 text-gray-900">
                    Admin
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="aluno"
                    name="role"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="aluno" className="block text-sm font-medium leading-6 text-gray-900">
                    Aluno
                  </label>
                </div>
                
              </div>
            </fieldset>
         
        </form>
        <div className="justify-between flex">
          <button
            onClick={cancelRegistration}
            className="mt-12 flex rounded-md shadow-sm px-14 py-1.5 bg-gradient-to-r from-blue-500 to-blue-800 text-white  hover:from-blue-800 hover:to-blue-500"
          >
            Cadastrar
          </button>
          <button
            type="submit"
            onClick={cancelRegistration}
            className="mt-12 flex rounded-md shadow-sm px-14 py-1.5 bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-transparent"
          >
            Cancelar
          </button>
        </div>
        
      </div>
    </div>
  );
};
