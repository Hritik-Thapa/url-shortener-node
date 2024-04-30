const express = require("express");
const {
  handleGenerateShortId,
  handleRedirectUrl,
  handleGetAnalytics,
  handleViewUrl
  
} = require("../controllers/url");
const router = express.Router();

router.route("/").post(handleGenerateShortId).get(handleViewUrl);

router.route("/:shortId").get(handleRedirectUrl);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
