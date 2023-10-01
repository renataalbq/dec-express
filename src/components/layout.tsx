import { ReactNode } from "react";
import { Header } from "./header/header";
import { Sidebar } from "./sidebar/sidebar";

interface LayoutProps {
	children: ReactNode;
}

const Layout = (props: LayoutProps) => (
    <>
        <Sidebar />
        <div className="flex-1">
            <Header />
            <div className="p-2 space-y-4">
                <div className="ml-4 p-8">{props.children}</div>
            </div>
        </div>
    </>
);
  
  export { Layout };