import { Header } from "@/components/header/header";
import { Sidebar } from "@/components/sidebar/sidebar";
import { StudentHome } from "./student-home";
import { useState } from "react";
import { AdminHome } from "./admin-home";
import { Layout } from "@/components/layout";

export function Home() {
  const [isAdmin, setIsAdmin] = useState(true);
  return <Layout>{isAdmin == false ? <StudentHome /> : <AdminHome />}</Layout>;
}
