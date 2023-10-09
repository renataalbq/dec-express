import { InfoClass } from "@/screens/class/info-class";
import { ListClass } from "@/screens/class/list-class";
import { RegisterClass } from "@/screens/class/register-class";
import { ListDocuments } from "@/screens/documents/list-documents";
import { Home } from "@/screens/home/home";
import { ListStudents } from "@/screens/students/list-students";
import { RegisterStudent } from "@/screens/students/register-student";
import { createBrowserRouter } from "react-router-dom";
import {DetailStudents} from "@/screens/students/detail-students.tsx";

export const AdminRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/list-students",
    element: <ListStudents />,
  },
  {
    path: "/register-student",
    element: <RegisterStudent />,
  },
  {
    path: "/detail-students/:alunoId",
    element: <DetailStudents />,
  },
  {
    path: "/list-class",
    element: <ListClass />,
  },
  {
    path: "/register-class",
    element: <RegisterClass />,
  },
  {
    path: "/info-class/:turmaId",
    element: <InfoClass />,
  },
  {
    path: "/list-documents",
    element: <ListDocuments />,
  },
  {
    path: "/list-students",
    element: <ListStudents />,
  },
  {
    path: "*",
    element: <Home />,
  },
]);