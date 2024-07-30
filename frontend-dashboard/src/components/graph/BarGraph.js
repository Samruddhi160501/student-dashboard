import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Box, Typography } from "@mui/material";

const BarGraph = ({ data, selectedYear }) => (
  <Box sx={{ marginBottom: 3, paddingTop: 2 }}>
    <Typography variant="h6" gutterBottom>
      Students by Branch for Year {selectedYear}
    </Typography>
    <BarChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 35 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="branch" angle={-25} textAnchor="end" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill={`#1976d2`} />
    </BarChart>
  </Box>
);

export default BarGraph;
