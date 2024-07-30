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
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import DashboardStyles from "./DashboardStyles";

//necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardTwo = () => {
  const [branchData, setBranchData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2024");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/students`)
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

  // Prepare data for Bar chart
  const barChartData = {
    labels: filteredBranchData.map((item) => item.branch),
    datasets: [
      {
        label: `Student Count in ${selectedYear}`,
        data: filteredBranchData.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for Pie chart
  const pieChartData = {
    labels: yearlyData.map((item) => item.name),
    datasets: [
      {
        label: "Total Students by Branch",
        data: yearlyData.map((item) => item.value),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={DashboardStyles.Container}>
      <Typography variant="h4" gutterBottom sx={DashboardStyles.Heading}>
        Student Dashboard using ChartJS
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
          <Box sx={DashboardStyles.ChartWrapper}>
            <Bar
              data={barChartData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </Box>
        )}

        <Box sx={DashboardStyles.ChartWrapper}>
          <Pie
            data={pieChartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardTwo;
