import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  })
  console.log(userData)
  const createUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("Usuário criado com sucesso.");
      } else {
        console.error('Erro ao criar usuário');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };


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
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nome
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                value={userData.name}
                onChange={handleInputChange}
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
                value={userData.email}
                onChange={handleInputChange}
                autoComplete="email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Senha
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={userData.password}
                onChange={handleInputChange}
                autoComplete="password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Categoria
            </label>
            <div className="mt-2">
              <input
                id="role"
                name="role"
                type="role"
                value={userData.role}
                onChange={handleInputChange}
                autoComplete="role"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
         
        </form>
        <div className="justify-between flex">
          <button
            type="submit"
            onClick={createUser}
            className="mt-12 flex rounded-md shadow-sm px-14 py-1.5 bg-gradient-to-r from-blue-500 to-blue-800 text-white  hover:from-blue-800 hover:to-blue-500"
          >
            Cadastrar
          </button>
          <button
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
