import { useEffect, useState } from "react";
import { Api, IOrder, IOrderComposition } from "../api/api";
import { format } from "date-fns";
import { Button, TextField } from "@mui/material";

const initialOrder: IOrder = {
  client_id: 0,
  employee_id: 0,
  coupon_id: 0,
  order_date: null,
};

const initialOrderComposition: IOrderComposition = {
  order_id: 0,
  service_id: 0,
  amount_compositions: 0,
};

export const Orders = () => {
  const [orders, setOrders] = useState<any | null>(null);
  const [newOrder, setNewOrder] = useState<IOrder>(initialOrder);
  const [newOrderComp, setNewOrderComp] = useState<IOrderComposition>(
    initialOrderComposition
  );

  useEffect(() => {
    const getOrders = async () => {
      const ordersResponse = (await Api.getOrders()).data;
      const ordersCompositionsResponse = (await Api.getOrdersCompositons())
        .data;

      const clients = (await Api.getClients()).data;
      const employees = (await Api.getEmployees()).data;
      const coupons = (await Api.getCoupons()).data;
      const services = (await Api.getServices()).data;

      const orderData = ordersResponse.map((item: any) => {
        const targetOrderComposition = ordersCompositionsResponse
          .filter((comp: any) => comp.id_order === item.id_order)
          .map((comp: any) => {
            const targetService = services.filter(
              (service: any) => comp.id_service === service.id_service
            );

            return {
              ...comp,
              name_service: targetService[0].name_service,
            };
          });

        const targetClient = clients.filter(
          (client: any) => client.id_client === item.id_client
        );

        const targetEmployee = employees.filter(
          (employee: any) => employee.id_employee === item.id_employee
        );

        const targetCoupon = coupons.filter(
          (coupon: any) => coupon.id_coupon === item.id_coupon
        );

        const orderFinalData = {
          ...item,
          composition: targetOrderComposition,
        };

        orderFinalData.client_name = targetClient[0].fullname_client;
        orderFinalData.employee_name = targetEmployee[0].fullname_employee;
        orderFinalData.coupon_name = targetCoupon[0].coupon_name;

        return orderFinalData;
      });

      setOrders(orderData);
    };
    getOrders();
  }, []);

  const handleComplete = async (id: number) => {
    await Api.completeOrder(id);
    window.location.reload();
  };

  const createOrder = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await Api.createOrder(newOrder);
    setNewOrder(initialOrder);
    window.location.reload();
  };

  const createOrderComp = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await Api.createOrderComposition(newOrderComp);
    setNewOrderComp(initialOrderComposition);
    window.location.reload();
  };

  return (
    <section>
      <h1 className="mb-[20px]">Orders</h1>

      <h2 className="bg-black p-2">Insert order</h2>
      <form action="POST" className="flex flex-col max-w-[350px]">
        <div className="my-[5px]">
          <TextField
            id="filled-basic"
            label="client id"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const order = newOrder;
              order.client_id = Number(event.target.value);
              setNewOrder(order);
            }}
          />
        </div>
        <div className="my-[5px]">
          <TextField
            id="filled-basic"
            label="employee id"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const order = newOrder;
              order.employee_id = Number(event.target.value);
              setNewOrder(order);
            }}
          />
        </div>
        <div className="my-[5px]">
          <TextField
            id="filled-basic"
            label="coupon id"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const order = newOrder;
              order.coupon_id = Number(event.target.value);
              setNewOrder(order);
            }}
          />
        </div>

        <div className="my-[5px]">
          <TextField
            id="filled-basic"
            label="order date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            type="date"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const order = newOrder;
              order.order_date = new Date(event.target.value);
              setNewOrder(order);
            }}
          />
        </div>

        <div className="mt-[20px]">
          <Button onClick={createOrder} variant="outlined">
            Add
          </Button>
        </div>
      </form>

      <h2 className="bg-black p-2 mt-[50px] mb-[5px]">
        Insert service in order
      </h2>

      <form action="POST" className="flex flex-col max-w-[350px] mb-[50px]">
        <div className="my-[5px]">
          <TextField
            id="filled-basic"
            label="order id"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const orderComp = newOrderComp;
              orderComp.order_id = Number(event.target.value);
              setNewOrderComp(orderComp);
            }}
          />
        </div>
        <div className="my-[5px]">
          <TextField
            id="filled-basic"
            label="service id"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const orderComp = newOrderComp;
              orderComp.service_id = Number(event.target.value);
              setNewOrderComp(orderComp);
            }}
          />
        </div>
        <div className="my-[5px]">
          <TextField
            id="filled-basic"
            label="amount"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const orderComp = newOrderComp;
              orderComp.amount_compositions = Number(event.target.value);
              setNewOrderComp(orderComp);
            }}
          />
        </div>

        <div className="mt-[20px]">
          <Button onClick={createOrderComp} variant="outlined">
            Add
          </Button>
        </div>
      </form>

      <table className="mt-[10px]">
        <thead>
          <tr>
            <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">
              Id
            </th>
            <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">
              Client
            </th>
            <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">
              Employee
            </th>
            <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">
              Coupon
            </th>
            <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">
              Date
            </th>
            <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">
              Complete Date
            </th>
            <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">
              Composition
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order: any, index: number) => (
            <tr key={"order_" + index}>
              <td className="border-[2px] border-black border-solid py-2 px-5">
                {order.id_order}
              </td>
              <td className="border-[2px] border-black border-solid py-2 px-5">
                {order.client_name}
              </td>
              <td className="border-[2px] border-black border-solid py-2 px-5">
                {order.employee_name}
              </td>
              <td className="border-[2px] border-black border-solid py-2 px-5">
                {order.coupon_name}
              </td>
              <td className="border-[2px] border-black border-solid py-2 px-5">
                {format(order.date_order, "dd.MM.yyyy")}
              </td>
              <td className="py-2 px-5 border-[2px] border-black border-solid">
                {order.date_order_completed !== null
                  ? format(order.date_order, "dd.MM.yyyy")
                  : "Order not completed"}
              </td>
              <td className="py-2 px-5 border-[2px] border-black border-solid">
                <table>
                  <thead>
                    <tr>
                      <th className="py-1 px-5 bg-[grey]">Service</th>
                      <th className="py-1 px-5 bg-[grey]">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.composition.map((comp: any, index: number) => (
                      <tr key={"order_comp_" + index}>
                        <td className="py-1 px-5 bg-[grey]">
                          {comp.name_service}
                        </td>
                        <td className="py-1 px-5 bg-[grey]">
                          {comp.amount_compositions}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {String()}
              </td>
              <td
                className={
                  !order.date_order_completed
                    ? "py-2 px-5 border-[2px] border-black border-solid"
                    : ""
                }
              >
                {!order.date_order_completed && (
                  <Button
                    variant="contained"
                    onClick={async () => {
                      await handleComplete(order.id_order);
                    }}
                  >
                    Complete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
