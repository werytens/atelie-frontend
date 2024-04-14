import { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { Clients } from "./Clients";
import { Orders } from "./Orders";
import { Services } from "./Services";
import { Coupons } from "./Coupons";

interface IRoute {
  path: string;
  component: ReactNode;
  exact: boolean;
}

export const AppRouter = () => {
  const routers: IRoute[] = [
    {
      path: "/clients",
      component: <Clients />,
      exact: true,
    },
    {
      path: "/orders",
      component: <Orders />,
      exact: true,
    },
    {
      path: "/services",
      component: <Services />,
      exact: true,
    },
    {
      path: "/coupons",
      component: <Coupons />,
      exact: true,
    },
  ];

  return (
    <div>
      <Routes>
        {routers.map((item, index) => (
          <Route element={item.component} key={index} path={item.path} />
        ))}
      </Routes>
    </div>
  );
};
