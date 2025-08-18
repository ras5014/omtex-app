import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/axios";
import qs from "qs";

const fetchCustomers = async () => {
  const query = qs.stringify(
    {
      fields: ["name", "gstNo", "billingAddress", "shippingAddress"],
    },
    { encodeValuesOnly: true }
  );
  const { data } = await clientApi.get(`/customers?${query}`);
  return data.data;
};

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
    // staleTime: 60 * 1000, // 1 minute
    // refetchInterval: 60 * 1000, // 1 minute
    // retry: 3
  });
};
