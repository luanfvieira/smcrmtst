import { Suspense, lazy } from "react";

import SuspenseLoader from "src/components/SuspenseLoader";
import Guest from "src/components/Guest";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Account

const LoginCover = Loader(
  lazy(() => import("src/content/pages/Auth/Login/Cover"))
);

const ChangePassword = Loader(
  lazy(() => import("src/content/pages/Auth/ChangePassword"))
);

const accountRoutes = [
  {
    path: "",
    element: (
      <Guest>
        <LoginCover />
      </Guest>
    ),
  },
  {
    path: "change-password",
    element: (
      <Guest>
        <ChangePassword />
      </Guest>
    ),
  },
];

export default accountRoutes;
