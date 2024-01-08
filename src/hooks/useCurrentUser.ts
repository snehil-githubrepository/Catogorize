import useSWR from "swr";
import { fetcher } from "../../libs/fetcher";

const useCurrentUser = () => {
  const { data, isLoading, error, mutate } = useSWR(
    "/api/userAuthCheck",
    fetcher
  );
  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
export default useCurrentUser;
