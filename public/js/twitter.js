const fetchTweets = async () => {
  const res = await fetch("/fetch?count=125");
  return (parsedRes = await res.json());
};

const openSnackbar = () => {
  if (!document.snackbar) {
    const MDCSnackbar = mdc.snackbar.MDCSnackbar;
    const MDCSnackbarFoundation = mdc.snackbar.MDCSnackbarFoundation;
    document.snackbar = new MDCSnackbar(
      document.querySelector(".mdc-snackbar")
    );
  }
  const dataObj = {
    message: "Don't do that",
    actionText: "I'm sorry",
    actionHandler: function() {
      console.log("my cool function");
    }
  };
  document.snackbar.show(dataObj);
};

const createCardFromTweet = tweet => {
  const text = tweet.full_text.replace(
    /(https:\/\/t.co\/[^\s]+)/gi,
    `<a class="twitter-link" href="$1"><b>$1</b></a>`
  );
  return `<div class="mdc-card mdc-card--with-avatar">
    <section class="mdc-card__primary">
        <h1 class="mdc-card__title mdc-card__title--large mdc-card__"><img class="mdc-car__avatar" src="${tweet
          .user.profile_image_url_https}" />${tweet.user.name} @${tweet.user
    .screen_name} ${new Date(tweet.created_at).toDateString()}</h1>
        <h2 class="mdc-card__subtitle"></h2>
    </section>
    <section class="mdc-card__supporting-text">
        ${text}
    </section>
    <section class="mdc-card__actions">
        <button onclick="openSnackbar()" class="mdc-button mdc-button--compact mdc-card__action"><i class="material-icons">favorite_border</i> ${tweet.favorite_count}</button>
        <button onclick="openSnackbar()" class="mdc-button mdc-button--compact mdc-card__action"><i class="material-icons">repeat</i> ${tweet.retweet_count}</button>
        <a href="https://twitter.com/realDonaldTrump/status/${tweet.id_str}?conversation_id=${tweet.id_str}" class="mdc-button mdc-button--compact mdc-card__action"><i class="material-icons">remove_red_eye</i></a>
    </section>
</div>`;
};

const loadTweets = () => {
  const req = fetchTweets().then(data => {
    const tweetCount = 1;
    // Affichage des tweets
    const tweetResult = data.content
      .slice(0, tweetCount)
      .map(tweet => createCardFromTweet(tweet));
    document.getElementById("tweets").innerHTML = tweetResult.join("");

    // Display chart
    const mostCommon = findMostCommon(
      tweetsToOneString(data.content),
      10,
      4,
      true
    );

    initChart({
      id: "myChart",
      data: mostCommon.map(x => x[1]),
      labels: mostCommon.map(x => x[0])
    });
  });
};
