import { useLocation } from "react-router-dom"
import { SidebarItem } from "./sidebar-item"

const Sidebar = ()  => {
    const location = useLocation()
    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-slate-800 border-r shadow-sm">
                <div className="p-4 flex justify-between items-center bg-blue-800">
                    <h1 className="text-white">DecExpress</h1>
                </div>
                <ul className="flex-1">
                    <SidebarItem icon={undefined} text={'Documentos'} active={location.pathname == '/' ? true : false} link='/' />
                    <SidebarItem icon={undefined} text={'Turmas'} active={location.pathname == '/list-class' ? true : false} link='/list-class' />
                    <SidebarItem icon={undefined} text={'Alunos'} active={location.pathname == '/register-student' ? true : false} link='/register-student' />
                    <SidebarItem icon={undefined} text={'Sair'} active={false} link='/' />
                </ul>
            </nav>
        </aside>
    )
}


export { Sidebar }