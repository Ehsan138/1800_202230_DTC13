// insertName reads the database and returns the user name
// pram: none
// return: none
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
                // document.getElementByID("name-goes-here").innerText=user_Name;
            })
        }

    })
}
insertName();




// insertEmail reads the database and returns the user email
// pram: none
// return: none
// R (read) user email from the firestore
function insertEmail() {
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // let me to know who is the user that logged in to get the UID
            currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
            currentUser.get().then(userDoc => {
                //get the user name
                var user_Email = userDoc.data().email;
                console.log(user_Email);
                $("#email-goes-here").text(user_Email); //jquery
                // document.getElementByID("name-goes-here").innerText=user_Name;
            })
        }

    })
}
insertEmail();


// insertSchool reads the database and returns the users school
// pram: none
// return: none
// R (read) user school from the firestore
function insertSchool() {
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // let me to know who is the user that logged in to get the UID
            currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
            currentUser.get().then(userDoc => {
                //get the user name
                var user_School = userDoc.data().school;
                console.log(user_School);
                $("#school-goes-here").text(user_School); //jquery
                // document.getElementByID("name-goes-here").innerText=user_Name;
            })
        }

    })
}
insertSchool();