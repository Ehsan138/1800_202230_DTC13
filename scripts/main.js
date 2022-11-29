// Showing the name of user after the welcome message.
// return: none
// pram: none  
// R (read) user name from the firestore

function insertName() {
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // let me to know who is the user that logged in to get the UID
            currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
            currentUser.get().then(userDoc => {
                //get the user name
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                $("#name-goes-here").text(user_Name); //jquery
            })
        }

    })
}
insertName();


// Randomly based the api we have, we generate a random quote.
// return: none
// pram: none
// R (read) from an api 

function randomQuote() {
  $.ajax({ // reading from api
      url: "https://api.forismatic.com/api/1.0/?",
      dataType: "jsonp",
      data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
      success: function( response ) { // displaying the random quote on the main html file.
        $("#random_quote").html("<p id='random_quote' class='lead text-center'>" +
          response.quoteText + "<br/>&dash; " + response.quoteAuthor + " &dash;</p>");
      }
  });
}

$(function() {
  randomQuote();
});

$("button").click(function(){
  randomQuote();
});
