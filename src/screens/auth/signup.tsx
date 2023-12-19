import { AlertMessage } from "@/components/message/message";
import { ModalAlert } from "@/components/modals/modal-alert";
import useCreateStudent from "@/hooks/students/use-create-student";
import useCreateUser from "@/hooks/students/use-create-user";
import { date_format } from "@/utils/date-formatter";
import { isValidEmail } from "@/utils/valid-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: true,
  });
  const { createStudent, error } = useCreateStudent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const { createUser } = useCreateUser();

  const signUpUser = async () => {
    try {
      if (!isValidEmail(userData.email)) {
        setErrorMessage('Email Inválido')
        return;
      }
      const verifyEmail = await fetch(
        `http://localhost:8080/decexpress/aluno/verificar-email/${userData.email}`
      );
      if (verifyEmail.ok) {
        setErrorMessage('')
        await createUser(userData)

          if (userData.isAdmin === false) {
            const studentData = {
              nome: userData.name,
              email: userData.email,
              dataNascimento: date_format("1900-01-01"),
              telefone: "000",
            };
            await createStudent(studentData);

            if (!error) {
              setSuccessMessage("Aluno criado com sucesso");
            } else {
              setIsModalOpen(true);
            }
          } else {
            setSuccessMessage("Usuário criado com sucesso");
            console.log("Usuário criado com sucesso.");
          }

          setTimeout(() => {
            navigate('/login');
          }, 1000);
        } else {
          setIsModalOpen(true);
        }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setUserData({ ...userData, [name]: checked });
    } else {
      if (name === "isAdmin") {
        setUserData({ ...userData, [name]: value === "true" });
      } else {
        setUserData({ ...userData, [name]: value });
      }
    }
  };

  const cancelRegistration = () => {
    navigate("/login");
  };

  const handleBackModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-8 lg:px-8 bg-slate-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-10">
          Cadastre-se
        </h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      {successMessage && (
          <AlertMessage type="success" message={successMessage} />
        )}
      {errorMessage && (
          <AlertMessage type="error" message={errorMessage} />
        )}
        {isModalOpen && (
          <ModalAlert
            onConfirm={handleBackModal}
            text={'Este email pertence a outro usuário, tente utilizar outro email!'}
          />
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
            <legend className="text-sm font-semibold leading-6 text-gray-900">
              Selecione a categoria:
            </legend>
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-x-3">
                <input
                  id="admin"
                  name="isAdmin"
                  type="radio"
                  value="true"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  onChange={handleInputChange}
                  checked={userData.isAdmin}
                />
                <label
                  htmlFor="admin"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Admin
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="aluno"
                  name="isAdmin"
                  type="radio"
                  value="false"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  onChange={handleInputChange}
                  checked={!userData.isAdmin}
                />
                <label
                  htmlFor="aluno"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Aluno
                </label>
              </div>
            </div>
          </fieldset>
        </form>
        <div className="justify-between flex">
          <button
            type="submit"
            onClick={signUpUser}
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
