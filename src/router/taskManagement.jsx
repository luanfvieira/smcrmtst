import { Suspense, lazy } from "react";

import SuspenseLoader from "src/components/SuspenseLoader";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const MyTasks = Loader(lazy(() => import("src/content/taskManager/Tasks")));

const Dashboard = Loader(
  lazy(() => import("src/content/taskManager/Dashboard"))
);

const crmRoutes = [
  {
    path: "myTasks",
    element: <MyTasks />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
];

export default crmRoutes;
