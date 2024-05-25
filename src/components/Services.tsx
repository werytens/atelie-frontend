import { Button, TextField } from "@mui/material";
import { Api, IService } from "../api/api";
import { useEffect, useState } from "react";

const initialService = {
  service_name: "",
  service_price: 0,
};

export const Services = () => {
  const [newService, setNewService] = useState<IService>(initialService);

  const [services, setServices] = useState<IService[] | null>(null);

  useEffect(() => {
    const getClients = async () => {
      const services = await Api.getServices();

      const servicesData: IService[] = [];
      services.data.forEach(
        (item: {
          name_service: string;
          price_service: number;
        }) => {
          const serviceItem: IService = {
            service_name: item.name_service,
            service_price: item.price_service,
          };

          servicesData.push(serviceItem);
        }
      );

      setServices(servicesData);
    };

    if (newService === initialService) {
      getClients();
    }
  }, [newService]);

  const createCoupon = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await Api.createService(newService);
    setNewService(initialService);
  };

  return (
    <section>
      <h1 className="mb-[20px]">Services</h1>

      <form action="POST" className="flex flex-col max-w-[350px]">
        <div className="my-[5px]">
          <TextField
            id="filled-basic"
            label="service name"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const service = newService;
              service.service_name = event.target.value;
              setNewService(service);
            }}
          />
        </div>

        <div className="my-[5px]">
          <TextField
            id="filled-basic"
            label="service price"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const service = newService;
              service.service_price = Number(event.target.value);
              setNewService(service);
            }}
          />
        </div>

        <div className="mt-[20px]">
          <Button onClick={createCoupon} variant="outlined">
            Add
          </Button>
        </div>
      </form>

      <table className="mt-[10px]">
        <tr>
          <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">№</th>
          <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">Name</th>
          <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">Price</th>
        </tr>

        {services?.map((service, index) => (
          <tr key={"service_" + index}>
            <td className="border-[2px] border-black border-solid py-2 px-5">{index + 1}</td>
            <td className="border-[2px] border-black border-solid py-2 px-5">{service.service_name}</td>
            <td className="border-[2px] border-black border-solid py-2 px-5">{service.service_price}</td>
          </tr>
        ))}
      </table>
    </section>
  );
};
