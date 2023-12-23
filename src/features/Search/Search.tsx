import { FC, useState } from "react";
import { Box, Button, Input, Typography } from "simplify-dev";
import { useDebounce } from "simplify-dev/hooks";
import useSearch from "@entities/search/hooks/useSearch";
import useGetLessons from "@/entities/lesson/hooks/useGetLessons";

const Search: FC<{ className: string }> = ({ className }) => {
  const [value, setValue] = useState<string>("");
  const debounced = useDebounce(value, 500);
  const { data, name } = useSearch(debounced);

  const [fetch, setFetched] = useState<number | null>(null);
  useGetLessons(fetch);

  const onClick = (id) => {
    setFetched(id);
  };
  return (
    <Box className={className + " w-full"}>
      <Typography className="mb-[10px]">Поиск</Typography>

      <Box className="border-[2px] border-[#B3B5BB] p-[10px] my-[10px] rounded-[10px] w-full">
        <Input
          onChange={(e) => setValue(e.target.value)}
          className="w-full"
          placeholder={`Введите название ${name}`}
        />
      </Box>
      <Box>
        {data?.map(({ id, name }) => (
          <Button key={id} id={id} onClick={() => onClick(id)}>
            {name}
          </Button>
        ))}
        {!data?.length && debounced && (
          <Typography>Ничего не найдено</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Search;
