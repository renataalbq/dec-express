interface DocumentCardProps {
    title?: string
    onClickButton?: () => void;
    nameButton: string;
    disabled?: boolean;
}

const DocumentCard = (props: DocumentCardProps) => (
    <div className="relative">
          <div className={`w-72 h-52 justify-center shadow-md p-2 ${props.disabled ? "bg-gray-300" : "bg-white"} rounded-lg`}>
            <h3 className={`text-center text-2xl font-semibold mt-14 ${props.disabled ? "text-gray-500" : "text-black"}`}>{props.title}</h3>
          </div>
          <button onClick={props.onClickButton} className={`${props.disabled ? "bg-gray-600" : "bg-blue-800"} px-3 py-3 rounded-b-lg absolute bottom-0 left-0 right-0 w-full flex items-center justify-center text-white font-bold`}>
            <span className="font-bold text-white">{props.nameButton}</span>
          </button>
    </div>
  );
  
  export { DocumentCard };