import { createBrowserRouter } from "react-router-dom";

import ProjectManagementDnD from "./Modules/ProjectManagement/pages/ProjectManagementDnD";

export const routers = createBrowserRouter([
  {
    path: "/",
    // element: <ProtectedRoute children={<ForgotPassword />} />,
    element: <ProjectManagementDnD />,
  },
]);
