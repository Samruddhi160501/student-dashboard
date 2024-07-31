import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import BarGraph from "../../components/graph/BarGraph";
import PieChartComponent from "../../components/graph/PieChart";
import DashboardStyles from "./DashboardStyles";

const Dashboard = () => {
  const [branchData, setBranchData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2024");

  useEffect(() => {
    axios
      .get(`https://student-dashboard-server.vercel.app/students`)
      .then((response) => {
        const students = response.data;

        // Process data for the bar chart
        const branchCount = students.reduce((acc, student) => {
          const { branch, year } = student;
          if (!acc[branch]) {
            acc[branch] = {};
          }
          if (!acc[branch][year]) {
            acc[branch][year] = 0;
          }
          acc[branch][year] += 1;
          return acc;
        }, {});

        // Convert branchCount to an array suitable for the bar chart
        const branchData = Object.keys(branchCount).map((branch) => ({
          branch,
          ...Object.keys(branchCount[branch]).reduce((acc, year) => {
            acc[year] = branchCount[branch][year];
            return acc;
          }, {}),
        }));

        setBranchData(branchData);

        // Get unique years for the dropdown
        const uniqueYears = [
          ...new Set(students.map((student) => student.year)),
        ].sort();
        setYears(uniqueYears);

        // Process data for the pie chart
        const branchSummary = Object.keys(branchCount).map((branch) => ({
          name: branch,
          value: Object.values(branchCount[branch]).reduce(
            (sum, count) => sum + count,
            0
          ),
        }));

        setYearlyData(branchSummary);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // Filter branchData based on the selected year
  const filteredBranchData = selectedYear
    ? branchData.map((item) => ({
        branch: item.branch,
        count: item[selectedYear] || 0,
      }))
    : [];

  return (
    <Box sx={DashboardStyles.Container}>
      <Typography variant="h4" gutterBottom sx={DashboardStyles.Heading}>
        Student Dashboard using Material Ui Charts
      </Typography>

      <FormControl sx={{ minWidth: 120, marginBottom: 3 }}>
        <InputLabel id="year-select-label">Year</InputLabel>
        <Select
          labelId="year-select-label"
          id="year-select"
          value={selectedYear}
          label="Year"
          onChange={handleYearChange}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={DashboardStyles.GraphContainer}>
        {selectedYear && (
          <BarGraph data={filteredBranchData} selectedYear={selectedYear} />
        )}

        <PieChartComponent data={yearlyData} />
      </Box>
    </Box>
  );
};

export default Dashboard;
