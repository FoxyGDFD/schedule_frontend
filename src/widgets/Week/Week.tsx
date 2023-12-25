import { FC, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import useGetLessons from "@entities/lesson/hooks/useGetLessons";
import useSchedule, { Lesson } from "@shared/store/useScheduleStore";
import Day from "./ui/Day";
import { Box, Button, Typography } from "simplify-dev";
import client from "@shared/api/client";
import { useQuery } from "@tanstack/react-query";
import useSaveSchedule from "@shared/hooks/useSaveSchedule";

const Week: FC = () => {
  const location = useLocation();
  const { id } = useParams();

  const key = location.pathname.replace(/\/|[0-9]/gi, "") as
    | "group"
    | "teacher"
    | "classroom";

  const { group, teacher, classroom } = useSchedule();
  const [schedule, setSchedule] = useState<Lesson[] | null>(
    { group, teacher, classroom }[key],
  );

  useEffect(
    () => setSchedule({ group, teacher, classroom }[key]),
    [key, group, teacher, classroom],
  );
  useGetLessons(Number(id));

  const { data } = useQuery({
    queryFn: async () => {
      const response = await client.get(location.pathname);
      return response.data;
    },
    queryKey: ["name", id],
  });

  const { isSaved, save, remove } = useSaveSchedule();

  const name =
    key === "teacher"
      ? `${data?.surname} ${data?.name} ${data?.patronymic}`
      : data?.name;

  const saveItem = {
    name,
    url: location.pathname,
  };

  return (
    <>
      {schedule ? (
        <Box as="section" className="flex flex-col gap-[20px] w-full">
          <Box className="flex gap-[10px] items-center flex-wrap">
            <Typography as="h1" className="text-[#2358e1] max-sm:text-[20px]">
              {saveItem?.name}
            </Typography>
            {data && (
              <>
                {!isSaved(saveItem) ? (
                  <Button
                    variant="secondary"
                    buttonType="text"
                    onClick={() => save(saveItem)}
                    className="w-auto"
                  >
                    Сохранить
                  </Button>
                ) : (
                  <Button
                    buttonType="text"
                    variant="reject"
                    onClick={() => remove(saveItem)}
                    className="w-auto"
                  >
                    Удалить
                  </Button>
                )}
              </>
            )}
          </Box>
          <Day day="Понедельник" schedule={schedule} />
          <Day day="Вторник" schedule={schedule} />
          <Day day="Среда" schedule={schedule} />
          <Day day="Четверг" schedule={schedule} />
          <Day day="Пятница" schedule={schedule} />
          <Day day="Суббота" schedule={schedule} />
        </Box>
      ) : (
        <Typography
          as="h3"
          className="flex justify-center items-center text-center"
        >
          Выберите расписание из сохранённых или найтиде при помощи поиска
        </Typography>
      )}
    </>
  );
};

export default Week;
