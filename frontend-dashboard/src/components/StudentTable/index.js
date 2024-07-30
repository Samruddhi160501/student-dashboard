import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import StudentTableStyles from "./StudentTableStyles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const StudentTable = ({}) => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/students`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteStudent = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/students/` + id)
      .then((response) => {
        console.log(response.data);
        setStudents(students.filter((el) => el._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 150, fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell sx={{ width: 100, fontWeight: "bold" }}>Age</TableCell>
              <TableCell sx={{ width: 150, fontWeight: "bold" }}>
                Branch
              </TableCell>
              <TableCell sx={{ width: 100, fontWeight: "bold" }}>
                Year
              </TableCell>
              <TableCell sx={{ width: 100, fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.age}</TableCell>
                  <TableCell>{student.branch}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>
                    <Link to={`/edit/${student._id}`}>
                      <Button variant="contained" startIcon={<EditIcon />}>
                        Edit
                      </Button>
                    </Link>{" "}
                    <Button
                      startIcon={<DeleteIcon />}
                      color="primary"
                      variant="contained"
                      onClick={() => deleteStudent(student._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={StudentTableStyles.PaginationContainer}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={StudentTableStyles.Pagination}
        />
      </Box>
    </Paper>
  );
};

export default StudentTable;
