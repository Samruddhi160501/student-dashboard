const EditStudentStyles = {
  Container: {
    margin: "20%",
    marginTop: "3%",
    textAlign: "center",
  },
  Heading: {
    fontSize: "2.5rem",
    fontWeight: 600,
  },
  Button: {
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
  ButtonConatiner: { display: "flex", gap: 3, marginTop: 2 },
};

export default EditStudentStyles;
