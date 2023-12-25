import getClassroom from "@entities/classroom/api";
import getGroups from "@entities/group/api";
import getTeachers from "@entities/teacher/api";
import { SEARCH_NAMES } from "@/shared/lib/router-dom/routes";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const useSearch = (value: string) => {
  const location = useLocation();
  const key = location.pathname.replace(/\/|[0-9]/gi, "").toUpperCase();

  const name = SEARCH_NAMES[
    (key as keyof typeof SEARCH_NAMES) || "GROUP"
  ] as string;

  const query = () => {
    switch (key) {
      case "TEACHER":
        return getTeachers(value);
      case "CLASSROOM":
        return getClassroom(value);
      default:
        return getGroups(value);
    }
  };

  const { data } = useQuery({
    queryFn: query,
    queryKey: ["search", value],
    enabled: !!value,
    retryOnMount: true,
  });

  return { data, name };
};

export default useSearch;
