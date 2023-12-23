import { FC } from "react";
import { Box, Button } from "simplify-dev";
import { useCheckbox } from "simplify-dev/hooks";
import Navbar from "./Navbar";
import logo from "./assets/headerLogo.svg";

const Header: FC = () => {
  const [visible, changeVisibility] = useCheckbox(false, true);

  return (
    <Box as="header" className="my-[20px] mx-auto max-w-[1440px] w-full">
      <Box className="grid grid-cols-6 grid-rows-1 gap-[16px] justify-items-center items-center">
        <img src={logo} alt=" " className="col-span-1" />
        <Button
          className="col-start-6 w-auto h-auto"
          onClick={changeVisibility}
          variant="secondary"
          buttonType="text"
        >
          {visible ? "Скрыть меню" : "Показать меню"}
        </Button>
      </Box>
      {visible && <Navbar />}
    </Box>
  );
};

export default Header;
