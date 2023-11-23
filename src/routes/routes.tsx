import { RouterProvider } from "react-router-dom";
import { AdminRoutes } from "./admin-routes";
import { StudentRoutes } from "./student-routes";
import { useAuth } from "@/store/auth.context";

export const AppRoutes = (): JSX.Element => {
  const { isAdmin } = useAuth();

  return <RouterProvider router={isAdmin ? AdminRoutes : StudentRoutes} />;
};