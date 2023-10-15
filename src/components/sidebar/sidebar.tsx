import { useLocation } from "react-router-dom"
import { SidebarItem } from "./sidebar-item"
import { IoDocumentTextOutline } from 'react-icons/io5';
import { PiStudentDuotone } from 'react-icons/pi';
import { FaBars, FaPeopleRoof } from 'react-icons/fa6';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { ReactNode, useEffect, useState } from "react";
interface SidebarProps {
  children: ReactNode;
}

const Sidebar = (props: SidebarProps)  => {
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768); 
      };
      handleResize(); 
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
    
    return (
      <div>
      <nav className="bg-white border-b border-gray-200  fixed left-0 right-0 top-0 z-50">
        <div className="lg:w-64 left-0 top-0 pt-3 pb-3 bg-blue-800">
          <div className="flex justify-start items-center ">
          <button
          data-drawer-target="logo-sidebar"
          data-drawer-toggle="logo-sidebar"
          aria-controls="logo-sidebar"
          type="button"
          className="inline-flex items-center p-2 text-sm text-white rounded-lg sm:hidden"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
            <a href="/home" className="flex items-center justify-between mr-4">
              <span className="px-4 text-white self-center text-xl font-semibold ">DecExpress</span>
            </a>
          </div>
        
        </div>
        
      </nav>
  {isMobile ?
      <aside
        className={`fixed top-0 left-0 z-40 ${isOpen ? 'w-64' : 'w-0'} h-screen pt-10 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-slate-800 border-r md:translate-x-0`}
        aria-label="Sidenav"
        id="drawer-navigation"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-slate-800 ">
          
          <ul className="space-y-2">
              <SidebarItem icon={<RxDashboard />} text={'Dashboard'} active={location.pathname === '/home'} link='/home' />
              <SidebarItem icon={<IoDocumentTextOutline />} text={'Documentos'} active={location.pathname.includes('documents')} link='/list-documents' />
              <SidebarItem icon={<FaPeopleRoof />} text={'Turmas'} active={location.pathname.includes('class')} link='/list-class' />
              <SidebarItem icon={<PiStudentDuotone />} text={'Alunos'} active={location.pathname.includes('student')} link='/list-students' />
          </ul>
          <ul
            className="pt-5 mt-5 space-y-2 border-t border-gray-500">
           <SidebarItem icon={<RiLogoutBoxLine />} text={'Sair'} active={false} link='/login' />
          </ul>
        </div>
      </aside>
      :
      <aside
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-10 transition-transform -translate-x-full bg-slate-800 border-r md:translate-x-0"
        aria-label="Sidenav"
        id="drawer-navigation"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-slate-800 ">
          
          <ul className="space-y-2">
              <SidebarItem icon={<RxDashboard />} text={'Dashboard'} active={location.pathname === '/home'} link='/home' />
              <SidebarItem icon={<IoDocumentTextOutline />} text={'Documentos'} active={location.pathname.includes('documents')} link='/list-documents' />
              <SidebarItem icon={<FaPeopleRoof />} text={'Turmas'} active={location.pathname.includes('class')} link='/list-class' />
              <SidebarItem icon={<PiStudentDuotone />} text={'Alunos'} active={location.pathname.includes('student')} link='/list-students' />
          </ul>
          <ul
            className="pt-5 mt-5 space-y-2 border-t border-gray-500">
           <SidebarItem icon={<RiLogoutBoxLine />} text={'Sair'} active={false} link='/login' />
          </ul>
        </div>
      </aside>
    }
      <main className="p-2 md:ml-64 h-auto pt-12 w-auto bg-slate-50">
        <div className="ml-4 p-8">{props.children}</div>
      </main>
    </div>
    );
}


export { Sidebar }