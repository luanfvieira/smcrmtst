import { Suspense, lazy } from "react";

import SuspenseLoader from "src/components/SuspenseLoader";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const Dashboard = Loader(lazy(() => import("src/content/crm/Dashboard")));

const Indicate = Loader(lazy(() => import("src/content/crm/Indicate")));
const CaptureReactivation = Loader(
  lazy(() => import("src/content/crm/CaptureReactivation"))
);
const MyLeads = Loader(lazy(() => import("src/content/crm/MyLeads")));
const ManagerLeads = Loader(lazy(() => import("src/content/crm/ManagerLeads")));
const DetailsIndicate = Loader(
  lazy(() => import("src/content/crm/DetailsIndicate"))
);

const crmRoutes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "indicate",
    element: <Indicate />,
  },
  {
    path: "indicate/:id/details",
    element: <DetailsIndicate />,
  },
  {
    path: "myLeads",
    element: <MyLeads />,
  },
  {
    path: "managerLeads",
    element: <ManagerLeads />,
  },
  {
    path: "captureReactivation",
    element: <CaptureReactivation />,
  },
];

export default crmRoutes;
