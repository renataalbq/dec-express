import { Layout } from "@/components/layout";
import { AlertMessage } from "@/components/message/message";
import useGetAllClasses from "@/hooks/class/use-get-classes";
import useUpdateStudent from "@/hooks/students/use-update-student";
import { date_format } from "@/utils/date-formatter";
import { nivel_format } from "@/utils/nivel-formatter";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const aluno = location?.state?.aluno;
  const { updateStudent, isLoading: isLoadingUpdate, error: isErrorUpdate } = useUpdateStudent();
  const { classes } = useGetAllClasses(); 

  useEffect(() => {
    if (aluno) {
      setFormData({
        nome: aluno.nome,
        dataNascimento: aluno.dataNascimento,
        cpf: aluno.cpf,
        rg: aluno.rg,
        telefone:  aluno.telefone,
        email:  aluno.email,
        matricula:  aluno.matricula,
        turma:  aluno.turma,
        codTurma: aluno.codTurma,
        endereco: {
          cep: aluno.cep,
          logradouro: aluno.logradouro,
          bairro: aluno.bairro,
          numero: aluno.numero,
          uf: aluno.uf,
          municipio: aluno.municipio,
          complemento: aluno.complemento,
        },
      });
    }
  }, [aluno]);
  
  
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    cpf: "",
    rg: "",
    endereco: {
      cep: 0,
      logradouro: "",
      bairro: "",
      numero: "",
      uf: "",
      municipio: "",
      complemento: "",
    },
    telefone: "",
    email: "",
    matricula: "",
    turma: {
      serie: 0,
      ano: 0,
      nivel: "",
      turma: "",
    },
    codTurma: 0
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    if (name === "dataNascimento") {
      setFormData({
        ...formData,
        [name]: date_format(value),
      });
    } else if (name.startsWith("endereco.")) {
      const addressField = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        endereco: {
          ...prevState.endereco,
          [addressField]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSaveStudents = async () => {
    if (!formData.nome || !formData.dataNascimento || !formData.telefone || !formData.email) {
      setErrorMessage("Preencha todos os campos obrigatórios.");
    } else if (aluno) {
      setErrorMessage(''); 
      await updateStudent(aluno.matricula, formData);
      if (!isErrorUpdate) {
        setSuccessMessage("Aluno alterado com sucesso");
        setTimeout(() => {
          navigate('/student-profile');
        }, 1000);
      }
    } else {
      setErrorMessage("");
    }
  };

  return (
    <Layout>
      <div className="flex justify-between mb-4">
      <h1 className="text-2xl font-semibold">{'Atualizar aluno'}</h1>
        <button
          onClick={handleSaveStudents}
          className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-2 rounded hover:from-blue-800 hover:to-blue-500"
        >
        {isLoadingUpdate ? 'Carregando...' : 'Atualizar aluno'}

        </button>
      </div>
      <div className="bg-white p-6 shadow-md">
        {successMessage && (
          <AlertMessage type="success" message={successMessage} />
        )}
        {errorMessage && (
          <AlertMessage type="error" message={errorMessage} />
        )}
        <form className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="nome" className="block font-semibold">
                Nome do aluno: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Nome do Aluno"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="dataNascimento" className="block font-semibold">
                Data de nascimento: <span className="text-red-500">*</span>
              </label>
              <input
                type="string"
                id="dataNascimento"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Data de Nascimento"
                required
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="cpf" className="block font-semibold">
                CPF: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="CPF"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="rg" className="block font-semibold">
                RG: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="rg"
                name="rg"
                value={formData.rg}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="RG"
                required
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="telefone" className="block font-semibold">
                Telefone: <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Telefone do aluno"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="email" className="block font-semibold">
                Email: <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="logradouro" className="block font-semibold">
                Logradouro:
              </label>
              <input
                type="text"
                id="logradouro"
                name="endereco.logradouro"
                value={formData.endereco.logradouro}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Rua XXXXXX"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="numero" className="block font-semibold">
                Numero:
              </label>
              <input
                type="text"
                id="numero"
                name="endereco.numero"
                value={formData.endereco.numero}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="000"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="bairro" className="block font-semibold">
                Bairro:
              </label>
              <input
                type="text"
                id="bairro"
                name="endereco.bairro"
                value={formData.endereco.bairro}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Bairro"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="cep" className="block font-semibold">
                CEP:
              </label>
              <input
                type="text"
                id="cep"
                name="endereco.cep"
                value={formData.endereco.cep}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="00000-000"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="municipio" className="block font-semibold">
                Município:
              </label>
              <input
                type="text"
                id="municipio"
                name="endereco.municipio"
                value={formData.endereco.municipio}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Município"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="uf" className="block font-semibold">
                UF:
              </label>
              <input
                type="text"
                id="uf"
                name="endereco.uf"
                value={formData.endereco.uf}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="UF"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="complemento" className="block font-semibold">
                Complemento:
              </label>
              <input
                type="text"
                id="complemento"
                name="endereco.complemento"
                value={formData.endereco.complemento}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Complemento"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="matricula" className="block font-semibold">
                Matrícula:
              </label>
              <input
                type="text"
                id="matricula"
                name="matricula"
                value={formData.matricula}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Matrícula"
                disabled
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="codTurma" className="block font-semibold">
                Turma:
              </label>
              <select
                id="codTurma"
                name="codTurma"
                value={formData.codTurma}
                onChange={(e) => {
                  const selectedCodTurma = e.target.value;
                  setFormData({
                    ...formData,
                    codTurma: Number(selectedCodTurma),
                  });
                }}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              >
                <option value="">Selecione uma turma</option>
                {classes?.map((turma) => (
                  <option key={turma.codTurma} value={formData.codTurma}>
                    {turma.serie}º Ano {turma.turma} - {nivel_format(turma.nivel)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
