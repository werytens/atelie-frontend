import { Link } from "react-router-dom";

export const Navbar = () => {
  const menuItemsData = [
    {
      name: "Clients",
      path: "clients",
    },
    {
      name: "Orders",
      path: "orders",
    },
    {
      name: "Services",
      path: "services",
    },
    {
      name: "Coupons",
      path: "coupons",
    },
    {
      name: "Positions",
      path: "positions",
    },
    {
      name: "Employees",
      path: "employees",
    },
    {
      name: "Reviews",
      path: "reviews",
    },
  ];

  return (
    <header className="flex flex-col items-center bg-[#303134] rounded m-[30px] pb-[20px]">
      <h1 className="my-[20px] text-[30px]">Atelie Database</h1>
      <section className="flex items-center">
        <p className="mr-[10px] text-[20px]">Navigation:</p>
        <div>
          {menuItemsData.map((menuItem, index) => (
            <Link
              className="mx-2 border-[1px] border-solid rounded p-3 text-[#ff9800] border-[#ff9800]"
              to={menuItem.path}
              key={"navbarLink_" + index}
            >
              {menuItem.name}
            </Link>
          ))}
        </div>
      </section>
    </header>
  );
};
