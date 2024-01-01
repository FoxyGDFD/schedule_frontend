import { ExamObj } from "./List";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "simplify-dev";
import { ROUTES } from "@shared/lib/router-dom/routes";

const Exam = ({
  date_and_time,
  subject,
  teacher,
  group,
  classroom,
}: ExamObj) => {
  const navigate = useNavigate();
  return (
    <Box className="flex gap-[20px] max-md:flex-wrap">
      <Box>
        <Typography as="h2" className="w-full text-[#2358e1] whitespace-nowrap">
          {date_and_time
            .split("T")[0]
            .replace(/-/gi, ".")
            .split(".")
            .reverse()
            .join(".")}
        </Typography>
        <Typography
          as="h6"
          className="font-medium text-[18px] whitespace-nowrap text-gray-500 mt-[10px]"
        >
          {date_and_time.split("T")[1].split("+")[0].slice(0, -3)}
        </Typography>
      </Box>
      <Box className="grid grid-cols-2 items-center gap-[10px 0] bg-gray-100 rounded-[12px] p-[20px] w-full">
        <Typography as="h3">{subject.name}</Typography>
        <Button
          variant="tertiary"
          buttonType="text"
          className="justify-self-end hover:text-[#2358e1] max-sm:col-start-2 max-sm:row-start-3"
          onClick={() => navigate(`/${ROUTES.CLASSROOM}/${classroom.id}`)}
        >
          {classroom.name}
        </Button>
        {group.map(({ name, id }) => (
          <Button
            key={`group-${id}`}
            variant="tertiary"
            buttonType="text"
            className="px-0 col-start-1 col-end-2 hover:text-[#2358e1]"
            onClick={() => navigate(`/${ROUTES.GROUP}/${id}`)}
          >
            {name}
          </Button>
        ))}
        {teacher.map(({ name, surname, patronymic, id }) => (
          <Button
            key={`teacher-${id}`}
            variant="tertiary"
            buttonType="text"
            className="px-0 col-start-2 justify-self-end hover:text-[#2358e1]"
            onClick={() => navigate(`/${ROUTES.TEACHER}/${id}`)}
          >
            {surname} {name[0]}. {patronymic[0]}.
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Exam;
