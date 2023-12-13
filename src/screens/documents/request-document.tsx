import { DocumentCard } from '@/components/document-card/document-card';
import { Layout } from '@/components/layout';
import { AlertMessage, AlertMessageProps } from '@/components/message/message';
import { ModalOptions } from '@/components/modal-options/modal-options';
import useGetGrades from '@/hooks/grades/use-get-grades';
import useGetStudentByEmail from '@/hooks/students/use-find-by-email';
import { IDocuments } from '@/model/IDocuments';
import { useAuth } from '@/store/auth.context';
import { useState } from 'react';

export function RequestDocument() {
  const [showModal, setShowModal] = useState(false);
  const [documentId, setDocumentId] = useState(null);
  const { email } = useAuth();
  const { student } = useGetStudentByEmail(email)
  const [alertMessage, setAlertMessage] = useState<AlertMessageProps>({ type: "success", message: "" });
  const [documentType, setDocumentType] = useState('');
  const {grades} = useGetGrades(student?.email || '');

  const formatDate = (date: string | number | Date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  
    return [day, month, year].join('/');
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const gradeIds = grades?.map(grade => grade.id);

  const createDocument = async (type: string) => {
    const dataAtual = new Date();
    const dataValidade = new Date(dataAtual);
    dataValidade.setMonth(dataValidade.getMonth() + 4);
    setDocumentType(type);
    console.log(documentId)

    const requestBody: IDocuments = {
      data_solicitacao: formatDate(dataAtual), 
      data_validade: formatDate(dataValidade), 
      tipo: type,
      matricula: student?.matricula,
      cpf: student?.cpf ? student.cpf : '',
      nome_aluno: student?.nome,
      email_aluno: student?.email,
      grade_ids: gradeIds,
    }

    try {
      const response = await fetch('http://localhost:3000/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      console.log(requestBody)

      if (response.ok) {
        console.log(data)
        setDocumentId(data.document.id);
        setTimeout(() => {
            handleOpenModal();
        }, 1000);
      } else {
        console.error("Erro ao criar documento:", data);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const downloadPdf = () => {
    if (documentType === 'declaracao') {
      window.open(`http://localhost:3000/documents/${documentId}/download`, '_blank');
    } else {
      window.open(`http://localhost:3000/documents/${documentId}/download_hist`, '_blank');
    }
    setAlertMessage({ type: "success", message: "Download iniciado com sucesso!" });
    handleCloseModal();
  };

  const sendEmail = async () => {
    if (documentId) {
      try {
        const response = await fetch(`http://localhost:3000/documents/${documentId}/send_email`, {
          method: 'GET',
        });
        
        const data = await response.json();
        if (response.ok) {
          setAlertMessage({ type: "success", message: "E-mail enviado com sucesso!" });
          handleCloseModal();
        } else {
          setAlertMessage({ type: "error", message: "Erro ao enviar e-mail" });
          console.error("Erro ao enviar e-mail:", data);
        }
      } catch (error) {
        console.error('Erro ao enviar o email:', error);
      }
    }
  };

  const sendEmailHist = async () => {
    if (documentId) {
      try {
        const response = await fetch(`http://localhost:3000/documents/${documentId}/send_email_hist`, {
          method: 'GET',
        });
        
        const data = await response.json();
        if (response.ok) {
          setAlertMessage({ type: "success", message: "E-mail enviado com sucesso!" });
          handleCloseModal();
        } else {
          setAlertMessage({ type: "error", message: "Erro ao enviar e-mail" });
          console.error("Erro ao enviar e-mail:", data);
        }
      } catch (error) {
        console.error('Erro ao enviar o email:', error);
      }
    }
  };

  return (
    <Layout>
    <div className="">
    <section>
      <h2 className="text-2xl font-semibold">Documentos</h2>
      {showModal && (
        <ModalOptions
          onDownload={downloadPdf}
          onCancel={handleCloseModal}
          onSendEmail={documentType === 'declaracao' ? sendEmail : sendEmailHist}
          loadingMessage={documentType === 'declaracao' ? 'Declaração' : 'Histórico'}
        />
      )}
    {alertMessage.message && (
        <AlertMessage type={alertMessage.type} message={alertMessage.message} />
      )}
      <div className="flex space-x-4 mt-4">
        <DocumentCard title={'Declaração Acadêmica'} nameButton={'Gerar Declaração'} onClickButton={() => createDocument('declaracao')} />
        <DocumentCard title={'Histórico Acadêmico'} nameButton={'Gerar Histórico'} onClickButton={() => createDocument('historico')} />
        <DocumentCard title={'Boletim Bimestral'} nameButton={'Indisponível'} disabled />
      </div>
    </section>
    </div>
    </Layout>
  );
}
