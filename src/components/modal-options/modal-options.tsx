import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";

interface ModalOptionsProps {
  onDownload: () => void;
  onSendEmail: () => void;
  onCancel: () => void;
  loadingMessage: string;
}

const ModalOptions = (props: ModalOptionsProps) => {
  const [showLoader, setShowLoader] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
      setShowSuccess(true);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []); 
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50 z-40 pointer-events-none"></div>
      <div className="bg-white p-6 rounded shadow-md w-1/3 py-16 relative z-50">
        <button
          onClick={props.onCancel}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose />
        </button>
        {showLoader && (
          <div className="text-center">
            <div className="loader">
              <BiLoaderAlt className="text-gray-500 mx-auto text-6xl spin" />
              </div> 
            <p className="text-lg font-semibold mt-2">Gerando {props.loadingMessage}...</p>
          </div>
        )}
        {showSuccess && (
          <div className="text-center">
            <FaCheckCircle className="text-green-500 mx-auto text-6xl"/>
            <p className="text-lg font-semibold mt-4 mb-4">Seu documento foi gerado com sucesso!</p>
            <div className="flex justify-center mt-10">
              <button onClick={props.onSendEmail}
                className="mr-4 bg-gradient-to-r from-cyan-700 to-cyan-900 text-white px-4 py-2 rounded hover:from-cyan-900 hover:to-cyan-700"
              >
                Enviar por email
              </button>
              <button onClick={props.onDownload}
                className="bg-gradient-to-r from-sky-700 to-sky-900 text-white px-4 py-2 rounded hover:from-sky-900 hover:to-sky-700"
              >
                Download
              </button>
            </div>
          </div>
        )}
       
      </div>
    </div>
  );
};

export { ModalOptions };
