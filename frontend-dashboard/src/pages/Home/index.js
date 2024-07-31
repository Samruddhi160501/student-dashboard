import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Modal, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StudentTable from "../../components/StudentTable";
import HomeStyles from "./HomeStyles";
import axios from "axios";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function Home() {
  const [students, setStudents] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const handleDeleteStudent = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/students/${id}`)
      .then((response) => {
        setStudents((prevStudents) =>
          prevStudents.filter((el) => el._id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchStudents = () => {
    axios
      .get(`https://student-dashboard-beta.vercel.app/students`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Box sx={HomeStyles.Container}>
      <Typography sx={HomeStyles.Heading} variant="h4">
        Student Database
      </Typography>
      <Box sx={HomeStyles.ButtonContainer}>
        <Link to="/addstudent">
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            sx={HomeStyles.AddButton}
          >
            Add New Student
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button
            endIcon={<KeyboardArrowRightIcon />}
            variant="contained"
            sx={HomeStyles.DashboardButton}
          >
            View Dashboard
          </Button>
        </Link>
        <Link to="/dashboard2">
          <Button
            endIcon={<KeyboardArrowRightIcon />}
            variant="contained"
            sx={HomeStyles.DashboardButton}
          >
            View Second Dashboard
          </Button>
        </Link>
      </Box>
      <StudentTable
        students={students}
        pageSize={pageSize}
        setPageSize={setPageSize}
        onDeleteStudent={handleDeleteStudent}
      />
    </Box>
  );
}

export default Home;
