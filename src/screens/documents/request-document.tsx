import { DocumentCard } from '@/components/document-card/document-card';
import { Layout } from '@/components/layout';
import { AlertMessage, AlertMessageProps } from '@/components/message/message';
import { ModalOptions } from '@/components/modals/modal-options';
import useGetGrades from '@/hooks/grades/use-get-grades';
import useGetStudentByEmail from '@/hooks/students/use-find-by-email';
import { useServerAvailable } from '@/hooks/use-server-available';
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
  const serverOn = useServerAvailable("http://localhost:3000/documents");
  const [hasGrades, setHasGrades] = useState<Boolean>(false)
  const [loading, setLoading] = useState<Boolean>(false)

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
      setLoading(true)
      const data = await response.json();
      if (data.grade_ids.length === 0){
        setHasGrades(false)
      }
      else {
        setHasGrades(true)
      }
      if (response.ok) {
        setLoading(false)
        setDocumentId(data.document.id);
        setTimeout(() => {
            handleOpenModal();
        }, 1000);
      } else {
        console.error("Erro ao criar documento:", data);
        if (data.cpf){
          setAlertMessage({type: "error", message: 'Aluno sem CPF. Entre em contato com a coordenação para ajuste no cadastro.'})
        }
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const downloadPdf = () => {
    if (documentType === 'declaracao') {
      window.open(`http://localhost:3000/documents/${documentId}/download`, '_blank');
      setAlertMessage({ type: "success", message: "Download iniciado com sucesso!" });
    } else {
        window.open(`http://localhost:3000/documents/${documentId}/download_hist`, '_blank');
        setAlertMessage({ type: "success", message: "Download iniciado com sucesso!" });
      }
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
          text={documentType === 'declaracao' ? 'Declaração gerada com sucesso!' : 'Histórico gerado com sucesso!'}
          alert={!hasGrades ? 'Suas notas não foram carregadas, tente novamente ou prossiga assim se preferir.' : '' }
        />
      )}
    {alertMessage.message && (
        <AlertMessage type={alertMessage.type} message={alertMessage.message} />
      )}
      <div className="flex space-x-4 mt-4">
        <DocumentCard title={'Declaração Acadêmica'} nameButton={!serverOn ? 'Indisponível' : 'Gerar Declaração'} onClickButton={() => createDocument('declaracao')} disabled={!serverOn} />
        <DocumentCard title={'Histórico Acadêmico'} nameButton={!serverOn ? 'Indisponível' : loading ? 'Carregando' : 'Gerar Histórico'} onClickButton={() => createDocument('historico')} disabled={!serverOn} />
        <DocumentCard title={'Boletim Bimestral'} nameButton={'Indisponível'} disabled />
      </div>
    </section>
    </div>
    </Layout>
  );
}
