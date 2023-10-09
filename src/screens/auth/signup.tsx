import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();

  const cancelRegistration = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-8 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-xl font-bold text-gray-900">
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
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
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

          <div className="mt-6 flex items-center justify-end gap-x-8">
            <button className="rounded-md bg-blue-700 mt-2 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-600">
              Gerar matrícula
            </button>
            <div className="sm:col-span-4">
              <div className="mt-2">
                <input
                  id="matricula"
                  name="matricula"
                  type="matricula"
                  autoComplete="matricula"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </form>
        <button
          type="submit"
          onClick={cancelRegistration}
          className="mt-12 flex w-full justify-center rounded-md shadow-sm px-4 py-1.5 rounded bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-transparent"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
