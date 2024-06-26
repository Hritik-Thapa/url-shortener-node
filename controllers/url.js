const url = require("../models/url");
const shortid = require("shortid");

async function handleViewUrl(req,res){
  return res.redirect('http://localhost:9999/')
}

async function handleGenerateShortId(req, res) {
  const body = req.body.redirectUrl;
  console.log(body);

  if (!body) return res.status(400).json({ error: "Missing data" });
  const short_id = shortid(8);
  await url.create({
    shortId: short_id,
    redirectUrl: body,
    visitHistory: [],
    createdBy:req.user._id
  });
  const urlList= await url.findOne({});
  // const data={ id: short_id ,urls:urlList}
  return res.render("home", {id: short_id});
}

async function handleRedirectUrl(req, res) {
  const shortId = req.params.shortId;
  const entry = await url.findOneAndUpdate(
    { shortId },
    {
      $push: { visitHistory: { timestamp: Date.now(), ipAddress: req.ip } },
    }
  );
  console.log(entry.redirectUrl);
  res.redirect(entry.redirectUrl)
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await url.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateShortId,
  handleRedirectUrl,
  handleGetAnalytics,
  handleViewUrl
};
