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
      ROUTES[key as keyof typeof ROUTES] ===
      location.pathname.replace(/\/|[0-9]/gi, ""),
  ) as keyof typeof ROUTES;

  const [defaultIndex, setIndex] = useState("route-" + pathInRouteKey);
  const [title, setTitle] = useState<string>(TRANSLATED_NAMES[pathInRouteKey]);

  useEffect(() => {
    setIndex("route-" + pathInRouteKey);
    document.title = `${title} | Расписание`;
  }, [title, pathInRouteKey]);

  const onCLick = (key: keyof typeof ROUTES) => {
    setTitle(TRANSLATED_NAMES[key]);
    navigate(ROUTES[key]);
  };

  return (
    <Box as="nav" className="grid grid-cols-6 gap-[16px] my-[20px] px-[20px]">
      <Box className="gap-[10px] col-start-1 col-end-4 max-lg:!col-span-3 max-lg:col-end-3 max-md:!col-start-1 max-md:!col-span-6">
        <Typography className="pb-[10px]">Расписание</Typography>

        <TabListProvider defaultIndex={defaultIndex}>
          <TabList
            selectedVariant="primary"
            selectedClassName="w-auto py-0 h-[34px] py-[10px] rounded-[8px]"
            className="bg-gray-100 p-[10px] gap-[10px] grid grid-cols-4 rounded-[16px] max-lg:!grid-cols-2"
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

      <Search className="col-start-5 col-end-7 max-lg:col-start-4 max-lg:col-end-7 max-sm:!col-start-1 max-md:!col-span-6" />
    </Box>
  );
};

export default Navbar;
