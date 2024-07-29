const express = require("express");
const router = express.Router();
const {
  GetUserAssessment,
  UpdateUserAssessment,
  PutUserAssessment,
  DeleteUserAssessment,
} = require("../controllers/AdminAssessment.controller");

// router.post('/admin/assessment/save', PostUserAssessment);

router.get("/admin/assessment/get", GetUserAssessment);

router.patch("/admin/assessment/update", UpdateUserAssessment);

router.delete("/admin/assessment/delete", DeleteUserAssessment);

router.put("/admin/assessment/putdata", PutUserAssessment);

module.exports = router ;
