var currentUser;        // global variable 

// This function populates the user's information and checks if they are logged in.
function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            // Go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            // Get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    // Get the data fields of the user
                    var userAddedhabits = userDoc.data().addedhabits;
                    if (userAddedhabits != null) {
                        document.getElementById("addedhabits").value = userAddedhabits;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

// This function collects the user's boolean entries on whether or not they have a certain habit. 
// The values for each habit variable in Firestore are False by default, until the user checks it off to become True. 
function checkboxListen() {
    console.log("inside checkboxListen");
    document.getElementById("enterHabit").addEventListener("click", function () {
        var poortime = document.getElementById("poor-time").checked;
        var lacksleep = document.getElementById("lack-sleep").checked;
        var lackexercise = document.getElementById("lack-sleep").checked;
        var lackwater = document.getElementById("lack-water").checked;
        var lackposture = document.getElementById("lack-posture").checked;
        var phoneaddiction = document.getElementById("phone-addict").checked;
        var gameaddiction = document.getElementById("game-addict").checked;
        var gamblingaddiction = document.getElementById("gamble-addict").checked;
        console.log(poortime, lacksleep, lackexercise, lackwater, lackposture, phoneaddiction,
            gameaddiction, gamblingaddiction);


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
                }, { merge: true }) // Turns the default False values to True if the user checks off a specific habit.
            } else {
                // No user is signed in.
            }
        });
    })
}
checkboxListen();

// This function saves the user's habit entries from the checkbox form fill into Firestore database under collection "users"
function saveHabit() {
    var poortime = document.getElementById("poor-time").value;
    var lacksleep = document.getElementById("lack-sleep").value;
    var lackexercise = document.getElementById("lack-sleep").value;
    var lackwater = document.getElementById("lack-water").value;
    var lackposture = document.getElementById("lack-posture").value;
    var phoneaddiction = document.getElementById("phone-addict").value;
    var gameaddiction = document.getElementById("game-addict").value;
    var gamblingaddiction = document.getElementById("gamble-addict").value;
    console.log(poortime, lacksleep, lackexercise, lackwater, lackposture, phoneaddiction,
        gameaddiction, gamblingaddiction);
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
                .update({
                    poortime: poortime,
                    lacksleep: lacksleep,
                    lackexercise: lackexercise,
                    lackwater: lackwater,
                    lackposture: lackposture,
                    phoneaddiction: phoneaddiction,
                    gameaddiction: gameaddiction,
                    gamblingaddiction: gamblingaddiction,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    window.location.href = "viewhabits.html"; // Users are redirected to this page to view their habit checkbox entries. 
                })
        } else {
            // No user is signed in.
        }
    });
} 