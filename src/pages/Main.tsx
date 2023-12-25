import { FC } from "react";
import Week from "@widgets/Week/Week";
import List from "@widgets/Exam/List";
import { useEffect, useState } from "react";
import useSavedStore, { Schedule } from "@/shared/store/useSavedStore";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "simplify-dev";
import { TRANSLATED_NAMES } from "@/shared/lib/router-dom/routes";

const Main: FC = () => {
  const { teacher, classroom, group } = useSavedStore();

  const navigate = useNavigate();
  const location = useLocation();
  const key = location.pathname.replace(/\/|[0-9]/gi, "") as
    | "group"
    | "teacher"
    | "classroom"
    | "exam";

  const [saved, setSaved] = useState<Schedule[]>(
    { group, teacher, classroom, exam: [] }[key] || [],
  );

  useEffect(
    () => setSaved({ group, teacher, classroom, exam: [] }[key] || []),
    [key, group, teacher, classroom],
  );

  return (
    <Box className="flex items-start my-[25px] mx-auto px-[20px] max-w-[1440px] w-full gap-[20px] max-md:flex-col">
      {key !== "exam" && (
        <Box
          as="aside"
          className="md:max-w-[200px] w-full bg-gray-100 rounded-[12px] p-[10px] gap-[10px]"
        >
          <Typography>
            Сохраненные{" "}
            {TRANSLATED_NAMES[
              key.toUpperCase() as keyof typeof TRANSLATED_NAMES
            ].toLowerCase()}
          </Typography>
          {saved?.map(({ name, url }: Schedule) => (
            <Button
              key={url}
              onClick={() => navigate(url)}
              variant="primary"
              buttonType="text"
            >
              {name}
            </Button>
          ))}
        </Box>
      )}
      {key !== "exam" ? <Week /> : <List />}
    </Box>
  );
};

export default Main;
