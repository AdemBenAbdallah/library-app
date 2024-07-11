import React from "react";
import { Vertical } from "./MantineLayout";
import { Loader } from "@mantine/core";

const FullPageLoader = () => {
  return (
    <Vertical fullH fullW align="center" justify="center">
      <Loader />
    </Vertical>
  );
};

export default FullPageLoader;
