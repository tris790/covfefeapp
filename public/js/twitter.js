const fetchTweets = async () => {
  const res = await fetch("/fetch?count=125");
  return (parsedRes = await res.json());
};

const searchTweets = async keyword => {
  const res = await fetch(`/search?q=${keyword}`);
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
    actionHandler: () => {}
  };
  document.snackbar.show(dataObj);
};

const createCardFromTweet = (tweet, highlight) => {
  let text = tweet.full_text.replace(
    /(https:\/\/t.co\/[^\s]+)/gi,
    `<a class="twitter-link" href="$1"><b>$1</b></a>`
  );
  if (highlight) {
    text = text.replace(
      new RegExp(highlight, "gi"),
      `<span class="highlighted">${highlight}</span>`
    );
  }
  return `<div class="mdc-card mdc-card--with-avatar mdc-card--tweet">
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
        <button onclick="openSnackbar()" title="Like" class="mdc-button mdc-button--compact mdc-card__action"><i class="material-icons">favorite_border</i> ${tweet.favorite_count}</button>
        <button onclick="openSnackbar()" title="Retweet" class="mdc-button mdc-button--compact mdc-card__action"><i class="material-icons">repeat</i> ${tweet.retweet_count}</button>
        <a title="Open" href="https://twitter.com/realDonaldTrump/status/${tweet.id_str}?conversation_id=${tweet.id_str}" class="mdc-button mdc-button--compact mdc-card__action"><i class="material-icons">remove_red_eye</i></a>
    </section>
</div>`;
};

const createSuggestionFromKeyword = keyword => {
  return `<button onclick="loadTweetsFromSearch('${keyword}')" class="twitter-btn keyword">
            <span class="twitter-text">${keyword}</span>
        </button>`;
};

const loadTweets = () => {
  const req = fetchTweets().then(data => {
    const tweetCount = 10;
    // Affichage des tweets
    const tweetResult = data.content
      .slice(0, tweetCount)
      .reduce((prev, cur) => prev + createCardFromTweet(cur), "");
    document.getElementById("tweets").innerHTML = tweetResult;

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

    const suggestions = mostCommon
      .sort(function() {
        return 0.5 - Math.random();
      })
      .slice(0, 5);
    suggestionResult = suggestions.reduce(
      (prev, cur) => prev + createSuggestionFromKeyword(cur[0]),
      ""
    );
    document.getElementById("suggested").innerHTML = suggestionResult;
  });
};

const loadTweetsFromSearch = async word => {
  const keyword = word || document.getElementById("recherche").value;
  if (!keyword) {
    document.getElementById("searched").innerHTML = "";
    return;
  }

  searchTweets(keyword).then(data => {
    const tweetCount = 10;
    // Affichage des tweets
    const tweetResult = data.content.statuses
      .slice(0, tweetCount)
      .reduce((prev, cur) => prev + createCardFromTweet(cur, keyword), "");
    document.getElementById("searched").innerHTML = tweetResult;
  });
};
