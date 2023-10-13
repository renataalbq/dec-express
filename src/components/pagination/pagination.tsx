import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface PaginationProps {
    current: number
    total: number
    onPageChange: (page: number) => void
}


const Pagination = (props: PaginationProps) => {

  const handlePreviousPage = () => {
    if (props.current > 1) {
      props.onPageChange(props.current - 1);
    }
  };

  const handleNextPage = () => {
    if (props.current < props.total) {
      props.onPageChange(props.current + 1);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4 gap-6">
      <button className="text-gray-600" onClick={handlePreviousPage}>
        <FaChevronLeft />
      </button>
      <span>Página {props.current} de {props.total}</span>
      <button className="text-gray-600" onClick={handleNextPage}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export { Pagination };