/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import { PiSpinnerBallFill } from "react-icons/pi";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ payment, refetch }) => {
  const stripe = useStripe();
  const { user } = useAuth();
  const navigate = useNavigate();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState();
  const axiosSecure = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  useEffect(() => {
    // fetch client secret
    if (payment?.offered_price && payment?.offered_price > 1) {
      getClientSecret({ price: payment?.offered_price });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment?.offered_price]);
  //   get clientSecret
  const getClientSecret = async (price) => {
    const { data } = await axiosSecure.post(`/create-payment-intent`, price);
    console.log("clientSecret from server--->", data);
    setClientSecret(data.clientSecret);
  };

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setProcessing(true)
    if (!stripe || !elements) {
      
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }

    // confirm payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      console.log(paymentIntent);
      // 1. Create payment info object
      const paymentInfo = {
        status: "bought",
        sold_property_id: payment._id,
        transaction_id: paymentIntent.id,
        date: new Date(),
      };
      delete paymentInfo._id;
      console.log(paymentInfo);
      try {
        await axiosSecure.put(`/offers/sold/${payment?._id}`, paymentInfo);
        // update ui
        refetch();
        toast.success("Property Bought Successfully ");
        navigate("/dashboard/property-bought");
      } catch (err) {
        console.log(err);
      }
    }

    setProcessing(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <div className="flex mt-2 justify-around">
          <button
            disabled={!stripe || !clientSecret || processing}
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            {processing ? (
              <PiSpinnerBallFill className="animate-spin m-auto" size={24} />
            ) : (
              `Pay $${payment?.offered_price}`
            )}
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
    </>
  );
};

export default CheckoutForm;
