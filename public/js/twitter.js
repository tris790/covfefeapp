const fetchTweets = async () => {
  const res = await fetch("/fetch?count=5");
  return (parsedRes = await res.json());
};

const createCardFromTweet = tweet => {
  return `<div class="mdc-card mdc-card--with-avatar">
  <section class="mdc-card__primary">
    <img class="mdc-car__avatar" src="${tweet.user.profile_image_url_https}"/>
    <h1 class="mdc-card__title mdc-card__title--large">${tweet.user
      .name} @${tweet.user.screen_name} ${tweet.created_at}</h1>
    <h2 class="mdc-card__subtitle"></h2>
  </section>
  <section class="mdc-card__supporting-text">
    ${tweet.text}
  </section>
  <section class="mdc-card__actions">
    <button class="mdc-button mdc-button--compact mdc-card__action">Open</button>
    <button class="mdc-button mdc-button--compact mdc-card__action">Like</button>
  </section>
</div>`;
};

const loadTweets = () => {
  fetchTweets().then(data => {
    console.log(data);
    const tweetResult = data.content.map(tweet => createCardFromTweet(tweet));
    document.getElementById("tweets").innerHTML = tweetResult.join("");
  });
};
