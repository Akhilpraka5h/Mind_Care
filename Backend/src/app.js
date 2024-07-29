// import express from 'express';  // Import express
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const stringSimilarity = require("string-similarity");
require("dotenv").config(); // Import dotenv package to load environment variables
const { Server } = require("socket.io");

const UserDataRoute = require("./routes/UserDataRoute");
const UserLoginRoute = require("./routes/UserLoginRoute");
const userLocationRouter = require("./routes/userLocationRouter");
const userAssessmentRouter = require("./routes/userAssessmentRouter");
const AdminAssessmentRouter = require("./routes/AdminAssessmentRouter");

const DrAppointmentRouter = require("./routes/DrAppointmentRouter");
const AiAssessmentRouter = require("./routes/AiAssessmentRouter");
const {
  userRoleData,
  deleteUserData,
} = require("./controllers/UserDataController");
const {
  getStatusAppointment,
} = require("./controllers/DrAppointment.controller");

const Port = 3000; // Port number
const app = express(); // Create express app

app.use(express.static("public"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", UserDataRoute); // Use UserDataRoute.js for all routes starting with /api
app.use("/api", UserLoginRoute);
app.use("/api", userAssessmentRouter);
app.use("/api", AdminAssessmentRouter);
app.use("/api", DrAppointmentRouter);
app.use("/api", AiAssessmentRouter);

app.use(cors());

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `mongodb+srv://sinanmv234:34SaKyUsLq84mP7I@cluster0.zpdseq1.mongodb.net/mindCare?retryWrites=true&w=majority&appName=Cluster0`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};
const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5000", // Replace with your React app's origin
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("User connected");
    // You can handle socket events here
    socket.on("userMessage", async (message) => {
      // Process the message or delegate to  controller
      const response = await chatWithAiController(message, socket);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

    // Handle errors
    socket.on("error", (error) => {
      console.error("Socket.IO error:", error);
    });
  });

  return io;
};

const server = http.createServer(app); // Create a server using express app

const io = initializeSocket(server);

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// user profile routes

app.get("/user/profile", UserDataRoute);

app.get("/doctors/profile", UserDataRoute);

app.post("/user/profile", UserDataRoute);

app.patch("/user/profile/:id", UserDataRoute);

app.delete("/user/profile/:id", UserDataRoute);

app.put("/user/dr/id/save", UserDataRoute);

app.delete("/user/dr/id/delete", UserDataRoute);

app.get("/user/patientDetails", userRoleData);

app.delete("/user/profile/:userId", deleteUserData);
// user login routes

app.post("/user/login", UserLoginRoute);

// user forgot password routes

app.post("/user/forgot-password", UserLoginRoute);

// user reset password routes
app.post("/user/reset-password", UserLoginRoute);

// user verify otp routes
app.post("/user/verify-otp", UserLoginRoute);

// user location
app.post("/location", userLocationRouter);

//user assessment
app.post("/user/userAssessment/save", userAssessmentRouter);

app.get("/user/userAssessment/question", userAssessmentRouter);

app.post("/user/userAssessment/submit", userAssessmentRouter);

//Admin CRUD
// app.post('/admin/assessment/save', AdminAssessmentRouter)

app.get("/admin/assessment/get", AdminAssessmentRouter);

app.patch("/admin/assessment/update", AdminAssessmentRouter);

app.delete("/admin/assessment/delete", AdminAssessmentRouter);

app.put("/admin/assessment/putdata", AdminAssessmentRouter);

//DR appointment
app.get("/dr/appointment/details", DrAppointmentRouter);

app.post("/dr/req/save", DrAppointmentRouter);

app.put("/dr/req/acceptstatus", DrAppointmentRouter);

app.delete("/dr/appointment/delete", DrAppointmentRouter);

//AI assessment
app.get("/ai/assessment/:token", AiAssessmentRouter);

app.get("/patient/reqstatus", getStatusAppointment);

const httpServer = server.listen(Port, () =>
  console.log(`Server running on port: http://localhost:${Port}`)
); // Start the server
