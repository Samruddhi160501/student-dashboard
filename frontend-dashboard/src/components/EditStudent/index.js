import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import EditStudentStyles from "./EditStudentStyles";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/students/${id}`)
      .then((response) => {
        setName(response.data.name);
        setAge(response.data.age);
        setBranch(response.data.branch);
        setYear(response.data.year);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedStudent = {
      name,
      age,
      branch,
      year,
    };

    axios
      .put(`${process.env.REACT_APP_API_URL}/update/${id}`, updatedStudent)
      .then((res) => {
        console.log(res.data);
        setOpenSnackbar(true);
        setTimeout(() => {
          setOpenSnackbar(false);
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "age") setAge(value);
    if (name === "branch") setBranch(value);
    if (name === "year") setYear(value);
    setIsDirty(true);
  };

  return (
    <Box component="form" onSubmit={onSubmit} sx={EditStudentStyles.Container}>
      <Typography variant="h5" sx={EditStudentStyles.Heading}>
        Edit Student
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        required
        margin="normal"
        name="name"
        value={name}
        onChange={handleInputChange}
      />
      <TextField
        label="Age"
        variant="outlined"
        fullWidth
        required
        margin="normal"
        name="age"
        type="number"
        value={age}
        onChange={handleInputChange}
      />
      <TextField
        label="Branch"
        variant="outlined"
        fullWidth
        required
        margin="normal"
        name="branch"
        value={branch}
        onChange={handleInputChange}
      />
      <TextField
        label="Year"
        variant="outlined"
        fullWidth
        required
        margin="normal"
        name="year"
        type="number"
        value={year}
        onChange={handleInputChange}
      />
      <Box sx={EditStudentStyles.ButtonConatiner}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isDirty}
        >
          Update Student
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go to Home
        </Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Data updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditStudent;
