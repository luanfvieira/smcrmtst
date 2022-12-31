import { Suspense, lazy } from "react";

import SuspenseLoader from "src/components/SuspenseLoader";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const UserRegistration = Loader(
  lazy(() => import("src/content/UserRegistration"))
);

const AdministrativePanel = [
  {
    path: "userRegistration",
    element: <UserRegistration />,
  },
];

export default AdministrativePanel;
