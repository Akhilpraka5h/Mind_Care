const express = require("express");
const router = express.Router();

const { getAiResponse } = require("../controllers/AiAssessment.controller");

router.get("/ai/assessment/:token", getAiResponse);

module.exports = router;
