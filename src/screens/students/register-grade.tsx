import { Layout } from "@/components/layout";
import { AlertMessage, AlertMessageProps } from "@/components/message/message";
import { ConfirmationModal } from "@/components/modal-confirmation/modal-confirmation";
import { Pagination } from "@/components/pagination/pagination";
import ErrorPlaceholder from "@/components/placeholders/error";
import useCreateGrade from "@/hooks/grades/use-create-grade";
import useDeleteGrade from "@/hooks/grades/use-delete-grade";
import useGetGrades from "@/hooks/grades/use-get-grades";
import useUpdateGrade from "@/hooks/grades/use-update-grade";
import useGetAllSubjects from "@/hooks/teachers-subjects/use-get-subjects";
import useGetAllTeachers from "@/hooks/teachers-subjects/use-get-teachers";
import { useServerAvailable } from "@/hooks/use-server-available";
import { INotas } from "@/model/INotas";
import { useEffect, useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useLocation } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const RegisterGrade = () => {
  const { createGrade } = useCreateGrade();
  const location = useLocation();
  const { aluno } = location.state;
  const { updateGrade } = useUpdateGrade();
  const { grades, refetch } = useGetGrades(aluno.email);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idEdit, setIdEdit] = useState<number | null>(null);
  const { teachers } = useGetAllTeachers();
  const { subjects } = useGetAllSubjects();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [formularioAtual, setFormularioAtual] = useState({
    bimestre: 0,
    professor: "",
    disciplina: "",
    nota: 0.0,
    nome: aluno.nome,
    matricula: aluno.matricula,
    email: aluno.email,
  });
  const serverOn = useServerAvailable("http://localhost:3000/grades");
  const [alertMessage, setAlertMessage] = useState<AlertMessageProps>({
    type: "error",
    message: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<INotas | null>(null);

  const { deleteGrade } = useDeleteGrade(() => {
    refetch();
  });

  const handleDelete = (gradeId: number) => {
    deleteGrade(gradeId);
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = (grade: INotas) => {
    setSelectedGrade(grade);
    setIsModalOpen(true);
  };
  
  useEffect(() => {
    if (grades) {
      const totalItems = grades.length;
      setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
    }
  }, [grades]);
  
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentGrades = grades?.slice(indexOfFirstItem, indexOfLastItem);

  const handleFormChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    const isBimestre = name === "bimestre";
    const updatedValue = isBimestre ? Number(value) : value;

    setFormularioAtual({ ...formularioAtual, [name]: updatedValue });
    if (alertMessage.message) {
      setAlertMessage({ type: "error", message: "" });
    }
  };

  const handleEdit = (grade: any) => {
    setFormularioAtual({
      bimestre: grade.bimestre,
      professor: grade.professor,
      disciplina: grade.disciplina,
      nota: grade.nota,
      nome: grade.nome,
      matricula: grade.matricula,
      email: grade.email,
    });
    setIsUpdate(true);
    setIdEdit(grade.id);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const validarNotaExistente = (grades: any, formularioAtual: any, idEdit: any, isUpdate: boolean) => {
    const { bimestre, disciplina } = formularioAtual;
  
    const bimestreInt = parseInt(bimestre, 10);
  
    const notaExistente = grades?.find((grade: any) => {
      const comparaBimestre = parseInt(grade.bimestre, 10) === bimestreInt;
      const comparaDisciplina = grade.disciplina === disciplina;
      const comparaId = isUpdate ? grade.id !== idEdit : true;
      
      return comparaBimestre && comparaDisciplina && comparaId;
    });
    
    return !!notaExistente;
    
  };
  

  const adicionarNota = async () => {
    if (
      !formularioAtual.bimestre ||
      !formularioAtual.professor ||
      !formularioAtual.disciplina ||
      !formularioAtual.nota
    ) {
      setAlertMessage({
        type: "error",
        message: "Preencha todos os campos obrigatórios.",
      });
      return;
    }
  
    const notaJaExiste = validarNotaExistente(grades, formularioAtual, idEdit, isUpdate);
    console.log(notaJaExiste)
    if (notaJaExiste) {
      setAlertMessage({
        type: "error",
        message:
          "Nota já registrada para esta disciplina e bimestre. Edite ou exclua a nota existente.",
      });
      return;
    }

    if (isUpdate && idEdit !== null) {
      await updateGrade(idEdit, {
        ...formularioAtual,
        nota: formularioAtual.nota,
      });
      setIsUpdate(false);
      setIdEdit(null);
    } else {
      await createGrade(formularioAtual);
    }

    refetch();
    resetFormulario();
  };

  const resetFormulario = () => {
    setFormularioAtual({
      bimestre: 0,
      professor: "",
      disciplina: "",
      nota: 0.0,
      nome: aluno.nome,
      matricula: aluno.matricula,
      email: aluno.email,
    });
  };

  return (
    <Layout>
      {!serverOn ? (
        <ErrorPlaceholder error={"Servidor indisponível"} />
      ) : (
        <>
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold">Registro de Notas</h1>
            {alertMessage.message && (
              <div className="mt-4">
                <AlertMessage
                  type={alertMessage.type}
                  message={alertMessage.message}
                />
              </div>
            )}
            <div className="flex flex-wrap gap-4 mb-4 items-center mt-6 bg-white p-6 shadow-md">
              <div className="flex flex-col w-1/6">
                <label htmlFor="bimestre" className="block font-semibold">
                  Bimestre: <span className="text-red-500">*</span>
                </label>
                <select
                  id="bimestre"
                  name="bimestre"
                  value={formularioAtual.bimestre}
                  onChange={handleFormChange}
                  className="p-2 border border-gray-300 rounded"
                  disabled={isUpdate}
                  required={!isUpdate}
                >
                  <option value={0}>Selecionar bimestre</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>
              <div className="flex flex-col w-1/6">
                <label htmlFor="professor" className="block font-semibold">
                  Professor: <span className="text-red-500">*</span>
                </label>
                <select
                  id="professor"
                  name="professor"
                  value={formularioAtual.professor}
                  onChange={handleFormChange}
                  className="p-2 border border-gray-300 rounded"
                  disabled={isUpdate}
                  required={!isUpdate}
                >
                  <option value="">Selecione um professor</option>
                  {teachers &&
                    teachers?.map((professor: any, index: number) => (
                      <option key={index} value={professor.name}>
                        {professor.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col w-1/6">
                <label htmlFor="disciplina" className="block font-semibold">
                  Disciplina: <span className="text-red-500">*</span>
                </label>
                <select
                  id="disciplina"
                  name="disciplina"
                  value={formularioAtual.disciplina}
                  onChange={handleFormChange}
                  className="p-2 border border-gray-300 rounded"
                  disabled={isUpdate}
                  required={!isUpdate}
                >
                  <option value="">Selecione uma disciplina</option>
                  {subjects &&
                    subjects?.map((disciplina: any, index: number) => (
                      <option key={index} value={disciplina.name}>
                        {disciplina.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col w-1/6">
                <label htmlFor="nota" className="block font-semibold">
                  Nota: <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="nota"
                  value={formularioAtual.nota}
                  onChange={handleFormChange}
                  className="p-2 border border-gray-300 rounded"
                  placeholder="Nota"
                  required
                />
              </div>
              <div className="flex flex-col w-1/6 mt-6">
                <button
                  onClick={adicionarNota}
                  className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-2 rounded hover:from-blue-700 hover:to-blue-500"
                >
                  Adicionar nota
                </button>
              </div>
            </div>

            <table className="w-full mt-6">
              <thead className="bg-black text-white">
                <tr>
                  <th className="py-2 px-4">Nome</th>
                  <th className="py-2 px-4">Matrícula</th>
                  <th className="py-2 px-4">Bimestre</th>
                  <th className="py-2 px-4">Professor </th>
                  <th className="py-2 px-4">Disciplina</th>
                  <th className="py-2 px-4">Nota</th>
                  <th className="py-2 px-4">Editar</th>
                  <th className="py-2 px-4">Excluir</th>
                </tr>
              </thead>
              <tbody className="bg-gray-500 text-white text-center">
                {currentGrades && currentGrades?.map((grade: any, index: number) => (
                      <tr key={index}>
                        <td className="py-2 px-4">{grade.nome}</td>
                        <td className="py-2 px-4">{grade.matricula}</td>
                        <td className="py-2 px-4">{grade.bimestre}</td>
                        <td className="py-2 px-4">{grade.professor}</td>
                        <td className="py-2 px-4">{grade.disciplina}</td>
                        <td className="py-2 px-4">{grade.nota}</td>
                        <td
                          className="py-2 px-4 pl-14 cursor-pointer"
                          onClick={() => handleEdit(grade)}
                        >
                          <BiEdit />
                        </td>
                        <td
                          className="py-2 px-4 pl-14 cursor-pointer"
                          onClick={() => handleOpenModal(grade)}
                        >
                          <BiTrash />
                        </td>
                      </tr>
                    ))
                  }
              </tbody>
            </table>
            <Pagination
              current={currentPage}
              total={totalPages}
              onPageChange={handlePageChange}
            />
            {isModalOpen && selectedGrade && (
              <ConfirmationModal
                onConfirmDelete={() => handleDelete(selectedGrade?.id ? selectedGrade.id : 0)}
                onCancel={handleCancelDelete}
                entityName={"a nota"}
                text={`${selectedGrade.disciplina} - ${selectedGrade.nota} de ${selectedGrade.nome}`}
              />
            )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default RegisterGrade;
