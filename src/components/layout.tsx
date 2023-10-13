import { ReactNode } from "react";
import Header from "./header/header";
import { Sidebar } from "./sidebar/sidebar";

interface LayoutProps {
	children: ReactNode;
}

const Layout = (props: LayoutProps) => (
    <>
        <Sidebar />
        <div className="w-full ml-56 bg-slate-50">
            <Header />
            <div className="p-2 overflow-y-auto">
                <div className="ml-4 p-8">{props.children}</div>
            </div>
        </div>
    </>
);  
  
  export { Layout };