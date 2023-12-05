import { Login } from "@/screens/auth/login";
import { SignUp } from "@/screens/auth/signup";
import { Home } from "@/screens/home/home";
import { createBrowserRouter } from "react-router-dom";
import { StudentProfile } from "@/screens/students/student-profile";
import { StudentClass } from "@/screens/class/student-class";
import { RequestDocument } from "@/screens/documents/request-document";
import { EditProfile } from "@/screens/students/edit-profile";

export const StudentRoutes = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/student-profile",
    element: <StudentProfile />,
  },
  {
    path: "/student-class",
    element: <StudentClass />,
  },
  {
    path: "/edit-profile/:alunoId",
    element: <EditProfile />,
  },
  {
    path: "/request-document",
    element: <RequestDocument />,
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
  {
    path: "/login#",
    element: <Login />,
  },
]);