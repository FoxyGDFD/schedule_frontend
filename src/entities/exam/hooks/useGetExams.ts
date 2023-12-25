import { useQuery } from "@tanstack/react-query";
import getExams from "../api";

const useGetExams = (url: string) =>
  useQuery({ queryKey: ["exam", url], queryFn: () => getExams(url) });

export default useGetExams;
