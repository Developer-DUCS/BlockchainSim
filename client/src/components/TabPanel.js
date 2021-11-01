import { Box } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return <div {...other}>{value === index && <Box>{children}</Box>}</div>;
}

export default TabPanel;
