import { Group, GroupProps, Stack, StackProps } from "@mantine/core";
import React from "react";

type VerticalProps = StackProps & {
  debug?: boolean;
  fullH?: boolean;
  fullW?: boolean;
  w?: string | number;
  h?: string | number;
  children: React.ReactNode;
};
export const Vertical = ({ debug, fullH, fullW, w, h, children, ...props }: VerticalProps) => {
  const height = fullH ? "100%" : h ? h : "auto";
  const width = fullW ? "100%" : w ? w : "auto";

  return (
    <Stack {...props} w={width} h={height} style={{ border: debug ? "2px solid red" : "none" }}>
      {children}
    </Stack>
  );
};

type HorizontalProps = GroupProps & {
  debug?: boolean;
  fullH?: boolean;
  fullW?: boolean;
  children: React.ReactNode;
};
export const Horizontal = ({ debug, fullH, fullW, children, ...props }: HorizontalProps) => {
  return (
    <Group
      {...props}
      w={fullW ? "100%" : "auto"}
      h={fullH ? "100%" : "auto"}
      style={{ border: debug ? "2px solid yellow" : "none" }}
    >
      {children}
    </Group>
  );
};
