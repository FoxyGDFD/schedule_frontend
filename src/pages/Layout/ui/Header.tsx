import { FC } from "react";
import { Box, Button, Typography } from "simplify-dev";
import { useCheckbox } from "simplify-dev/hooks";
import Navbar from "./Navbar";
// import logo from "./assets/headerLogo.svg";

const Header: FC = () => {
  const [visible, changeVisibility] = useCheckbox(false, true);

  return (
    <Box as="header" className="my-[20px] mx-auto max-w-[1440px] w-full">
      <Box className="grid grid-cols-6 max-lg:grid-cols-2 grid-rows-1 gap-[16px] justify-items-center items-center">
        {/* <img src={logo} alt=" " className="col-span-1" /> */}
        <Typography className="col-span-1">Лого</Typography>
        <Button
          className="col-start-6 max-lg:col-start-2 w-auto h-auto text-nowrap"
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
