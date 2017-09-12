var request = require("request-promise-native");
const auth = require("./auth/auth.json");

class TwitterClient {
  init() {
    this.username = "realdonaldtrump";
    const secret = `${auth.Twitter_Consumer_Key}:${auth.Twitter_Consumer_Key_Secret}`;
    const base64 = `${new Buffer(secret).toString("base64")}`;
    console.log("secret", secret, "base", base64);
    request
      .post({
        url: `https://api.twitter.com/oauth2/token`,
        headers: {
          Authorization: `Basic ${base64}`, //token:tokensecret BASE64
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8."
        },
        form: { grant_type: "client_credentials" },
        json: true
      })
      .then(data => {
        this.bearerToken = `Bearer ${data.access_token}`;
      })
      .catch(err => console.log(err.message));
  }

  async fetch(maxId, postCount) {
    const max = maxId ? `&max_id=${maxId}` : "";
    const count = postCount ? `&count=${postCount}` : "";
    console.log(this.bearerToken);
    return await request({
      uri: `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${this
        .username}&exclude_replies=true&include_rts=false&tweet_mode=extended${max}${count}`,
      headers: {
        Authorization: this.bearerToken
      },
      json: true
    });
  }

  async search(keyword) {
    return await request({
      uri: `https://api.twitter.com/1.1/search/tweets.json?q=${keyword} from:${this
        .username}&count=100&exclude_replies=true&include_rts=false&tweet_mode=extended`,
      headers: {
        Authorization: this.bearerToken
      },
      json: true
    });
  }
}

module.exports = new TwitterClient();
