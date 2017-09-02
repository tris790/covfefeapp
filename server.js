// Packages
var express = require("express");
var app = express();
// Local packages
const twitterClient = require("./twitterapi.js");
// Port used
const PORT = 3000;

// Initializing server
app.listen(PORT);
console.log("listening on", PORT);
twitterClient.init();

// Setting up routes
app.use(express.static("public"));
app.use("/fetch", (req, res) => {
  const { max, count } = req.query;
  console.log("max:", max, "count:", count);
  twitterClient.fetch(max, count).then(data =>
    res.send({
      post_count: data.length,
      last_id: data[data.length - 1].id,
      content: data
    })
  );
});
app.use("/auth", (req, res) => {
  res.send(twitterClient.getBearerToken());
});
