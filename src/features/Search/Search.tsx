import { FC, useState } from "react";
import { Box, Button, Input, Typography } from "simplify-dev";
import { useDebounce } from "simplify-dev/hooks";
import useSearch from "@entities/search/hooks/useSearch";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";

interface SeatchedItem {
  id: number;
  name: string;
}

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
};

const Search: FC<{ className: string }> = ({ className }) => {
  const [value, setValue] = useState<string>("");
  const debounced = useDebounce(value, 500);
  const { data, name } = useSearch(debounced);

  const navigate = useNavigate();
  const location = useLocation();

  const onClick = (id: number) => {
    setOpened(false);
    navigate(`/${location.pathname.replace(/\/|[0-9]/gi, "")}/${id}`);
  };

  const [opened, setOpened] = useState<boolean>(false);

  const ref = useOutsideClick(() => setOpened(false));

  useEffect(() => setOpened(true), [data]);

  return (
    <Box className={className + " w-full relative"}>
      <Typography className="mb-[10px]">Поиск</Typography>

      <Box className="border-[2px] border-[#B3B5BB] p-[10px] my-[10px] rounded-[10px] w-full">
        <Input
          onChange={(e) => setValue(e.target.value)}
          className="w-full"
          placeholder={`Введите название ${name}`}
        />
      </Box>
      {data && opened && (
        <Box
          ref={ref}
          className="absolute top-[80px] left-0 w-full max-h-[150px] overflow-auto bg-gray-200 rounded-[12px] p-[10px] gap-[10px] flex flex-col z-5"
        >
          {data?.map(({ id, name }: SeatchedItem) => (
            <Button
              key={id}
              variant="tertiary"
              className="hover:bg-[#2358e1] hover:text-white h-auto"
              onClick={() => onClick(id)}
            >
              {name}
            </Button>
          ))}
          {!data?.length && debounced && (
            <Typography>Ничего не найдено</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Search;
