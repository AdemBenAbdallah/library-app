import { Routes } from "@blitzjs/next";
import { Box, Button, Image } from "@mantine/core";
import Link from "next/link";
import React from "react";

const customStyles = {
  "--width": "150px",
  "--height": "200px",
  "--quantity": 11,
} as React.CSSProperties;

const InfinityHScroll = () => {
  return (
    <Box>
      <div className="slider" style={customStyles}>
        <div className="list">
          {Array(11)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="item" style={{ "--position": index + 1 } as React.CSSProperties}>
                <Image src={`/images/book-cover${index + 1}.jpg`} alt="hero" />
              </div>
            ))}
        </div>
      </div>
      <div className="slider reverse" style={customStyles}>
        <div className="list">
          {Array(11)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="item" style={{ "--position": index + 1 } as React.CSSProperties}>
                <Image src={`/images/book-cover${index + 1}.jpg`} alt="hero" />
              </div>
            ))}
        </div>
      </div>
      <Button
        component={Link}
        href={Routes.ProductsPage()}
        variant="subtle"
        td="underline"
        c="brandy"
        display={"block"}
        ml={"auto"}
      >
        See all
      </Button>
    </Box>
  );
};

export default InfinityHScroll;
