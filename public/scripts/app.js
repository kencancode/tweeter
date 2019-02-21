/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function(){

$(".btn-create-tweet").on("click", function (){
  $(".new-tweet").slideToggle("slow", function(){
  });
  $(".textarea").focus()
});



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
          <img class="Voldemort" src=${escape(tweet.user.avatars.small)} width="80px" height="80px">
          <span class="name-handle">
          <h3 class="Voldemort-name">${escape(tweet.user.name)}</h3><h4 class="Voldemort-handle">${escape(tweet.user.handle)}</h4>
          </span>
          </header>
          <p class="Voldemort-text">${escape(tweet.content.text)}</p>
          <footer class="Voldemort-time"><span>${escape(tweet.created_at)}</span><span class="icons"><i class="fas fa-flag"></i> <i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></span></footer>
          </article>`);
  return $tweet;
}
// $('#section-tweet').append(createTweetElement(data));

// renderTweets(data);


//show the form when clicked



//prevent default form submission, serialize data submitted
$(".tweet-form").on("submit", function (event){
  event.preventDefault();
  let serializedText =  $(this).serialize();
  let charactersCount = $('.textarea').val().length;
  $(".error").slideUp("fast");      //slide up in case the error message is there

  if(charactersCount <= 0){
    // alert("Please add your tweet.")
    $(".error p").text("Please add your tweet!");
    $(".error").slideDown("fast");
  } else if (charactersCount > 140){
    // alert("Please make your tweet concise!")
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


//users won't be able to pass code to server
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


// function convertTime (millisecondsPosted){
//   const differenceInSecond = (new.date() - millisecondsPosted ) / 1000;

//   if (differenceInSecond < 60){
//     return "Posted" + differenceInSecond + "seconds ago";
//   } else if (differenceInSecond >= 60 && differenceInSecond < 60*60){
//     return "Posted" + differenceInSecond/3600 + "minutes ago";
//   } else if (differenceInSecond >= 3600 && differenceInSecond < 3600*24){
//     return "Posted" + differenceInSecond/3600 * 24 + "hours ago";
//   } else {
//     return "Posted more than a day ago";
//   }
// }


});


//** num/1000/60/60/24 formala to change time*//
