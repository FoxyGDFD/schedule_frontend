import { FC } from "react";
import Week from "@widgets/Week/Week";
import List from "@widgets/Exam/List";
import { useLocation } from "react-router-dom";
import { Box } from "simplify-dev";
import SavedList from "@widgets/SavedList/SavedList";

const Main: FC = () => {
  const location = useLocation();
  const key = location.pathname.replace(/\/|[0-9]/gi, "") as
    | "group"
    | "teacher"
    | "classroom"
    | "exam";

  return (
    <Box className="flex items-start my-[25px] mx-auto px-[20px] max-w-[1440px] w-full gap-[20px] max-md:flex-col">
      <SavedList />
      {key !== "exam" ? <Week /> : <List />}
    </Box>
  );
};

export default Main;
