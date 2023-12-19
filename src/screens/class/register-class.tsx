import { Layout } from "@/components/layout";
import { AlertMessage } from "@/components/message/message";
import ErrorPlaceholder from "@/components/placeholders/error";
import LoadingPlaceholder from "@/components/placeholders/loading";
import useCreateClass from "@/hooks/class/use-create-class";
import useGetAllClasses from "@/hooks/class/use-get-classes";
import useUpdateClass from "@/hooks/class/use-update-class";
import { useServerAvailable } from "@/hooks/use-server-available";
import { isNivel, seriesOptions } from "@/utils/nivel-formatter";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function RegisterClass() {
  const navigate = useNavigate();
  const { createClass, isLoading, error } = useCreateClass(); 
  const location = useLocation();
  const turma = location?.state?.turma;
  const { updateClass, isLoading: isLoadingUpdate, error: isErrorUpdate } = useUpdateClass();
  const [isUpdate, setIsUpdate] = useState(false)
  const { classes } = useGetAllClasses()
  const serverOn = useServerAvailable('http://localhost:8080/decexpress/turma');

  useEffect(() => {
    if (turma) {
      setFormData({
        ano: turma.ano,
        serie: turma.serie,
        nivel: turma.nivel,
        turma: turma.turma,
      });
      setIsUpdate(true)
    }
  }, [turma]);

  const isDuplicateClass = (serie: number, nivel: string, turma: string) => {
    return classes?.some(classe => 
      classe.serie === serie && 
      classe.nivel === nivel && 
      classe.turma === turma
    );
  };
  
  const [formData, setFormData] = useState({
    ano: 0,
    serie: 0,
    nivel: "",
    turma: "",
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
  
    setFormData({
      ...formData,
      [name]: name === 'ano' || name === 'serie' ? parseInt(value) : value,
    });
  };

    const handleSaveClass = async () => {
    if (!formData.ano || !formData.serie || !formData.turma || !formData.nivel) {
      setErrorMessage("Preencha todos os campos obrigatórios.");
    } else if (turma) {
      setErrorMessage(''); 
      await updateClass(turma.codTurma, formData);
      if (!isErrorUpdate) {
        setSuccessMessage("Turma alterada com sucesso");
        setTimeout(() => {
          navigate('/list-class');
        }, 1000);
      }
    }
    else {
      setErrorMessage(''); 
      if (isDuplicateClass(formData.serie, formData.nivel, formData.turma)) {
        setErrorMessage('Já existe uma turma com as mesmas características.');
        return;
      }
      else {
        await createClass(formData);
        if (error) {
          setErrorMessage("Não foi possível criar turma")
        }
        else if (!error) {
          setSuccessMessage("Turma criada com sucesso");
          setTimeout(() => {
            navigate('/list-class');
          }, 1000);
        }
      }
    }
  };

  return (
    <Layout>
        {serverOn === null ? <LoadingPlaceholder /> :
        !serverOn ? <ErrorPlaceholder error={'Servidor indisponível'} />
        :
        <>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold">{isUpdate ? 'Atualizar turma' : 'Cadastrar nova turma'}</h1>
        <button
          onClick={handleSaveClass}
          type="submit" disabled={isLoading}
          className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-2 rounded hover:from-blue-800 hover:to-blue-500"
        >
          {isLoading || isLoadingUpdate ? 'Carregando...' : (isUpdate ? 'Atualizar turma' : 'Salvar Turma')}
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
              <label htmlFor="ano" className="block font-semibold">
                Ano: <span className="text-red-500">*</span>
              </label>
              <select
                id="ano"
                name="ano"
                value={formData.ano}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              >
                <option value={undefined}>Selecione o ano</option>
                <option value={2023}>2023</option>
                <option value={2024}>2024</option>
                <option value={2025}>2025</option>
              </select>
            </div>
            <div className="w-1/2">
            <label htmlFor="nivel" className="block font-semibold">
                Nível: <span className="text-red-500">*</span>
              </label>
              <select
                id="nivel"
                name="nivel"
                value={formData.nivel}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                disabled={isUpdate}
              >
                <option value="">Selecionar nível</option>
                <option value="ENSINO_FUNDAMENTAL_I">Ensino Fundamental I</option>
                <option value="ENSINO_FUNDAMENTAL_II">Ensino Fundamental II</option>
                <option value="ENSINO_MEDIO">Ensino Médio</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="turma" className="block font-semibold">
                Turma: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="turma"
                name="turma"
                value={formData.turma}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Ex: A"
                disabled={isUpdate}
              />
            </div>
            <div className="w-1/2">
            <label htmlFor="serie" className="block font-semibold">
                Série: <span className="text-red-500">*</span>
              </label>
              <select
                id="serie"
                name="serie"
                value={formData.serie}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                disabled={isUpdate}
              >
               <option value={undefined}>Selecione a série</option>
                  {isNivel(formData.nivel) ? seriesOptions[formData.nivel].map(serie => (
                    <option key={serie} value={serie}>{serie}</option>
                  )) : null}
              </select>
            </div>
          </div>
        </form>
      </div>
      </>}
    </Layout>
  );
}
