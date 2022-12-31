import { Suspense, lazy } from "react";

import SuspenseLoader from "src/components/SuspenseLoader";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const AccountReceivable = Loader(
  lazy(() => import("src/content/reports/accountReceivable"))
);

const reportRoutes = [
  {
    path: "accountReceivable",
    element: <AccountReceivable />,
  },
];

export default reportRoutes;
