import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import getLessons from "../api";

const useGetLessons = (id: number) => {
  const location = useLocation();
  const key = location.pathname.replace(/\//gi, "");

  return useQuery({
    queryKey: ["schedule", key, id],
    queryFn: () => getLessons(`${key}__id=${id}`),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

export default useGetLessons;
