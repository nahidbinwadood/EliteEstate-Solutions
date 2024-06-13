import { useParams } from "react-router-dom";
import image from "../../../../assets/dashboard/user/payment.jpg";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../../Components/Dashboard/Form/CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);
const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: payment = {},refetch } = useQuery({
    queryKey: ["payment", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/offer/${id}`);
      return data;
    },
  });
  console.log(payment);
  return (
    <div
      className="w-full flex space-y-5
          text-white items-center justify-center font-qs bg-center bg-cover h-[100vh]"
      style={{
        backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),url(${image})`,
      }}
    >
      <div>
        <div className="mt-12 ">
          <h2 className="text-4xl font-bold font-lora text-center">
            Complete Your Payment
          </h2>
        </div>
        <div className="mt-12 bg-white  bg-opacity-20 backdrop-blur-md p-16 rounded-xl">
          <div className="space-y-6 w-full">
            <Elements stripe={stripePromise}>
              {/* checkout form */}
              <CheckoutForm payment={payment} refetch={refetch}></CheckoutForm>
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
