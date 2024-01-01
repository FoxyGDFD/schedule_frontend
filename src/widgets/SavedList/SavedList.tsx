import { Box, Button, Typography } from "simplify-dev";
import { TRANSLATED_NAMES } from "@shared/lib/router-dom/routes";
import { useNavigate } from "react-router-dom";
import useSavedStore, { Schedule } from "@shared/store/useSavedStore";
import { useState, useEffect } from "react";

const SavedList = () => {
  const { teacher, classroom, group } = useSavedStore();
  const navigate = useNavigate();

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
    <>
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
    </>
  );
};

export default SavedList;
