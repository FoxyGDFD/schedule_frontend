import { FC } from "react";
import { Lesson } from "@shared/store/useScheduleStore";
import Card from "@widgets/Week/ui/Card";
import { Box, Typography } from "simplify-dev";

const Day: FC<{ day: string; schedule: Lesson[] | null }> = ({
  day,
  schedule,
}) => {
  const scheduleDay = schedule?.filter(({ week_day }) => week_day === day);

  return (
    <Box
      as="section"
      className="flex flex-col my-[5px] mx-auto w-full gap-[20px]"
    >
      <Typography as="h2" className="text-gray-700">
        {day}
      </Typography>
      {!scheduleDay?.length && (
        <Typography className="flex items-center justify-center text-center">
          Нет занятий
        </Typography>
      )}
      {scheduleDay?.map((lesson) => (
        <Card {...lesson} key={`card-${lesson.id}`} />
      ))}
    </Box>
  );
};
export default Day;
