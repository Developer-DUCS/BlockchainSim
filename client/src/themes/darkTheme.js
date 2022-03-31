import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  mode: "dark",
  palette: {
    primary: { main: "#A40606", light: "#3d93a5", dark: "#337989" },
    secondary: { main: "#06AED5", light: "#e17859", dark: "#A30000" },
    tertiary: { main: "#33315E" },
    quad: { main: "#FED766" },
    error: { main: "#BC2C1A", light: "#cd301c", dark: "#ab2818" },
    warning: { main: "#5D2E8C", light: "#67339b", dark: "#53297d" },
    info: { main: "#9D8420", light: "#ad9223", dark: "#8d761d" },
    success: { main: "#127E59", light: "#148f65", dark: "#106d4d" },
    background: { paper: "#554F69", default: "#202030" },
    text: {
      primary: "#fffcf7",
      secondary: "#fff5e3",
      disabled: "#ffedd0",
    },
  },
});

export default darkTheme;
