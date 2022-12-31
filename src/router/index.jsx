import { Suspense, lazy } from "react";
import Authenticated from "src/components/Authenticated";

import ExtendedSidebarLayout from "src/layouts/ExtendedSidebarLayout";

// import dashboardsRoutes from "./dashboards";
// import blocksRoutes from "./blocks";
// import applicationsRoutes from "./applications";
// import managementRoutes from "./management";
// ve ai macho
import accountRoutes from "./account";
import crmRoutes from "./crm";
import creditRoutes from "./credit";
import listTasksRoutes from "./taskManagement";
import SuspenseLoader from "src/components/SuspenseLoader";
import AdministrativePanel from "./AdministrativePanel";
import Report from "./reports";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const Status404 = Loader(
  lazy(() => import("src/content/pages/Status/Status404"))
);

const AppPlayStore = Loader(
  lazy(() => import("src/content/pages/Status/AppPlayStore"))
);

const Support = Loader(lazy(() => import("src/content/pages/Support")));

const router = [
  {
    path: "",
    children: accountRoutes,
  },
  {
    path: "app",
    element: (
      <Authenticated>
        <ExtendedSidebarLayout />
      </Authenticated>
    ),
    children: [
      {
        path: "",
        element: <AppPlayStore />,
        // children: dashboardsRoutes,
      },
      {
        path: "crm",
        children: crmRoutes,
      },
      {
        path: "credit",
        children: creditRoutes,
      },
      {
        path: "tarefas",
        children: listTasksRoutes,
      },
      {
        path: "usuarios",
        children: AdministrativePanel,
      },
      {
        path: "reports",
        children: Report,
      },
    ],
  },
  {
    path: "*",
    element: <Status404 />,
  },
  {
    path: "support",
    element: <Support />,
  },
];

export default router;
