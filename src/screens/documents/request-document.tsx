import { DocumentCard } from '@/components/document-card/document-card';
import { Layout } from '@/components/layout';
import { useState } from 'react';

export function RequestDocument() {
  const [isLoading, setIsLoading] = useState(false);

  const generateDocument = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Layout>
    <div className="">
    <section>
      <h2 className="text-2xl font-semibold">Documentos</h2>
      <div className="flex space-x-4 mt-4">
        <DocumentCard title={'Declaração Acadêmica'} nameButton={isLoading ? 'Salvando..' : 'Salvar em PDF'} onClickButton={generateDocument} />
        <DocumentCard title={'Histórico Acadêmico'} nameButton={'Em breve'} disabled />
        <DocumentCard title={'Boletim Bimestral'} nameButton={'Em breve'} disabled />
      </div>
    </section>
    </div>
    </Layout>
  );
}
