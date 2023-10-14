import { ReactNode } from "react";
import { Sidebar } from "./sidebar/sidebar";

interface LayoutProps {
	children: ReactNode;
}

const Layout = (props: LayoutProps) => {
    return (
      <Sidebar children={props.children} /> 
);
};
  
  export { Layout };