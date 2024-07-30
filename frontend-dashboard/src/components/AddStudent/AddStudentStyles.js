const AddStudentStyles = {
  Container: {
    margin: "20%",
    marginTop: "3%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  Heading: {
    fontSize: "2.5rem",
    fontWeight: 600,
  },
  ButtonContainer: {
    display: "flex",
    textAlign: "center",
    gap: 3,
  },
  CancelButton: {
    marginLeft: "2%",
    border: "1px solid #1976d2",
    color: "#1976d2",
    textWrap: "nowrap",
    "&:hover": {
      backgroundColor: "#1976d2",
      color: "white",
      border: "none",
    },
  },
};

export default AddStudentStyles;
