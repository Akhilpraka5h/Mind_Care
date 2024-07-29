const express = require("express");
const router = express.Router();
const {
  getuserResponse,
  saveUserResponse,
  updateCompleteStatus,
} = require("../controllers/UserAssessment.controller");

router.get("/user/userAssessment/question", getuserResponse);

//assessment data sending to DB
router.post("/user/userAssessment/save", saveUserResponse);

router.post("/user/userAssessment/submit", updateCompleteStatus);



module.exports = router ;
