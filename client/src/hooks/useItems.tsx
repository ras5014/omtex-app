import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import qs from "qs";

const fetchItems = async () => {

    // await new Promise(resolve => setTimeout(resolve, 5000)); // 5 second delay

    const query = qs.stringify({
        fields: ['name', 'hsnSac', 'price', 'cgstPercent', 'sgstPercent', 'igstPercent'],
    }, { encodeValuesOnly: true });
    const { data } = await api.get(`/item-inventories?${query}`);
    return data.data;
}

export const useItems = () => {
    return useQuery({
        queryKey: ["items"],
        queryFn: fetchItems,
        // staleTime: 60 * 1000, // 1 minute
        // refetchInterval: 60 * 1000, // 1 minute
        // retry: 3
    })
}

