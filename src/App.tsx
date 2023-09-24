import { Sidebar } from "./components/sidebar";
import { SidebarItem } from "./components/sidebar-item";

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
    <main className="flex-1 flex gap-6">
      <Sidebar>
       <SidebarItem icon={undefined} text={'Documentos'} active={false} />
       <SidebarItem icon={undefined} text={'Turmas'} active={true} />
       <SidebarItem icon={undefined} text={'Alunos'} active={false} />
       <SidebarItem icon={undefined} text={'Sair'} active={false} />
      </Sidebar>
    
    </main>
  </div>
  )
}

