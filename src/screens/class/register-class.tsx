import { Sidebar } from "@/components/sidebar";
import { useState } from "react";

export function RegisterClass() {
  const [formData, setFormData] = useState({
    ano: '',
    serie: '',
    nivel: '',
    disciplina: '',
    professor: '',
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <main className="flex-1 flex gap-6">
      <Sidebar />
      <div className="p-4 space-y-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Cadastrar nova turma</h1>
          <button
            onClick={() => {}}
            className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-2 rounded hover:from-blue-800 hover:to-blue-500"
          >
            Salvar turma
          </button>
        </div>
   
      <form className="space-y-4">
      <div className="flex space-x-4">
        <div>
          <label htmlFor="ano" className="block font-semibold">Ano:</label>
          <input
            type="text"
            id="ano"
            name="ano"
            value={formData.ano}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="serie" className="block font-semibold">Série:</label>
          <input
            type="text"
            id="serie"
            name="serie"
            value={formData.serie}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="nivel" className="block font-semibold">Nível:</label>
          <input
            type="text"
            id="nivel"
            name="nivel"
            value={formData.nivel}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <div>
          <label htmlFor="disciplina" className="block font-semibold">Disciplina:</label>
          <select
            id="disciplina"
            name="disciplina"
            value={formData.disciplina}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          >
            <option value="">Selecione uma disciplina</option>
            <option value="matematica">Matemática</option>
            <option value="portugues">Português</option>
            <option value="historia">História</option>
          </select>
        </div>
        <div>
          <label htmlFor="professor" className="block font-semibold">Professor:</label>
          <select
            id="professor"
            name="professor"
            value={formData.professor}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          >
            <option value="">Selecione um professor</option>
            <option value="joao">João</option>
            <option value="maria">Maria</option>
            <option value="carlos">Carlos</option>
          </select>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded focus:outline-none"
        >
          Adicionar disciplina
        </button>
      </div>
    </form>
    </div>
    </main>
  );
}