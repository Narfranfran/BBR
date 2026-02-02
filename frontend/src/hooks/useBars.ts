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
    reviews_avg_rating?: number; // From withAvg
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

export interface BarsFilters {
  province?: string;
  type?: string;
  search?: string;
  sort?: 'rating'; 
  // orderDirection is handled by backend logic now
}

export function useBars(filters?: BarsFilters) {
  // Construct query string from filters
  const params = new URLSearchParams();
  if (filters?.province) params.append('province', filters.province);
  if (filters?.type) params.append('type', filters.type);
  if (filters?.search) params.append('search', filters.search);
  if (filters?.sort) params.append('sort', filters.sort);

  const queryString = params.toString() ? `?${params.toString()}` : "";
  
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
