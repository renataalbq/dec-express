import { ReactNode } from "react"

interface SidebarProps {
    children: ReactNode
}

const Sidebar = (props: SidebarProps)  => {
    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-black border-r shadow-sm">
                <div className="p-4 flex justify-between items-center bg-blue-800">
                    <h1 className="text-white">DecExpress</h1>
                </div>
                <ul className="flex-1">{props.children}</ul>
            </nav>
        </aside>
    )
}


export { Sidebar }