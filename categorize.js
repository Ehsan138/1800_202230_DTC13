function goalEditHandler() {
    x = $("#goal-textarea").val()
    x = String(x)
    $("#card-text").html(x)
}


function setup() {
    $("#goal-submit").click(goalEditHandler)
}


$(document).ready(setup)


var currentUser;        //put this right after you start script tag before writing any functions.

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var manualhabit = userDoc.data().number;

                    //if the data fields are not empty, then write them in to the form.
                    if (manualhabit != null) {
                        document.getElementById("habitInput").value = manualhabit;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateInfo();

function editHabit() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveHabit() {
    habitInput = document.getElementById('habitInput').value;       //get the value of the field with id="nameInput"
    //get the value of the field with id="cityInput"

    currentUser.update({
        userHabit: habitInput,
    })
        .then(() => {
            console.log("Document successfully updated!");
        })

    document.getElementById('personalInfoFields').disabled = true;
}


function checkboxListen() {
    console.log("inside checkboxListen");
    document.getElementById("submit-preferences").addEventListener("click", function () {
        var poortime = document.getElementById("poor-time").checked;
        var lacksleep = document.getElementById("lack-sleep").checked;
        var lackexercise = document.getElementById("lack-sleep").checked;
        var lackwater = document.getElementById("lack-water").checked;
        var lackposture = document.getElementById("lack-posture").checked;
        var phoneaddiction = document.getElementById("phone-addict").checked;
        var gameaddiction = document.getElementById("game-addict").checked;
        var gamblingaddiction = document.getElementById("gamble-addict").checked;
        console.log(poortime);
        console.log(lacksleep);
        console.log(lackexercise);
        console.log(lackwater);
        console.log(lackposture);
        console.log(phoneaddiction);
        console.log(gameaddiction);
        console.log(gamblingaddiction);


        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                db.collection("users").doc(user.uid).set({
                    poortime: poortime,
                    lacksleep: lacksleep,
                    lackexercise: lackexercise,
                    lackwater: lackwater,
                    lackposture: lackposture,
                    phoneaddiction: phoneaddiction,
                    gameaddiction: gameaddiction,
                    gamblingaddiction: gamblingaddiction
                }, { merge: true })
            } else {
                // No user is signed in.
            }
        });
    })
}
checkboxListen();


function enterHabit() {
    console.log("in")
    let enterHabit = document.getElementById("enterhabit").value;
    console.log(enterHabit);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("users").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "viewhabits.html"; //new line added
                    })
                })

        } else {
            // No user is signed in.
        }
    });

}

function populateReviews() {
    let hikeCardTemplate = document.getElementById("CardTemplate");
    let hikeCardGroup = document.getElementById("CardGroup");

    let params = new URL(window.location.href);         //get URL of search bar
    let hikeCode = params.searchParams.get("id");       //get value for key "id"
    let hikeName = params.searchParams.get("hikeName"); //get value for key "hikeNam
    document.getElementById("HikeName").innerHTML = hikeName;
    let message = "All reviews submitted for" + hikeName;
    message += " &nbsp | Document id is:  " + hikeCode;
    document.getElementById("details-go-here").innerHTML = message;

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("Reviews").where("code", "==", hikeCode).get()
        .then(allReviews => {
            reviews = allReviews.docs
            console.log(reviews);
            reviews.forEach(doc => {
                var title = doc.data().title; //gets the name field
                var level = doc.data().level; //gets the unique ID field
                var season = doc.data().season;
                var description = doc.data().description; //gets the length field
                var flooded = doc.data().flooded;
                var scrambled = doc.data().scrambled;

                let reviewCard = hikeCardTemplate.content.cloneNode(true);
                reviewCard.querySelector('.title').innerHTML = title;     //equiv getElementByClassName
                reviewCard.querySelector('.level').innerHTML = `level: ${level}`;
                reviewCard.querySelector('.season').innerHTML = `season: ${season}`;
                reviewCard.querySelector('.scrambled').innerHTML = `scrambled: ${scrambled}`;  //equiv getElementByClassName
                reviewCard.querySelector('.flooded').innerHTML = `flooded: ${flooded}`;  //equiv getElementByClassName
                reviewCard.querySelector('.description').innerHTML = `Description: ${description}`;
                hikeCardGroup.appendChild(reviewCard);
            })
        })
}
populateReviews();