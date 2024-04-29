const express = require("express");
const {
  handleGenerateShortId,
  handleRedirectUrl,
  handleGetAnalytics,
} = require("../controllers/url");
const router = express.Router();

router.route("/").post(handleGenerateShortId);

router.route("/:shortId").get(handleRedirectUrl);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
