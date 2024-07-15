import { Loader, colorsTuple, createTheme } from "@mantine/core";
import { CssLoader } from "./cssLoader/CssLoader";

export const theme = createTheme({
  primaryColor: "brandy",
  colors: {
    brandy: colorsTuple("#957049"),
    custom: colorsTuple("#e9cfb2"),
    "ocean-blue": [
      "#7AD1DD",
      "#5FCCDB",
      "#44CADC",
      "#2AC9DE",
      "#1AC2D9",
      "#11B7CD",
      "#09ADC3",
      "#0E99AC",
      "#128797",
      "#147885",
    ],
    "bright-pink": [
      "#F0BBDD",
      "#ED9BCF",
      "#EC7CC3",
      "#ED5DB8",
      "#F13EAF",
      "#F71FA7",
      "#FF00A1",
      "#E00890",
      "#C50E82",
      "#AD1374",
    ],
  },
  components: {
    Button: {
      defaultProps: {
        w: "fit-content",
        size: "md",
      },
    },
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, custom: CssLoader },
        type: "custom",
      },
    }),
  },
  cursorType: "pointer",
  /** Put your mantine theme override here */
});
