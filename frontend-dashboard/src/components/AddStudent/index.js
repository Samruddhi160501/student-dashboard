import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import AddStudentStyles from "./AddStudentStyles";
import { Link } from "react-router-dom";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Check if any field has been changed
  const isFormValid = name && age && branch && year;

  const onSubmit = (e) => {
    e.preventDefault();

    const newStudent = {
      name,
      age,
      branch,
      year,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/add`, newStudent)
      .then((res) => {
        console.log(res.data);
        setOpenSnackbar(true);
        // Clear form fields
        setName("");
        setAge("");
        setBranch("");
        setYear("");
        // Close snackbar after 3 seconds
        setTimeout(() => {
          setOpenSnackbar(false);
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box component="form" onSubmit={onSubmit} sx={AddStudentStyles.Container}>
      <Typography sx={AddStudentStyles.Heading} variant="h5">
        Add New Student
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Age"
        variant="outlined"
        required
        value={age}
        type="number"
        onChange={(e) => setAge(e.target.value)}
      />
      <TextField
        label="Branch"
        variant="outlined"
        required
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
      />
      <TextField
        label="Year"
        variant="outlined"
        required
        value={year}
        type="number"
        onChange={(e) => setYear(e.target.value)}
      />
      <Box sx={AddStudentStyles.ButtonContainer}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isFormValid} // Disable the button if any field is empty
        >
          Add Student
        </Button>
        <Link to="/">
          <Button
            variant="outlined"
            color="secondary"
            sx={AddStudentStyles.CancelButton}
          >
            Go to Home
          </Button>
        </Link>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Student added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddStudent;
