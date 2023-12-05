import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { chartData, chartOptions } from "@/components/charts/charts-options";
import BarChart from "@/components/charts/bar-chart";
import useGetAllStudents from "@/hooks/students/use-get-students";
import useGetAllClasses from "@/hooks/class/use-get-classes";
import useGetDocumentsList from "@/hooks/documents/use-get-documents";

const AdminHome = () => {
  const {students} = useGetAllStudents();
  const {classes} = useGetAllClasses();
  const {documents} = useGetDocumentsList(1)

  return (
    <div>
      <section>
      <div className="flex flex-wrap gap-4 mt-4">
        <div className="w-full md:w-64 h-52 shadow-md p-2 bg-white rounded-lg flex flex-col mb-4 md:mb-0">
            <div className="w-10 h-10 shadow-md p-2 bg-blue-950 rounded-full mb-2">
              <PiStudentFill style={{ color: "white", fontSize: "24px" }} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Total de alunos</h3>
            <div className="mt-8">
              <span className="text-slate-500 text-4xl font-semibold">{students?.length}</span>
            </div>
          </div>
          <div className="w-full md:w-64 h-52 shadow-md p-2 bg-white rounded-lg flex flex-col mb-4 md:mb-0">
            <div className=" w-10 h-10 shadow-md p-2 bg-blue-950 rounded-full mb-2">
              <GiTeacher style={{ color: "white", fontSize: "24px" }} />
            </div>
            <h3 className="text-lg font-semibold mb-4">Total de turmas</h3>
            <div className="mt-8">
              <span className="text-slate-500 text-4xl font-semibold">{classes?.length}</span>
            </div>
          </div>
          <div className="w-full md:w-64 h-52 shadow-md p-2 bg-white rounded-lg flex flex-col mb-4 md:mb-0">
            <div className=" w-10 h-10 shadow-md p-2 bg-blue-950 rounded-full mb-2">
              <HiOutlineDocumentDownload
                style={{ color: "white", fontSize: "24px" }}
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Total de declarações
            </h3>
            <div className="mt-8">
              <span className="text-slate-500 text-4xl font-semibold">{documents?.length}</span>
            </div>
          </div>
          <div className="w-full md:w-64 h-52 shadow-md p-2 bg-white rounded-lg flex flex-col mb-4 md:mb-0">
            <div className=" w-10 h-10 shadow-md p-2 bg-blue-950 rounded-full mb-2">
              <HiOutlineDocumentDownload
                style={{ color: "white", fontSize: "24px" }}
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Total de históricos
            </h3>
            <div className="mt-8">
              <span className="text-slate-500 text-4xl font-semibold">{documents?.length}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-white rounded shadow-md p-4 mt-4">
          <h3 className="text-lg font-semibold mb-2">
            Total de alunos por turma
          </h3>
          <BarChart chartData={chartData} chartOptions={chartOptions} />
        </div>
      </section>
    </div>
  );
};

export { AdminHome };
