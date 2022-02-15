import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { styled } from "@mui/material/styles";
import lightTheme from "../../js/themes/lightTheme";
import LaunchIcon from "@mui/icons-material/Launch";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: lightTheme.palette.text,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  sim_id,
  sim_name,
  sim_created,
  sim_modified,
  sim_shared,
  sim_description,
  sim_blocks
) {
  return {
    sim_id,
    sim_name,
    sim_created,
    sim_modified,
    sim_shared,
    sim_description,
    sim_blocks,
    moreinfo: [
      {
        num_blocks: JSON.parse(sim_blocks),
        sim_shared: sim_shared,
        amount: 3,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  React.useEffect(() => {
    //console.log("row", row);
  }, []);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell>
          <IconButton
            sx={{ mr: 1 }}
            size="small"
            color="primary"
            component={Link}
            to={`${process.env.PUBLIC_URL}/simulation/${row.sim_id}`}
          >
            <LaunchIcon />
          </IconButton>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {row.sim_id}
        </StyledTableCell>
        <StyledTableCell align="right">{row.sim_name}</StyledTableCell>
        <StyledTableCell align="right">
          {new Intl.DateTimeFormat("en-US", options).format(
            new Date(row.sim_created)
          )}
        </StyledTableCell>
        <StyledTableCell align="right">
          {new Intl.DateTimeFormat("en-US", options).format(
            new Date(row.sim_modified)
          )}
        </StyledTableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="body1" gutterBottom component="div">
                <strong>Simulation Name:</strong> {row.sim_name}
              </Typography>
              <Typography variant="caption" sx={{ mb: 2 }}>
                <strong>Description:</strong> {row.sim_description}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Number of Blocks</TableCell>
                    <TableCell>Shared With</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.moreinfo.map((moreinfoRow) => (
                    <TableRow key={moreinfoRow.num_blocks}>
                      <TableCell component="th" scope="row">
                        {moreinfoRow.num_blocks}
                      </TableCell>
                      <TableCell>
                        {moreinfoRow.sim_shared
                          ? JSON.parse(moreinfoRow.sim_shared).email.map(
                              (email) => <div>{email}</div>
                            )
                          : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const SimTable = (props) => {
  const { table } = props;
  //console.log("Table", table.rows);
  const rows = [];

  table.rows.forEach((ele) =>
    rows.push(
      createData(
        ele.sim_id,
        ele.sim_name,
        ele.sim_created,
        ele.sim_modified,
        ele.sim_shared != "{}" ? ele.sim_shared : "",
        ele.sim_description,
        ele.sim_blocks ? JSON.parse(ele.sim_blocks).length : "0"
      )
    )
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Date Created</StyledTableCell>
            <StyledTableCell align="right">Last Modified</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.sim_id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimTable;
