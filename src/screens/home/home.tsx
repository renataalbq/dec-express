import { Header } from "@/components/header/header";
import { Sidebar } from "@/components/sidebar/sidebar";

export function Home() {
    return (
      <>
      <Sidebar />
      <div className="flex-1 ">
        <Header />
        <div className="px-4 space-y-4">
          <div className="ml-4 p-8">
          <section>
              <h2 className="text-2xl font-semibold">Como Usar</h2>
              <div className="flex space-x-4 mt-4">
                <div className="relative">
                    <div className="w-70 h-56 shadow-md p-2 bg-white rounded-lg">
                      <h3 className="text-md font-semibold mb-2">Módulo 1: Turma</h3>
                      <span className="text-slate-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus neque eget fermentum cursus. Sed rhoncus mattis vehicula. Sed ac era.</span>
                    </div>
                    <button className="bg-blue-800 px-3 py-1 rounded-b-lg absolute bottom-0 left-0 right-0 w-full flex items-center justify-center text-white font-bold">
                      <span className="font-bold text-white">Acessar</span>
                    </button>
                  </div>
                  <div className="relative">
                    <div className="w-70 h-56 shadow-md p-2 bg-white rounded-lg">
                      <h3 className="text-md font-semibold mb-2">Módulo 2: Aluno</h3>
                      <span className="text-slate-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus neque eget fermentum cursus. Sed rhoncus mattis vehicula. Sed ac era.</span>
                    </div>
                    <button className="bg-blue-800 px-3 py-1 rounded-b-lg absolute bottom-0 left-0 right-0 w-full flex items-center justify-center text-white font-bold">
                      <span className="font-bold text-white">Acessar</span>
                    </button>
                  </div>
                  <div className="relative">
                    <div className="w-70 h-56 shadow-md p-2 bg-white rounded-lg">
                      <h3 className="text-md font-semibold mb-2">Módulo 3: Documentos</h3>
                      <span className="text-slate-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus neque eget fermentum cursus. Sed rhoncus mattis vehicula. Sed ac era.</span>
                    </div>
                    <button className="bg-blue-800 px-3 py-1 rounded-b-lg absolute bottom-0 left-0 right-0 w-full flex items-center justify-center text-white font-bold">
                      <span className="font-bold text-white">Acessar</span>
                    </button>
                  </div>
                </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold">Sobre a DecExpress</h2>
              <div className="bg-white rounded shadow-md p-4 mt-4">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id justo vel libero congue venenatis.
                  Nunc non justo tincidunt, bibendum eros et, scelerisque libero. Fusce a justo vitae arcu scelerisque fermentum.
                </p>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-semibold">Contato</h2>

              <div className="bg-white rounded shadow-md p-4  mt-4">
                <p>
                  Para entrar em contato com os administradores do sistema, entre em contato com os coordenadores e diretores da escola nos seguintes endereços de e-mail:
                  <br />
                  - Coordenação: coordenacao@escola.com
                  <br />
                  - Direção: direcao@escola.com
                </p>
              </div>
            </section>
          </div>
        </div>
     </div>
    </>
  
    );
  }