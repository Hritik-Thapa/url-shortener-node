const url = require("../models/url");
const shortid = require("shortid");

async function handleGenerateShortId(req, res) {
  const body = req.body.url;
  if (!body) return res.status(400).json({ error: "Missing data" });
  const short_id = shortid(8);
  // console.log(shortId);
  await url.create({
    shortId: short_id,
    redirectUrl: body,
    visitHistory: [],
  });

  return res.json({ id: short_id });
}

async function handleRedirectUrl(req, res) {
    const shortId= req.params.shortId;
  const entry = await url.findOneAndUpdate({shortId}, {
    $push: { visitHistory: {timestamp:Date.now()} },
  });
  console.log(entry)
  res.redirect(entry.redirectUrl);
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await url.findOne({shortId})
    return res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory})
}

module.exports = { handleGenerateShortId, handleRedirectUrl ,handleGetAnalytics};
