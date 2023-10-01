import {AiOutlineClose} from "react-icons/ai"
 
interface ConfirmationModalProps {
  text: string;
  entityName: string;
  onConfirmDelete: () => void;
  onCancel: () => void;
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 ml-64">
        <div className="fixed inset-0 bg-black opacity-50 z-40 pointer-events-none"></div>
        <div className="bg-white p-6 rounded shadow-md w-96/12 py-16 relative z-50">
          <button
            onClick={props.onCancel}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <AiOutlineClose />
          </button>
          <p className="text-lg font-semibold mb-4">
            Tem certeza que deseja deletar {props.entityName}{" "}
            <span className="text-blue-700">
                {props.text}
            </span>
            ?
            </p>
          <p className="text-sm text-center text-gray-500 mb-4">
            Tenha cuidado! Ao confirmar, essa ação será irreversível.
          </p>
          <div className="flex justify-center mt-10">
          <button onClick={props.onCancel}
            className="bg-transparent border border-black text-black px-4 py-2 rounded hover:bg-black hover:text-white hover:border-transparent mr-2"
            >
            Cancelar
            </button>

            <button onClick={props.onConfirmDelete}
              className="bg-gradient-to-r from-red-500 to-red-800 text-white px-4 py-2 rounded hover:from-red-800 hover:to-red-500"
            >
              Deletar
            </button>
          </div>
        </div>
      </div>
    );
};

export { ConfirmationModal };