import { StudentHome } from "./student-home";
import { AdminHome } from "./admin-home";
import { Layout } from "@/components/layout";
import { useAuth } from "@/store/auth.context";

export function Home() {
  const { isAdmin } = useAuth();
  return <Layout>{isAdmin ? <AdminHome /> : <StudentHome /> }</Layout>;
}
