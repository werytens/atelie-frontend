import { Button, TextField } from "@mui/material";
import { Api, IPosition } from "../api/api";
import { useEffect, useState } from "react";

const initialPosition = {
  position_name: "",
  position_rate: 0,
};

export const Positions = () => {
  const [newPosition, setNewPosition] = useState<IPosition>(initialPosition);
  const [positions, setPositions] = useState<IPosition[] | null>(null);

  useEffect(() => {
    const getPositions = async () => {
      const positions = await Api.getPositions();

      const positionsData: IPosition[] = [];
      positions.data.forEach(
        (item: {
          name_position: string;
          rate_position: number;
        }) => {
          const positionItem: IPosition = {
            position_name: item.name_position,
            position_rate: item.rate_position,
          };

          positionsData.push(positionItem);
        }
      );

      setPositions(positionsData);
    };

    if (newPosition === initialPosition) {
      getPositions();
    }
  }, [newPosition]);

  const createPosition = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await Api.createPosition(newPosition);
    setNewPosition(initialPosition);
  };

  return (
    <section>
      <h1 className="mb-[20px]">Positions</h1>

      <form action="POST" className="flex flex-col max-w-[350px]">
        <div className="my-[5px]">
          <TextField
            id="filled-basic"
            label="Position Name"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const position = { ...newPosition };
              position.position_name = event.target.value;
              setNewPosition(position);
            }}
          />
        </div>

        <div className="my-[5px]">
          <TextField
            id="filled-basic"
            label="Position Rate"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const position = { ...newPosition };
              position.position_rate = Number(event.target.value);
              setNewPosition(position);
            }}
          />
        </div>

        <div className="mt-[20px]">
          <Button onClick={createPosition} variant="outlined">
            Add
          </Button>
        </div>
      </form>

      <table className="mt-[10px]">
        <thead>
          <tr>
            <th className="py-2 px-5 border-[2px] border-black border-solid bg-black">№</th>
            <th className="py-2 px-5 border-[2px] border-black border-solid bg-black">Name</th>
            <th className="py-2 px-5 border-[2px] border-black border-solid bg-black">Rate</th>
          </tr>
        </thead>
        <tbody>
          {positions?.map((position, index) => (
            <tr key={"position_" + index}>
              <td className="py-2 px-5 border-[2px] border-black border-solid">{index + 1}</td>
              <td className="py-2 px-5 border-[2px] border-black border-solid">{position.position_name}</td>
              <td className="py-2 px-5 border-[2px] border-black border-solid">{position.position_rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
