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

const Demo = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" textAlign="center">
        Theme Demo
      </Typography>
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
