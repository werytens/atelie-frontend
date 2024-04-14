import { Button, TextField } from "@mui/material";
import { Api, IClient } from "../api/api";
import { useEffect, useState } from "react";

const initialClient = {
  name: "",
  phone: "",
  address: "",
  email: "",
};

export const Clients = () => {
  const [newClient, setNewClient] = useState<IClient>(initialClient);

  const [clients, setClients] = useState<IClient[] | null>(null);

  useEffect(() => {
    const getClients = async () => {
      const clients = await Api.getClients();

      setClients(clients.data);
    };

    if (newClient === initialClient) {
      getClients();
    }
  }, [newClient]);

  const createClient = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await Api.createClient(newClient);
    setNewClient(initialClient);
  };

  return (
    <section>
      <h1 className="mb-[20px]">Clients</h1>

      <form action="POST" className="flex flex-col max-w-[350px]">
        <div className="my-[5px]">
          <TextField
            id="filled-basic"
            label="client name"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const client = newClient;
              client.name = event.target.value;
              setNewClient(client);
            }}
          />
        </div>

        <div className="my-[5px]">
          <TextField
            id="filled-basic"
            label="client phone"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const client = newClient;
              client.phone = event.target.value;
              setNewClient(client);
            }}
          />
        </div>

        <div className="my-[5px]">
          <TextField
            id="filled-basic"
            label="client address"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const client = newClient;
              client.address = event.target.value;
              setNewClient(client);
            }}
          />
        </div>

        <div className="my-[5px]">
          <TextField
            id="filled-basic"
            label="client email"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const client = newClient;
              client.email = event.target.value;
              setNewClient(client);
            }}
          />
        </div>

        <div className="mt-[20px]">
          <Button onClick={createClient} variant="outlined">
            Add
          </Button>
        </div>
      </form>

      <table className="mt-[10px]">
        <tr>
          <th className="py-2 px-5 bg-black">№</th>
          <th className="py-2 px-5 bg-black">Name</th>
          <th className="py-2 px-5 bg-black">Address</th>
          <th className="py-2 px-5 bg-black">Phone</th>
          <th className="py-2 px-5 bg-black">Email</th>
        </tr>

        {clients?.map((client, index) => (
          <tr key={"client_" + index}>
            <td className="py-2 px-5">{index + 1}</td>
            <td className="py-2 px-5">{client.name}</td>
            <td className="py-2 px-5">{client.address}</td>
            <td className="py-2 px-5">{client.phone}</td>
            <td className="py-2 px-5">{client.email}</td>
          </tr>
        ))}
      </table>
    </section>
  );
};
