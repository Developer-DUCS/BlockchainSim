import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import BlockComponent from "./BlockComponent";

const datagrid = (props) => {
  const { blocks, setSelectedTransaction } = props;

  const [rows, setRows] = React.useState([]);
  const [cols, setCols] = React.useState([]);

  React.useEffect(() => {
    let rowTemp = { id: 1 };
    let columnsTemp = [];
    blocks.map((block, index) => {
      rowTemp[index] = index;
    });

    blocks.map((block, index) => {
      columnsTemp.push({
        field: index,
        headerName: "",
        width: 515,
        renderCell: (params) => (
          <div>
            <Box
              sx={{ mb: 2, mt: 2, mr: 2 }}
              style={{ display: "inline-block", width: "500px" }}
            >
              {
                <BlockComponent
                  block={block}
                  setSelectedTransaction={setSelectedTransaction}
                />
              }
            </Box>
          </div>
        ),
      });
    });
    setRows([rowTemp]);
    setCols(columnsTemp);
  }, [blocks]);

  return (
    <div style={{ height: 375, marginBottom: 12 }}>
      <DataGrid
        rowHeight={350}
        headerHeight={0}
        rows={rows}
        columns={cols}
        hideFooter={true}
        disableSelectionOnClick
      />
    </div>
  );
};

export default datagrid;
