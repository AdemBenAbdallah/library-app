import { em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const useResponsive = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(480)})`);
  const isTablet = useMediaQuery(`(max-width: ${em(780)})`);
  const isComputer = useMediaQuery(`(max-width: ${em(1200)})`);

  return { isMobile, isTablet, isComputer };
};

export default useResponsive;
