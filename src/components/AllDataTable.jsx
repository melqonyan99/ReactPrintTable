import React, { useEffect, useState } from "react";
import { TableData, TablePages } from "../data/TableData";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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

export const AllDataTable = React.forwardRef((props, ref) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const rowsCountArr = [];
    const modifiedDataArray = [];
    TableData.map((table, index) => {
      TablePages.map((pageNumber) => {
        if (Array.isArray(table[pageNumber])) {
          table[pageNumber].map((rowData) => {
            modifiedDataArray.push(rowData);
          });
        } else {
          modifiedDataArray.push(table[pageNumber]);
        }
      });
    });
    console.log(modifiedDataArray);
    setData(modifiedDataArray);
  }, []);
  return (
    <TableContainer

      ref={ref}
      component={Paper}
    >
      <Table aria-label="simple table">
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
          {data &&
            data.map((row) => (
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
  );
});
