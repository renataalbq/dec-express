import { ListClass } from "@/screens/class/list-class";
import { RegisterClass } from "@/screens/class/register-class";
import { Home } from "@/screens/home/home";
import { RegisterStudent } from "@/screens/students/register-student";
import { createBrowserRouter } from "react-router-dom";

export const AdminRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register-student",
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
    path: "*",
    element: <Home />,
  },
]);