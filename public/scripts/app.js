/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function(){
// Fake data taken from tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    tweets.forEach(function(input){
      const eachTweet = createTweetElement(input);
      $("#section-tweet").append(eachTweet);
    });
}

function createTweetElement(tweet) {
  let $tweet = $('<article>').append(`
          <article class="tweet-1">
          <header class="tweet-1-header">
          <img class="Voldemort" src=${tweet.user.avatars.small} width="80px" height="80px">
          <span class="name-handle">
          <h3 class="Voldemort-name">${tweet.user.name}</h3><h4 class="Voldemort-handle">${tweet.user.handle}</h4>
          </span>
          </header>
          <p class="Voldemort-text">${tweet.content.text}</p>
          <footer class="Voldemort-time"><span>${tweet.created_at}</span><span class="icons"><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></span></footer>
          </article>`);
  return $tweet;
}

// $('#section-tweet').append(createTweetElement(data));

renderTweets(data);

});


//** num/1000/60/60/24 formala to change time*//
