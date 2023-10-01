import { Layout } from "@/components/layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function RegisterClass() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ano: "",
    serie: "",
    nivel: "",
    turma: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveClass = () => {
    navigate("/list-class");
  };

  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold">Cadastrar nova turma</h1>
        <button
          onClick={handleSaveClass}
          className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-2 rounded hover:from-blue-800 hover:to-blue-500"
        >
          Salvar turma
        </button>
      </div>
      <div className="bg-white p-6 shadow-md">
        <form className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="ano" className="block font-semibold">
                Ano:
              </label>
              <input
                type="text"
                id="ano"
                name="ano"
                value={formData.ano}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Ex: 2023"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="serie" className="block font-semibold">
                Série:
              </label>
              <input
                type="text"
                id="serie"
                name="serie"
                value={formData.serie}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Ex: 5º"
                required
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="turma" className="block font-semibold">
                Turma:
              </label>
              <input
                type="text"
                id="turma"
                name="turma"
                value={formData.turma}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Ex: A"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="nivel" className="block font-semibold">
                Nível:
              </label>
              <select
                id="nivel"
                name="nivel"
                value={formData.nivel}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              >
                <option value="">Selecionar nível</option>
                <option value="fundamental1">Ensino Fundamental I</option>
                <option value="fundamental2">Ensino Fundamental II</option>
                <option value="medio">Ensino Médio</option>
              </select>
            </div>
          </div>
          <div></div>
        </form>
      </div>
    </Layout>
  );
}
