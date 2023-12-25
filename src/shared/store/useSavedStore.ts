import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Schedule {
  name: string;
  url: string;
}

interface SavedSchedules {
  group: Schedule[];
  teacher: Schedule[];
  classroom: Schedule[];

  saveGroup: (group: Schedule) => void;
  saveTeacher: (teacher: Schedule) => void;
  saveClassroom: (classroom: Schedule) => void;

  removeGroup: (group: Schedule) => void;
  removeTeacher: (teacher: Schedule) => void;
  removeClassroom: (classroom: Schedule) => void;
}

const useSavedStore = create(
  persist<SavedSchedules>(
    (set) => ({
      group: [],
      teacher: [],
      classroom: [],

      saveGroup: (group: Schedule) =>
        set((state: SavedSchedules) => ({ group: [...state.group, group] })),
      saveTeacher: (teacher: Schedule) =>
        set((state: SavedSchedules) => ({
          teacher: [...state.teacher, teacher],
        })),
      saveClassroom: (classroom: Schedule) =>
        set((state: SavedSchedules) => ({
          classroom: [...state.teacher, classroom],
        })),

      removeGroup: (group: Schedule) =>
        set((state) => ({
          group: state.group.filter(
            (el) => JSON.stringify(el) !== JSON.stringify(group),
          ),
        })),
      removeTeacher: (teacher: Schedule) =>
        set((state) => ({
          teacher: state.teacher.filter(
            (el) => JSON.stringify(el) !== JSON.stringify(teacher),
          ),
        })),
      removeClassroom: (classroom: Schedule) =>
        set((state) => ({
          classroom: state.classroom.filter(
            (el) => JSON.stringify(el) !== JSON.stringify(classroom),
          ),
        })),
    }),
    { name: "saved" },
  ),
);

export default useSavedStore;
