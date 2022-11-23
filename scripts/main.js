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
                // document.getElementByID("name-goes-here").innerText=user_Name;
            })
        }

    })
}
insertName();



function randomQuote() {
  $.ajax({
      url: "https://api.forismatic.com/api/1.0/?",
      dataType: "jsonp",
      data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
      success: function( response ) {
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





// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//         getHabits(user)
//         console.log('hello')
//     } else {
//         console.log("No user is signed in");
//     }
// });




// function getHabits(user) {
//     db.collection("users").doc(user.uid).get()
//         .then(userDoc => {
//                 user.id.forEach(thisHabitID => {
//                 console.log(thisHabitID);

//                 db.collection("habits").where("code", "==", thisHabitID).get().then(snap => {
//                     bool = snap.bool;
//                     queryData = snap.docs;
                    
//                     if (bool == true) {
//                         var doc = queryData[0].data();
//                         var habitName = doc.name
//                         var habitDescription = doc.description
//                         let newCard = CardTemplate.content.cloneNode(true);
//                         newCard.querySelector('.card-title').innerHTML = habitName;
//                         newCard.querySelector('.card-text').innerHTML = habitDescription;
//                         habitCardGroup.appendChild(newCard);
//                     } else {
//                         console.log("Query has more than one data")
//                     }

//                 })

//             });
//         })
// }



// function getHabits(user) {
//     db.collection("users").doc(user.uid).get()
//         .then(userDoc => {
//             var userInfo = userDoc.data()

//             userInfo.forEach(thisHabitID => {
//             console.log(thisHabitID);

//                 if (thisHabitID == true) {
//                     var habitInfo = userInfo.thisHabitID
//                     let newCard = CardTemplate.content.cloneNode(true);
//                     newCard.querySelector('.card-title').innerHTML = habitInfo;
//                     habitCardGroup.appendChild(newCard);
//                 } else {
//                     console.log("Query has more than one data")
//                 }

//                 });
//         })
// }

// getHabits()
// console.log('hello')




// function getBookmarks(user) {
//     db.collection("users").doc(user.uid).get()
//         .then(userDoc => {
//             var bookmarks = userDoc.data().bookmarks;
//             console.log(bookmarks);

//             let CardTemplate = document.getElementById("CardTemplate");
//                 bookmarks.forEach(thisHikeID => {
//                     console.log(thisHikeID);
//                 db.collection("hikes").where("code", "==", thisHikeID).get().then(snap => {
//                     size = snap.size;
//                     queryData = snap.docs;
                    
//                     if (size == 1) {
//                         var doc = queryData[0].data();
//                         var hikeName = doc.name; //gets the name field
//                         var hikeID = doc.code; //gets the unique ID field
//                         var hikeLength = doc.length; //gets the length field
//                         let newCard = CardTemplate.content.cloneNode(true);
//                         newCard.querySelector('.card-title').innerHTML = hikeName;
//                         newCard.querySelector('.card-length').innerHTML = hikeLength;
//                         newCard.querySelector('a').onclick = () => setHikeData(hikeID);
//                         newCard.querySelector('img').src = `./images/${hikeID}.jpg`;
//                         hikeCardGroup.appendChild(newCard);
//                     } else {
//                         console.log("Query has more than one data")
//                     }

//                 })

//             });
//         })
// }
