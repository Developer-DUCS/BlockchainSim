import React from "react";
import {
  Alert,
  Button,
  Checkbox,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";

const eanTheme1 = createTheme({
  palette: {
    primary: { main: "#5CB0C8", light: "#7DD0D3", dark: "#4A8DA0" },
    secondary: { main: "#A68759", light: "#D89F7A", dark: "#856C47" },
    error: { main: "#E8846E", light: "#ED9D8A", dark: "#BA6A57" },
    warning: { main: "#E8846D", light: "#67339b", dark: "#53297d" },
    info: { main: "#C1C8E4", light: "#CD3E9", dark: "#9AA0B6" },
    success: { main: "#A6E83F", light: "#B8ED65", dark: "#85BA32" },
    background: { paper: "#fff", default: "#F8F8F8" },
    text: {
      primary: "#000",
      secondary: "#000",
      disabled: "#000",
    },
  },
});

const eanTheme2 = createTheme({
  palette: {
    primary: { main: "#d8c557", light: "#DCCB68", dark: "#c2b14e" },
    secondary: { main: "#50714D", light: "#738D71", dark: "#405A3E" },
    error: { main: "#E8846E", light: "#ED9D8a", dark: "#BA6A57" },
    warning: { main: "#8F56B0", light: "#A578C0", dark: "#72458D" },
    info: { main: "#B6A35F", light: "#C5B57F", dark: "#92824C" },
    success: { main: "#A6E83F", light: "#B8ED65", dark: "#85BA32" },
    background: { paper: "#fff", default: "#FAF9F6" },
    text: {
      primary: "#000",
      secondary: "#000",
      disabled: "#000",
    },
  },
});

const sethTheme = createTheme({
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
      secondary: "#011627",
      disabled: "#011627",
    },
  },
});

const Demo = (props) => {
  const { setTheme } = props;
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" textAlign="center">
        Theme Demo
      </Typography>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{ mb: 2 }}
      >
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Button
                onClick={() => {
                  setTheme(eanTheme1);
                }}
                variant="contained"
              >
                Theme 1
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                onClick={() => {
                  setTheme(eanTheme2);
                }}
                variant="contained"
              >
                Theme 2
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                onClick={() => {
                  setTheme(sethTheme);
                }}
                variant="contained"
              >
                Theme 3
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }} elevation={2}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Button color="primary" fullWidth>
                  Primary
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button color="primary" variant="contained" fullWidth>
                  Primary
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button color="primary" variant="outlined" fullWidth>
                  Primary
                </Button>
              </Grid>
              {/* Secondary */}
              <Grid item xs={4}>
                <Button color="secondary" fullWidth>
                  Secondary
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button color="secondary" variant="contained" fullWidth>
                  Secondary
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button color="secondary" variant="outlined" fullWidth>
                  Secondary
                </Button>
              </Grid>
              {/* Success */}
              <Grid item xs={4}>
                <Button color="success" fullWidth>
                  Success
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button color="success" variant="contained" fullWidth>
                  Success
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button color="success" variant="outlined" fullWidth>
                  Success
                </Button>
              </Grid>
              {/* Error */}
              <Grid item xs={4}>
                <Button color="error" fullWidth>
                  Error
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button color="error" variant="contained" fullWidth>
                  Error
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button color="error" variant="outlined" fullWidth>
                  Error
                </Button>
              </Grid>
              {/* Warning */}
              <Grid item xs={4}>
                <Button color="warning" fullWidth>
                  Warning
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button color="warning" variant="contained" fullWidth>
                  Warning
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button color="warning" variant="outlined" fullWidth>
                  Warning
                </Button>
              </Grid>
              {/* Info */}
              <Grid item xs={4}>
                <Button color="info" fullWidth>
                  Info
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button color="info" variant="contained" fullWidth>
                  Info
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button color="info" variant="outlined" fullWidth>
                  Info
                </Button>
              </Grid>
              {/* Divider */}
              <Grid item xs={12}>
                <Divider />
              </Grid>
              {/* Alerts */}
              <Grid item xs={12}>
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="error">
                    This is an error alert — check it out!
                  </Alert>
                  <Alert severity="warning">
                    This is a warning alert — check it out!
                  </Alert>
                  <Alert severity="info">
                    This is an info alert — check it out!
                  </Alert>
                  <Alert severity="success">
                    This is a success alert — check it out!
                  </Alert>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }} elevation={2}>
            <Grid container spacing={4}>
              {/* TextFields */}
              <Grid item xs={6}>
                <TextField
                  label="Textfield"
                  fullWidth
                  variant="outlined"
                  helperText="HelperText"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Textfield"
                  fullWidth
                  variant="filled"
                  helperText="HelperText"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Textfield"
                  fullWidth
                  variant="outlined"
                  helperText="HelperText"
                  error
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Textfield"
                  fullWidth
                  variant="filled"
                  helperText="HelperText"
                  error
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Textfield"
                  fullWidth
                  variant="outlined"
                  color="success"
                  focused
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Textfield"
                  fullWidth
                  variant="filled"
                  color="success"
                  focused
                />
              </Grid>
              {/* Divider */}
              <Grid item xs={12}>
                <Divider />
              </Grid>
              {/* CheckBox's */}
              <Grid item xs={12} textAlign="center">
                <Checkbox defaultChecked />
                <Checkbox defaultChecked color="secondary" />
                <Checkbox defaultChecked color="success" />
                <Checkbox defaultChecked color="error" />
                <Checkbox defaultChecked color="warning" />
                <Checkbox defaultChecked color="info" />
                <Checkbox defaultChecked color="default" />
              </Grid>
              {/* Chips */}
              <Grid item xs={12}>
                <Stack direction="row" spacing={1}>
                  <Chip label="primary" color="primary" />
                  <Chip label="success" color="success" />
                  <Chip label="error" color="error" />
                  <Chip label="warning" color="warning" />
                  <Chip label="info" color="info" />
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Demo;
