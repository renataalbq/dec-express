import { StudentHome } from "./student-home";
import { AdminHome } from "./admin-home";
import { Layout } from "@/components/layout";

export function Home() {
  const isAdmin = true
  return <Layout>{!isAdmin ? <StudentHome /> : <AdminHome />}</Layout>;
}
