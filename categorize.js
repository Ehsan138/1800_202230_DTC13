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
    let SelectHabit = document.getElementById("enterhabit").value;
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