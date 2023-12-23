import { FC, useEffect, useState } from "react";
import { Box, Button, Typography } from "simplify-dev";
import { TabListProvider, TabList } from "simplify-dev/client-ui";
import { ROUTES, TRANSLATED_NAMES } from "@shared/lib/router-dom/routes";
import { useLocation, useNavigate } from "react-router-dom";
import Search from "@features/Search/Search";

const Navbar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathInRouteKey = Object.keys(ROUTES).find(
    (key) =>
      ROUTES[key as keyof typeof ROUTES] === location.pathname.replace("/", ""),
  ) as keyof typeof ROUTES;
  const defaultIndex = "route-" + pathInRouteKey;
  const [title, setTitle] = useState<string>(TRANSLATED_NAMES[pathInRouteKey]);

  useEffect(() => {
    document.title = `${title} | Расписание`;
  }, [title]);

  const onCLick = (key: keyof typeof ROUTES) => {
    setTitle(TRANSLATED_NAMES[key]);
    navigate(ROUTES[key]);
  };

  return (
    <Box
      as="nav"
      className="grid grid-cols-6 gap-[16px] [py-10px] justify-items-center"
    >
      <Box className="gap-[10px] col-start-1 col-end-4">
        <Typography className="mb-[10px]">Расписание</Typography>

        <TabListProvider defaultIndex={defaultIndex}>
          <TabList
            selectedVariant="primary"
            selectedClassName="w-auto py-0 h-[34px] py-[10px] rounded-[8px]"
            className="bg-gray-100 p-[10px] gap-[10px] grid grid-cols-4 rounded-[16px]"
          >
            {Object.keys(ROUTES).map((key: string) => {
              const title =
                TRANSLATED_NAMES[key as keyof typeof TRANSLATED_NAMES];

              return (
                <Button
                  variant="tertiary"
                  key={`route-${key}`}
                  id={`route-${key}`}
                  onClick={() => onCLick(key as keyof typeof TRANSLATED_NAMES)}
                  className="w-auto py-0 h-[34px] py-[10px] rounded-[8px]"
                >
                  {title}
                </Button>
              );
            })}
          </TabList>
        </TabListProvider>
      </Box>

      <Search className="col-start-4 col-end-6" />
    </Box>
  );
};

export default Navbar;
