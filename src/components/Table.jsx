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
// import { AllDataTable } from "./AllDataTable";

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
  // const allDataPrintableTable = useRef();
  const classes = useStyles();
  const [data, setData] = useState({});
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
    TableData.map((table, index) => {
      const modifiedDataArray = [];
      let rowsCount = 0;
      TablePages.map((pageNumber) => {
        if (Array.isArray(table[pageNumber])) {
          table[pageNumber].map((rowData) => {
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
    setData(modifiedData);
  }, []);

  return (
    <Grid container direction="column">
      <Grid>
        <div>
          <h4 style={{ marginBottom: 0 }}>This is header.</h4>
          <h4 style={{ marginTop: 0, marginBottom: "5px" }}>Page {page + 1}</h4>
        </div>
        <TableContainer component={Paper} ref={printableTable}>
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
      </Grid>
      {/* <AllDataTable ref={allDataPrintableTable} /> */}
      <Grid
        style={{
          display: "flex",
          marginTop: "10px",
          flexDirection: "row-reverse",
        }}
      >
        {/* <ReactToPrint
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
          content={() => allDataPrintableTable.current}
        /> */}
        <ReactToPrint
          trigger={() => {
            return (
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
                endIcon={<SaveAltIcon />}
              >
                Export PDF
              </Button>
            );
          }}
          content={() => printableTable.current}
        />
      </Grid>
    </Grid>
  );
};