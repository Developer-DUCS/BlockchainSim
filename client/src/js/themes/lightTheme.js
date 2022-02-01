import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    primary: { main: "#388697", light: "#3d93a5", dark: "#337989" },
    secondary: { main: "#DE6B48", light: "#e17859", dark: "#db5e37" },
    error: { main: "#BC2C1A", light: "#cd301c", dark: "#ab2818" },
    warning: { main: "#5D2E8C", light: "#67339b", dark: "#53297d" },
    info: { main: "#9D8420", light: "#ad9223", dark: "#8d761d" },
    success: { main: "#127E59", light: "#148f65", dark: "#106d4d" },
    background: { paper: "#fffcf7", default: "#f7faff" },
    text: {
      primary: "#011627",
      secondary: "#022c4d",
      disabled: "#034174",
    },
  },
  paperContainer: {
    backgroundImage: `url(${"../assets/main_background.png"})`,
  },
});

export default lightTheme;
