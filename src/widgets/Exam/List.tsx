import { Group, Teacher } from "@/shared/store/useScheduleStore";
import { FC } from "react";
import { Box } from "simplify-dev";
import Exam from "./Exam";
import useGetExams from "@/entities/exam/hooks/useGetExams";

export interface ExamObj {
  id: number;
  subject: {
    id: number;
    name: string;
  };
  classroom: {
    id: number;
    name: string;
  };
  teacher: Teacher[];
  group: Group[];
  date_and_time: string;
}

const List: FC = () => {
  const { data } = useGetExams("");
  return (
    <Box className="flex flex-col gap-[10px]">
      {data?.map((exam: ExamObj) => <Exam key={`exam-${exam.id}`} {...exam} />)}
    </Box>
  );
};

export default List;
