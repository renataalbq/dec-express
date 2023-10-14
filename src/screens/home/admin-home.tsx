import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { chartData, chartOptions } from "@/components/charts/charts-options";
import BarChart from "@/components/charts/bar-chart";

const AdminHome = () => {
  return (
    <div>
      <section>
        <div className="flex space-x-4 mt-4">
          <div className="w-64 h-52 shadow-md p-2 bg-white rounded-lg flex flex-col">
            <div className=" w-10 h-10 shadow-md p-2 bg-blue-950 rounded-full mb-2">
              <PiStudentFill style={{ color: "white", fontSize: "24px" }} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Total de alunos</h3>
            <div className="mt-8">
              <span className="text-slate-500 text-4xl font-semibold">156</span>
            </div>
          </div>
          <div className="w-64 h-52 shadow-md p-2 bg-white rounded-lg">
            <div className=" w-10 h-10 shadow-md p-2 bg-blue-950 rounded-full mb-2">
              <GiTeacher style={{ color: "white", fontSize: "24px" }} />
            </div>
            <h3 className="text-lg font-semibold mb-4">Total de turmas</h3>
            <div className="mt-10">
              <span className="text-slate-500 text-4xl font-semibold">35</span>
            </div>
          </div>
          <div className="w-64 h-52 shadow-md p-2 bg-white rounded-lg">
            <div className=" w-10 h-10 shadow-md p-2 bg-blue-950 rounded-full mb-2">
              <HiOutlineDocumentDownload
                style={{ color: "white", fontSize: "24px" }}
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Total de solicitações de declaração
            </h3>
            <div className="mt-4">
              <span className="text-slate-500 text-4xl font-semibold">98</span>
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
