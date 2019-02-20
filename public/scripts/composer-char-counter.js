$(document).ready(function() {
  let maxWords = 140;

  $(".textarea").on("input", function(){
    let characterTyped = $(this).val().length;
    let wordsAllowed = maxWords - characterTyped

    $(".counter").text(wordsAllowed);

    if(wordsAllowed < 0){
      $(".counter").addClass("words-over-limit");
    }

  });

  console.log("DOM is ready to be manupulated");
});

