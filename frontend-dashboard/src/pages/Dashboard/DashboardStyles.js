const DashboardStyles = {
  Container: {
    padding: 3,
    justifyContent: "flex-start",
    textAlign: "center",
    marginTop: "3%",
  },
  Heading: {
    fontSize: "2.5rem",
    fontWeight: 600,
  },
  GraphContainer: {
    display: "flex",
    justifyContent: "flex-start",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  },
  GraphjsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2, // Adds space between the charts
  },
  ChartWrapper: {
    width: "100%", // Full width of the parent container
    maxWidth: "800px", // Optional: limits the maximum width of the chart
    height: "300px", // Optional: sets a fixed height for the chart
  },
};
export default DashboardStyles;
