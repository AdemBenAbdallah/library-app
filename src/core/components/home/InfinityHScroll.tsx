import { Icons } from "@/assets/Icons";
import useResponsive from "@/utils/useResponsive";
import { Box, rem } from "@mantine/core";
import React from "react";

const customStyles = {
  "--width": "150px",
  "--height": "50px",
  "--quantity": 3,
} as React.CSSProperties;

const InfinityHScroll = () => {
  const { isMobile } = useResponsive();
  return (
    <>
      <Box bg={"lime"} h={{ base: 50, md: 70 }} c="black.0" mb={{ base: rem(49), sm: rem(170) }}>
        <div className="slider" style={customStyles}>
          <div className="list">
            {[
              <Icons.program width={isMobile ? 150 : 250} key="program" />,
              <Icons.trainning width={isMobile ? 150 : 250} key="trainning" />,
              <Icons.program width={isMobile ? 150 : 250} key="program" />,
            ].map((Icon, idx) => (
              <div className="item" style={{ "--position": idx + 1 } as React.CSSProperties} key={idx}>
                {Icon}
              </div>
            ))}
          </div>
        </div>
      </Box>
    </>
  );
};

export default InfinityHScroll;
