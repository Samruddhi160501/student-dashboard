const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// CORS Configuration
const corsOptions = {
   origin: "https://student-dashboard-app.vercel.app"
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://samruddhi16:Samruddhi%4016052001@cluster0.lvuzwmh.mongodb.net/studentdb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

// Routes
const studentRoutes = require("./routes/student.routes");
app.use("/students", studentRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
