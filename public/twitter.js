const fetchTweets = () => {
  fetch(
    "https://twitter.com/realDonaldTrump",
    { mode: "no-cors" },
    d => console.log("request to twitter sent successfuly!"),
    err => console.log(err)
  );
};
