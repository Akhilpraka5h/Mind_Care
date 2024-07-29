const express = require("express");
const router = express.Router();
const {
  getuserResponse,
  saveuserResponse,
  updateCompleteStatus,
  findLossestMatch,
} = require("../controllers/UserAssessment.controller");

//assessment data sending to DB
router.get("/ur/user/responce",   getuserResponse,);

router.post("/ur/user/save", saveuserResponse);

router.put("/ur/user/updatestatus", updateCompleteStatus);

router.delete("/ur/lossest", findLossestMatch);

module.exports = router ;
