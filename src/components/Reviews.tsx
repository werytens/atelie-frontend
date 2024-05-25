import { Button, TextField } from "@mui/material";
import { Api, IClientReviews } from "../api/api";
import { useEffect, useState } from "react";

const initialReview = {
  client_id: 0,
  order_id: 0,
  review_text: "",
};

export const Reviews = () => {
  const [newReview, setNewReview] = useState<IClientReviews>(initialReview);

  const [reviews, setReviews] = useState<IClientReviews[] | null>(null);

  useEffect(() => {
    const getReviews = async () => {
      const reviews = await Api.getReviews();
      const clients = (await Api.getClients()).data;

      const reviewsData: IClientReviews[] = [];
      reviews.data.forEach(
        (item: {
          id_client: number;
          id_order: number;
          review_text: string;
        }) => {
          const reviewItem: IClientReviews = {
            client_id: item.id_client,
            order_id: item.id_order,
            review_text: item.review_text,
          };

          const targetClient = clients.filter(
            (client: any) => client.id_client === reviewItem.client_id
          );

          reviewItem.client_id = targetClient[0].fullname_client;

          reviewsData.push(reviewItem);
        }
      );

      setReviews(reviewsData);
    };

    if (newReview === initialReview) {
      getReviews();
    }
  }, [newReview]);

  const createCoupon = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    await Api.createReview(newReview);
    setNewReview(initialReview);
  };

  return (
    <section>
      <h1 className="mb-[20px]">Reviews</h1>

      <form action="POST" className="flex flex-col max-w-[350px]">
        <div className="my-[5px]">
          <TextField
            id="filled-basic"
            label="order id"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const review = newReview;
              review.order_id = Number(event.target.value);
              setNewReview(review);
            }}
          />
        </div>

        <div className="my-[5px]">
          <TextField
            id="filled-basic"
            label="client id"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const review = newReview;
              review.client_id = Number(event.target.value);
              setNewReview(review);
            }}
          />
        </div>

        <div className="my-[5px]">
          <TextField
            id="filled-basic"
            label="review text"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const review = newReview;
              review.review_text = event.target.value;
              setNewReview(review);
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
          <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">
            №
          </th>
          <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">
            Order
          </th>
          <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">
            Client
          </th>
          <th className="border-[2px] border-black border-solid py-2 px-5 bg-black">
            Text
          </th>
        </tr>

        {reviews?.map((review, index) => (
          <tr key={"review_" + index}>
            <td className="border-[2px] border-black border-solid py-2 px-5">
              {index + 1}
            </td>
            <td className="border-[2px] border-black border-solid py-2 px-5">
              {review.order_id}
            </td>
            <td className="border-[2px] border-black border-solid py-2 px-5">
              {review.client_id}
            </td>
            <td className="border-[2px] border-black border-solid py-2 px-5">
              {review.review_text}
            </td>
          </tr>
        ))}
      </table>
    </section>
  );
};
