import { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { Clients } from "./Clients";
import { Orders } from "./Orders";
import { Services } from "./Services";
import { Coupons } from "./Coupons";
import { Positions } from "./Positions";
import { Employees } from "./Employees";
import { Reviews } from "./Reviews";

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
    {
      path: "/positions",
      component: <Positions />,
      exact: true,
    },
    {
      path: "/employees",
      component: <Employees />,
      exact: true,
    },
    {
      path: "/reviews",
      component: <Reviews />,
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
