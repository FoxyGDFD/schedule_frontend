import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import getLessons from "../api";
import useSchedule from "@/shared/store/useScheduleStore";
import { useCallback, useEffect } from "react";

const useGetLessons = (id: number) => {
  const location = useLocation();
  const key = location.pathname.replace(/\/|[0-9]/gi, "");

  const { data, refetch } = useQuery({
    queryKey: ["schedule", key, id],
    queryFn: () => getLessons(`${key}__id=${id}`),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const { setGroup, setTeacher, setClassroom } = useSchedule();

  const updateStore = useCallback(() => {
    switch (key) {
      case "teacher":
        return setTeacher(data);
      case "classroom":
        return setClassroom(data);
      default:
        return setGroup(data);
    }
  }, [key, data, setGroup, setTeacher, setClassroom]);

  useEffect(() => updateStore(), [updateStore]);

  return refetch;
};

export default useGetLessons;
