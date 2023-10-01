import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface PaginationProps {
    current: number
    total: number
}


const Pagination = (props: PaginationProps) => (
    <div className="flex justify-center items-center mt-4 gap-6">
    <button className="text-gray-600">
        <FaChevronLeft />
    </button>
    <span>Página {props.current} de {props.total}</span>
    <button className="text-gray-600">
      <FaChevronRight />
    </button>
  </div>
  );
  
  export { Pagination };