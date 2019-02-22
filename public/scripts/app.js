/*
 * Client-side JS logic goes here
 */

$(document).ready(function(){

// Show/hide the form when clicked
  $(".btn-create-tweet").on("click", function (){
    $(".new-tweet").slideToggle("slow", function(){
    });
    $(".textarea").focus()
  });

// loops through tweets, calls createTweetElement for each tweet, takes return value and appends it to the tweets container
  function renderTweets(tweets) {
    tweets.forEach(function(input){
      const eachTweet = createTweetElement(input);
      $("#section-tweet").append(eachTweet);
    });
  }

  function createTweetElement(tweet) {
    let $tweet = $('<article>').append(`
          <article class="tweet-1">
          <header class="tweet-1-header">
          <img class="tweet-1-img" src=${escape(tweet.user.avatars.small)} width="80px" height="80px">
          <span class="name-handle">
          <h3 class="tweet-1-name">${escape(tweet.user.name)}</h3><h4 class="tweet-1-handle">${escape(tweet.user.handle)}</h4>
          </span>
          </header>
          <p class="tweet-1-text">${escape(tweet.content.text)}</p>
          <footer class="tweet-1-time"><span>${escape(convertTime(tweet.created_at))}</span><span class="icons"><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></span></footer>
          </article>`);
    return $tweet;
  }

//prevent default form submission, serialize data submitted
  $(".tweet-form").on("submit", function (event){
    event.preventDefault();
    let serializedText =  $(this).serialize();
    let charactersCount = $('.textarea').val().length;

    //hide error message, if there is one shown
    $(".error").slideUp("fast");

    //If form is blank or if word count is > 140, show error messages
    if(charactersCount <= 0){
      $(".error p").text("Please add your tweet!");
      $(".error").slideDown("fast");
    } else if (charactersCount > 140){
      $(".error p").text("Please make your tweet concise!");
      $(".error").slideDown("fast");
    } else {
      $.post( "/tweets", serializedText)
        .done(function(data, status){
        console.log(status)
        location.reload();              //reload the page after submit!
      });
    }
  });


  function loadTweets (){
    $.ajax('/tweets', {method: 'GET'})
      .then(function(tweet){
      renderTweets(tweet)
    })
  }

  loadTweets()


//prevents users from submitting code to the server via textarea
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

//convert time
  function convertTime (timePosted){
    const date = new Date();
    const today = date.getTime();
    const differenceInSeconds = Math.round((today - timePosted) / 1000);

    if (differenceInSeconds < 60){
      return "Posted " + differenceInSeconds + " seconds ago";
    } else if (differenceInSeconds >= 60 && differenceInSeconds < 60*60){
      return "Posted " + Math.round(differenceInSeconds / 60) + " minutes ago";
    } else if (differenceInSeconds >= 3600 && differenceInSeconds < 3600*24){
      return "Posted " + Math.round(differenceInSeconds / 3600 ) + " hours ago";
    } else {
      return "Posted more than a day ago";
    }
  }

});
