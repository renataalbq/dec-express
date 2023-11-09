import useCreateStudent from "@/hooks/use-create-student";
import { date_format } from "@/utils/date-formatter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: true,
  })
  const { createStudent, error } = useCreateStudent();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const createUser = async () => {
    try {
      const verifyEmail = await fetch(`http://localhost:8080/decexpress/aluno/verificar-email/${userData.email}`);
      if (verifyEmail.ok) {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          if (userData.isAdmin === false) {
            const studentData = {
              nome: userData.name,
              email: userData.email,
              dataNascimento: date_format("1900-01-01"),
              telefone: "000",
            };
            await createStudent(studentData);

            if (!error) {
              console.log("Aluno criado com sucesso.");
            } else {
              setErrorMessage(error)
            }
          }
          else {
            console.log("Usuário criado com sucesso.");
          }

          navigate("/login");
        } else {
          setErrorMessage('Email já pertence a outro usuário')
        }
      } else {
        setErrorMessage('Email já pertence a outro usuário');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  
  const handleIsAdminChange = (e: { target: { name: any; checked: any; }; }) => {
    const { name, checked } = e.target;
    setUserData({ ...userData, [name]: checked });
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
      {showErrorModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            <div className="relative max-w-md p-8 bg-white shadow-md rounded-lg">
              <p className="text-gray-800">{errorMessage}</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                X
              </button>
            </div>
          </div>
        )}
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
          <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Selecione a categoria:</legend>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="admin"
                    name="isAdmin"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    onChange={handleIsAdminChange}
                    checked={userData.isAdmin == true ? true : false}
                  />
                  <label htmlFor="admin" className="block text-sm font-medium leading-6 text-gray-900">
                    Admin
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="aluno"
                    name="isAdmin"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    onChange={handleIsAdminChange}
                    checked={userData.isAdmin == false ? true : false}
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
