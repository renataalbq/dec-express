import { DocumentCard } from '@/components/document-card/document-card';
import { Layout } from '@/components/layout';
import { useState } from 'react';

export function RequestDocument() {
  const [isLoading, setIsLoading] = useState(false);
  const [documentId, setDocumentId] = useState(null);

  const createDocument = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        data_solicitacao: Date.now(), 
        data_validade: "2024-01-01", 
        tipo: "declaracao",
        matricula: "12345",
        cpf: "74185296332",
        nome_aluno: "João Silva" }),
      });
      console.log(response)
    } catch (error) {
      console.log('caiu')
    }
    setIsLoading(false);
  };

  return (
    <Layout>
    <div className="">
    <section>
      <h2 className="text-2xl font-semibold">Documentos</h2>
      <div className="flex space-x-4 mt-4">
        <DocumentCard title={'Declaração Acadêmica'} nameButton={isLoading ? 'Gerando...' : 'Gerar declaração'} onClickButton={createDocument} />
        <DocumentCard title={'Histórico Acadêmico'} nameButton={'Em breve'} disabled />
        <DocumentCard title={'Boletim Bimestral'} nameButton={'Em breve'} disabled />
      </div>
    </section>
    </div>
    </Layout>
  );
}
