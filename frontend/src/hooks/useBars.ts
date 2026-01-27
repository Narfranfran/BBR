import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface Bar {
  id: number;
  attributes: {
    name: string;
    description?: string;
    address: string;
    municipality: string;
    province: string;
    type: string;
    rating?: number;
    seats?: number;
    coordinates: {
      lat: number;
      lon: number;
    };
    contact?: {
        phone?: string;
        email?: string;
        web?: string;
    };
  };
}

export function useBars(params?: string) {
  const queryString = params ? `?${params}` : "";
  // Default to fetching all/paginated, or utilize bounding box if provided
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/bars${queryString}`,
    fetcher,
  );

  return {
    bars: (data?.data || []) as Bar[],
    meta: data?.meta,
    links: data?.links,
    isLoading,
    isError: error,
  };
}
