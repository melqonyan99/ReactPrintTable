import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { TableData, TablePages } from "../data/TableData";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import ReactToPrint from "react-to-print";
import { Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const columns = [
  { id: "town", label: "Town", minWidth: 150 },
  { id: "classification", label: "Classification", minWidth: 150 },
  { id: "full_name", label: "Full Name", minWidth: 150 },
  { id: "contact_no", label: "Contact No", minWidth: 150 },
];

export const TableComponent = () => {
  const printableTable = useRef();
  const allDataPrintableTable = useRef();
  const classes = useStyles();
  const [isShowedPaginatedTable, setIsShowedPaginatedTable] = useState(true);
  const [data, setData] = useState({});
  const [fullData, setFullData] = useState([]);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
  };

  useEffect(() => {
    console.log(TableData);
    const rowsCountArr = [];
    let modifiedData = {};
    TableData.forEach((table, index) => {
      const modifiedDataArray = [];
      let rowsCount = 0;
      TablePages.forEach((pageNumber) => {
        if (Array.isArray(table[pageNumber])) {
          table[pageNumber].forEach((rowData) => {
            rowsCount++;
            modifiedDataArray.push(rowData);
          });
        } else {
          rowsCount++;
          modifiedDataArray.push(table[pageNumber]);
        }
      });
      rowsCountArr.push(rowsCount);
      modifiedData[index] = modifiedDataArray;
    });

    const modifiedDataArray = [];
    TableData.forEach((table, index) => {
      TablePages.forEach((pageNumber) => {
        if (Array.isArray(table[pageNumber])) {
          table[pageNumber].forEach((rowData) => {
            modifiedDataArray.push(rowData);
          });
        } else {
          modifiedDataArray.push(table[pageNumber]);
        }
      });
    });

    setFullData(modifiedDataArray);
    setData(modifiedData);
    console.log(modifiedData);
  }, []);

  const handlePageChange = (e) => {
    setPage(e.target.value);
  };

  const beforePrinting = async () => {
    await setIsShowedPaginatedTable(false);
  };

  const afterPrinting = () => {
    setIsShowedPaginatedTable(true);
  };

  return (
    <Grid container direction="column">
      <Grid
        ref={printableTable}
        style={{
          display: isShowedPaginatedTable ? "initial" : "none",
        }}
      >
        <div className="header">
          <h4 style={{ marginBottom: 0 }}>This is header.</h4>
          <h4 style={{ marginTop: 0, marginBottom: "5px" }}>Page {page + 1}</h4>
        </div>
        <TableContainer
          style={{
            boxShadow: "0px 0px 5px -3px",
          }}
          className="table"
          component={Paper}
        >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data[page] &&
                data[page].map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.town}
                    </TableCell>
                    <TableCell>{row.classification}</TableCell>
                    <TableCell>{row.full_name}</TableCell>
                    <TableCell>{row.contact_number}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <div
        ref={allDataPrintableTable}
        style={{
          display: !isShowedPaginatedTable ? "table" : "none",
          width: "100%",
        }}
      >
        {Object.keys(data).map((key, index) => {
          return (
            <div className="pagebreak" style={{ width: "100%" }}>
              <div className="header">
                <h4 style={{ marginBottom: 0 }}>This is header.</h4>
                <h4 style={{ marginTop: 0, marginBottom: "5px" }}>
                  Page {index + 1}
                </h4>
              </div>
              <TableContainer component={Paper} style={{ width: "100%" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            fontWeight: "bold",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data[key].map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.town}
                        </TableCell>
                        <TableCell>{row.classification}</TableCell>
                        <TableCell>{row.full_name}</TableCell>
                        <TableCell>{row.contact_number}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          );
        })}
      </div>

      {/* <TableContainer ref={allDataPrintableTable} component={Paper}>
        <Table
          style={{ display: !isShowedPaginatedTable ? "table" : "none" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {fullData &&
              fullData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.town}
                  </TableCell>
                  <TableCell>{row.classification}</TableCell>
                  <TableCell>{row.full_name}</TableCell>
                  <TableCell>{row.contact_number}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <TablePagination
          component="div"
          count={TableData.length}
          page={page}
          rowsPerPage={1}
          labelDisplayedRows={() => {
            return `Page ${page + 1}`;
          }}
          rowsPerPageOptions={[1]}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Select value={page} onChange={handlePageChange}>
          {TableData.map((value, index) => {
            return (
              <MenuItem key={index} value={index}>
                {index + 1}
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <Grid
        style={{
          display: "flex",
          marginTop: "10px",
          flexDirection: "row-reverse",
        }}
      >
        <ReactToPrint
          trigger={() => {
            return (
              <Button
                variant="contained"
                color="primary"
                endIcon={<SaveAltIcon />}
              >
                Export All Data
              </Button>
            );
          }}
          onBeforeGetContent={() => beforePrinting()}
          onAfterPrint={() => afterPrinting()}
          content={() => allDataPrintableTable.current}
        />
        <ReactToPrint
          trigger={() => {
            return (
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
                endIcon={<SaveAltIcon />}
              >
                Print Page {page + 1}
              </Button>
            );
          }}
          content={() => printableTable.current}
        />
      </Grid>
    </Grid>
  );
};
