import { Link, useLocation } from "react-router-dom"
import { SidebarItem } from "./sidebar-item"
import { IoDocumentTextOutline } from 'react-icons/io5';
import { PiStudentDuotone } from 'react-icons/pi';
import { FaPeopleRoof } from 'react-icons/fa6';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';

const Sidebar = ()  => {
    const location = useLocation()
    return (
        <div className="fixed top-0 left-0 h-screen flex flex-col">
            <aside className="h-screen">
                <nav className="h-full flex flex-col bg-slate-800 border-r shadow-sm">
                    <div className="p-4 flex justify-between items-center bg-blue-800">
                        <Link to={'/home'}>
                            <h1 className="text-white">DecExpress</h1>
                        </Link>

                    </div>
                    <ul className="flex-1">
                        <SidebarItem icon={<RxDashboard />} text={'Dashboard'} active={location.pathname == '/home' ? true : false} link='/home' />
                        <SidebarItem icon={<IoDocumentTextOutline />} text={'Documentos'} active={location.pathname.includes('documents') ? true : false} link='/list-documents' />
                        <SidebarItem icon={<FaPeopleRoof />} text={'Turmas'} active={location.pathname.includes('class') ? true : false} link='/list-class' />
                        <SidebarItem icon={<PiStudentDuotone />} text={'Alunos'} active={location.pathname.includes('student') ? true : false} link='/list-students' />
                        <div className=" bg-slate-700 h-0.5 my-4" />
                        <SidebarItem icon={<RiLogoutBoxLine />} text={'Sair'} active={false} link='/' />
                    </ul>
                </nav>
            </aside>
        </div>
    )
}


export { Sidebar }