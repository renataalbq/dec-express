import { StudentHome } from "./student-home";
import { AdminHome } from "./admin-home";
import { Layout } from "@/components/layout";
import { isAdmin } from "@/model/IPayload";

export function Home() {
  return <Layout>{isAdmin ? <AdminHome /> : <StudentHome /> }</Layout>;
}
