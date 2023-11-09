import { RouterProvider } from "react-router-dom";
import { AdminRoutes } from "./admin-routes";
import { StudentRoutes } from "./student-routes";
import { isAdmin } from "@/model/IPayload";

export const AppRoutes = (): JSX.Element => {
  return <RouterProvider router={isAdmin ? AdminRoutes : StudentRoutes} />;
};