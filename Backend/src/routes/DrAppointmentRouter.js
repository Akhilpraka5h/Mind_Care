const express = require("express");
const router = express.Router();
const {
  getAppointmentDetails,
  saveRequest,
  saveAcceptStatus,
  deleteAppointmentDetails,
} = require("../controllers/DrAppointment.controller");

//assessment data sending to DB
router.get("/dr/appointment/details", getAppointmentDetails);

router.post("/dr/req/save", saveRequest);

router.put("/dr/req/acceptstatus", saveAcceptStatus);

router.delete("/dr/appointment/delete", deleteAppointmentDetails);

module.exports = router ;
