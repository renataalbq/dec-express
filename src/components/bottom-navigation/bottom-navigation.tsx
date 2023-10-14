import { IoDocumentTextOutline } from 'react-icons/io5';
import { PiStudentDuotone } from 'react-icons/pi';
import { FaPeopleRoof } from 'react-icons/fa6';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { Link } from 'react-router-dom';

export const BottomNavigation = () => {
    return (
    <div className="fixed bottom-0 z-50 w-full h-16 -translate-x-1/2 bg-white border-t border-gray-200 left-1/2 dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-6 mx-auto">
            <Link to={'/home'}>
                <button data-tooltip-target="tooltip-document" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <RxDashboard />
                    <span className="sr-only">Dashboard</span>
                </button>
            </Link>
            <div id="tooltip-document" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Dashboard
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <Link to={'/list-documents'}>
                <button data-tooltip-target="tooltip-bookmark" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <IoDocumentTextOutline />
                    <span className="sr-only">Documentos</span>
                </button>
            </Link>
            <div id="tooltip-bookmark" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Documentos
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <Link to={'/list-class'}>
                <button data-tooltip-target="tooltip-settings" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <FaPeopleRoof />
                    <span className="sr-only">Turmas</span>
                </button>
            </Link>
            <div id="tooltip-settings" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Turmas
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <Link to={'/list-students'}>
                <button data-tooltip-target="tooltip-profile" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <PiStudentDuotone />
                    <span className="sr-only">Alunos</span>
                </button>
            </Link>
            <div id="tooltip-profile" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Alunos
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <Link to={'/'}>
                <button data-tooltip-target="tooltip-logout" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <RiLogoutBoxLine />
                    <span className="sr-only">Sair</span>
                </button>
            </Link>
            <div id="tooltip-logout" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Sair
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
        </div>
    </div>
    )
}
