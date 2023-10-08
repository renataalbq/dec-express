import { Login } from "@/screens/auth/login";
import { SignUp } from "@/screens/auth/signup";
import { InfoClass } from "@/screens/class/info-class";
import { ListClass } from "@/screens/class/list-class";
import { RegisterClass } from "@/screens/class/register-class";
import { ListDocuments } from "@/screens/documents/list-documents";
import { Home } from "@/screens/home/home";
import { ListStudents } from "@/screens/students/list-students";
import { RegisterStudent } from "@/screens/students/register-student";
import { createBrowserRouter } from "react-router-dom";

export const AdminRoutes = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/register-students",
    element: <RegisterStudent />,
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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Login />,
  },
]);