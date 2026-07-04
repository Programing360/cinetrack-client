import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../hooks/useAxios";

const useAllMovie = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allMovies = [],
    isLoading,
    refetch,
    isPending,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/movies");
      return await res.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
    retryDelay: 1000,
    placeholderData: [],
  });

  return [allMovies, refetch, isLoading, isPending, error];
};

export default useAllMovie;
