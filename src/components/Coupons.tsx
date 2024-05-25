import { Button, TextField } from "@mui/material";
import { Api, ICoupon } from "../api/api";
import { useEffect, useState } from "react";

const initialCoupon = {
  coupon_name: "",
  coupon_discount: 0,
};

export const Coupons = () => {
  const [newCoupon, setNewCoupon] = useState<ICoupon>(initialCoupon);

  const [coupons, setCoupons] = useState<ICoupon[] | null>(null);

  useEffect(() => {
    const getCoupons = async () => {
      const coupons = await Api.getCoupons();

      setCoupons(coupons.data);
    };

    if (newCoupon === initialCoupon) {
      getCoupons();
    }
  }, [newCoupon]);

  const createCoupon = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await Api.createCoupon(newCoupon);
    setNewCoupon(initialCoupon);
  };

  return (
    <section>
      <h1 className="mb-[20px]">Coupons</h1>

      <form action="POST" className="flex flex-col max-w-[350px]">
        <div className="my-[5px]">
          <TextField
            id="filled-basic"
            label="coupon name"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const coupon = newCoupon;
              coupon.coupon_name = event.target.value;
              setNewCoupon(coupon);
            }}
          />
        </div>

        <div className="my-[5px]">
          <TextField
            id="filled-basic"
            label="coupon discount"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const coupon = newCoupon;
              coupon.coupon_discount = Number(event.target.value);
              setNewCoupon(coupon);
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
          <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">Discount</th>
        </tr>

        {coupons?.map((coupon, index) => (
          <tr key={"coupon_" + index}>
            <td className="border-[2px] border-black border-solid py-2 px-5">{index + 1}</td>
            <td className="border-[2px] border-black border-solid py-2 px-5">{coupon.coupon_name}</td>
            <td className="border-[2px] border-black border-solid py-2 px-5">{coupon.coupon_discount}%</td>
          </tr>
        ))}
      </table>
    </section>
  );
};
