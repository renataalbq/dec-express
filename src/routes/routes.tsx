import { RouterProvider } from "react-router-dom";
import { AdminRoutes } from "./admin-routes";

export const AppRoutes = (): JSX.Element => {
  return <RouterProvider router={AdminRoutes} />;
};