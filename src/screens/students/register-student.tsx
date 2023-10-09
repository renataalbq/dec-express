import { Layout } from "@/components/layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function RegisterStudent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: "",
        dataNascimento: "",
        endereco: "",
        telefone: "",
        email: "",
        matricula: "",
        turma: "",

    });

    const handleInputChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSaveStudents = () => {
        navigate("/list-students");
    };

    return (
        <Layout>
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-semibold">Cadastrar novo aluno</h1>
                <button
                    onClick={handleSaveStudents}
                    className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-2 rounded hover:from-blue-800 hover:to-blue-500"
                >
                    Salvar aluno
                </button>
            </div>
            <div className="bg-white p-6 shadow-md">
                <form className="space-y-4">
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="nome" className="block font-semibold">
                                Nome do aluno:
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
                                Data de nascimento:
                            </label>
                            <input
                                type="date"
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
                            <label htmlFor="endereco" className="block font-semibold">
                                Endereço:
                            </label>
                            <input
                                type="text"
                                id="endereco"
                                name="endereco"
                                value={formData.endereco}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                                placeholder="Endereco"
                                required
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="telefone" className="block font-semibold">
                                Telefone:
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
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                                placeholder="Email"
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
                            />
                        </div>
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
                                placeholder="Turma"
                            />
                        </div>
                    </div>
                    <div></div>
                </form>
            </div>
        </Layout>
    );
}
