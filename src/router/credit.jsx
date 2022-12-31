import { Suspense, lazy } from "react";

import SuspenseLoader from "src/components/SuspenseLoader";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const ListLeads = Loader(lazy(() => import("src/content/credit/ListLeads")));
const DetailsLeads = Loader(
  lazy(() => import("src/content/credit/DetailsLeads"))
);

const creditRoutes = [
  {
    path: "indicate",
    element: <ListLeads />,
  },
  {
    path: "indicate/:id/details",
    element: <DetailsLeads />,
  },
];

export default creditRoutes;
