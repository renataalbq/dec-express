import { Layout } from '@/components/layout';
import { useState } from 'react';

interface Nota {
    professor: string;
    disciplina: string;
    nota: string;
}

const RegisterGrade = () => {
    const [notas, setNotas] = useState<Nota[]>([]);
  const [formularioAtual, setFormularioAtual] = useState({
    professor: '',
    disciplina: '',
    nota: ''
  });
  const [disciplinasDisponiveis, setDisciplinasDisponiveis] = useState(['Matemática', 'Português', 'Ciências', 'História']); 
  const [professores, setProfessores] = useState(['João Silva', 'Bruna', 'Rafael', 'Matheus', 'Lucas', 'Larissa']);

  const handleFormChange = (e: { target: { name: any; value: any; }; }) => {
    setFormularioAtual({ ...formularioAtual, [e.target.name]: e.target.value });
  };

  const adicionarNota = () => {
    setNotas([...notas, formularioAtual]);
    setFormularioAtual({ ...formularioAtual, disciplina: '', nota: '', professor: '' });
    setDisciplinasDisponiveis(disciplinasDisponiveis.filter(d => d !== formularioAtual.disciplina));
    setProfessores(professores.filter(d => d !== formularioAtual.professor));

  };

  const salvarNotas = () => {
    console.log('Notas salvas:', notas);
  };

  return (
    <Layout>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold">Registro de Notas</h1>
      <div className="flex flex-wrap gap-4 mb-4 items-center mt-6 bg-white p-6 shadow-md">
      <select
          name="professor"
          value={formularioAtual.professor}
          onChange={handleFormChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Selecione um professor</option>
          {professores.map(professor => (
            <option key={professor} value={professor}>{professor}</option>
          ))}
        </select>
        <select
          name="disciplina"
          value={formularioAtual.disciplina}
          onChange={handleFormChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Selecione uma disciplina</option>
          {disciplinasDisponiveis.map(disciplina => (
            <option key={disciplina} value={disciplina}>{disciplina}</option>
          ))}
        </select>
        <input
          type="number"
          name="nota"
          value={formularioAtual.nota}
          onChange={handleFormChange}
          className="p-2 border border-gray-300 rounded"
          placeholder="Nota"
        />
        <button
          onClick={adicionarNota}
          className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-2 rounded hover:from-blue-700 hover:to-blue-500">
          Adicionar nova nota
        </button>
      </div>
      <div>
        <button
          onClick={salvarNotas}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          Salvar
        </button>
      </div>

      {notas.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Notas Adicionadas</h2>
          <ul>
            {notas.map((nota, index) => (
              <li key={index} className="mb-2">
                Professor: {nota.professor}, Disciplina: {nota.disciplina}, Nota: {nota.nota}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default RegisterGrade;
