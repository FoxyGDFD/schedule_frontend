import { create } from "zustand";

interface LessonNumber {
  id: number;
  number: number;
  start_time: string;
  end_time: string;
}

export interface Named {
  id: number;
  name: string;
}

export interface Group {
  id: number;
  subgroups: Group[];
  name: string;
  course: number;
  group: number;
  direction: number;
}

export interface Teacher {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  photo: string;
  cathedra: number[];
}

export interface Lesson {
  id: number;
  number: LessonNumber;
  subject: Named;
  classroom: Named;
  lesson_type: Named;
  teacher: Teacher[];
  group: Group[];
  week_day: string;
}

type ScheduleHook = {
  group: null | Lesson[];
  teacher: null | Lesson[];
  classroom: null | Lesson[];

  setGroup: (group: Lesson[]) => void;
  setTeacher: (teacher: Lesson[]) => void;
  setClassroom: (classroom: Lesson[]) => void;
};

const useSchedule = create<ScheduleHook>((set) => ({
  group: null,
  teacher: null,
  classroom: null,

  setGroup: (group) => set(() => ({ group })),
  setTeacher: (teacher) => set(() => ({ teacher })),
  setClassroom: (classroom) => set(() => ({ classroom })),
}));

export default useSchedule;
