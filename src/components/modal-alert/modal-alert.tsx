 interface ModalAlertProps {
  text: string;
  onConfirm: () => void;
}

const ModalAlert = (props: ModalAlertProps) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50 z-40 pointer-events-none"></div>
        <div className="bg-white p-6 rounded shadow-md w-96/12 py-16 relative z-50">
          <p className="text-lg mb-4"> {props.text} </p>
          <div className="flex justify-center mt-10">
          <button onClick={props.onConfirm}
            className="bg-transparent border border-red-500 text-red px-4 py-2 rounded hover:bg-red-500 hover:text-white hover:border-transparent mr-2"
            >
            Voltar
            </button>
          </div>
        </div>
      </div>
    );
};

export { ModalAlert };