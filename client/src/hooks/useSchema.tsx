import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { getContentTypeSchemaMapping } from "@/config/constants";

const fetchSchema = async (contentType) => {
  const schema = await getContentTypeSchemaMapping[contentType];
  const { data } = await api.get(
    `/content-type-builder/content-types/${schema}`
  );
  return data.data.schema?.attributes || {};
};

export const useSchema = (contentType) => {
  return useQuery({
    queryKey: [contentType],
    queryFn: () => fetchSchema(contentType),
    // staleTime: 60 * 1000, // 1 minute
    // refetchInterval: 60 * 1000, // 1 minute
    // retry: 3
  });
};
