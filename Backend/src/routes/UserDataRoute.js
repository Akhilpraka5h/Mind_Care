const express = require("express"); // Import express

const {
  getUserData,
  getDoctorsData,
  PostUserData,
  UpdateUserData,
  deleteUserData,
  saveDrAppointmentId,
  deleteDrAppointmentId,
  userRoleData,
} = require("../controllers/UserDataController"); // Import UserDataController.js functions

const { UserAuth } = require("../middlewares/Authentication/UserAuth");

const router = express.Router();
// const middlewareFunction = (req, res, next) => {
//     // Middleware logic here
//     next(); // Call next to pass control to the next middleware function
//   };

//   // Use the middleware function with the use() method
//   app.use(middlewareFunction);

router.get("/user/profile", getUserData);

router.get("/doctors/profile", getDoctorsData);

router.post("/user/profile", PostUserData);

router.patch("/user/profile/:id", UpdateUserData);

router.put("/user/dr/id/save", saveDrAppointmentId);

router.get("/user/patientDetails", userRoleData);

router.delete("/user/profile/:userId", deleteUserData);

router.delete("/user/dr/id/delete", deleteDrAppointmentId);


module.exports = router;
