import useSavedStore, { Schedule } from "@shared/store/useSavedStore";
import { useLocation } from "react-router-dom";

const useSaveSchedule = () => {
  const location = useLocation();
  const key = location.pathname.replace(/\/|[0-9]/gi, "").toUpperCase();

  const {
    group,
    saveGroup,
    removeGroup,
    teacher,
    saveTeacher,
    removeTeacher,
    classroom,
    saveClassroom,
    removeClassroom,
  } = useSavedStore();

  const save = (value: Schedule) => {
    switch (key) {
      case "TEACHER":
        return saveTeacher(value);
      case "CLASSROOM":
        return saveClassroom(value);
      default:
        return saveGroup(value);
    }
  };

  const remove = (value: Schedule) => {
    switch (key) {
      case "TEACHER":
        return removeTeacher(value);
      case "CLASSROOM":
        return removeClassroom(value);
      default:
        return removeGroup(value);
    }
  };

  const isSaved = (value: Schedule) => {
    switch (key) {
      case "TEACHER":
        return !!teacher.find(
          (el) => JSON.stringify(el) === JSON.stringify(value),
        );
      case "CLASSROOM":
        return !!classroom.find(
          (el) => JSON.stringify(el) === JSON.stringify(value),
        );
      default:
        return !!group.find(
          (el) => JSON.stringify(el) === JSON.stringify(value),
        );
    }
  };

  return { isSaved, save, remove };
};

export default useSaveSchedule;
