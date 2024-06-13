import AdCard from "../../../Components/Advertisement_Card/AdCard";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Advertisement = () => {
  const axiosPubic = useAxiosPublic();
  const { data: advertisements = [] } = useQuery({
    queryKey: ["advertisements"],
    queryFn: async () => {
      const { data } = await axiosPubic.get("/advertisement");
      return data;
    },
  });
  return (
    <div className="my-16 container mx-auto">
      <div className="space-y-4 px-4">
        <h2 className="text-2xl md:text-4xl text-center font-lora font-bold">
          Advertisements
        </h2>
        <p className="font-roboto text-lg lg:w-2/3 mx-auto text-center pb-12">
          Explore our curated selection of premier properties in prime
          locations. From luxurious penthouses to charming countryside estates,
          discover your dream home with ease. Let our handpicked collection of
          listings captivate your imagination and guide you towards your perfect
          property investment.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {advertisements.map((advertise) => (
          <div key={advertise.id}>
            <AdCard advertise={advertise}></AdCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advertisement;
