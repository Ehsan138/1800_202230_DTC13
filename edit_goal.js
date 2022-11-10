// var currentUser;        //put this right after you start script tag before writing any functions.

// function populateInfo() {
//             firebase.auth().onAuthStateChanged(goal => {
//                 // Check if user is signed in:
//                 if (goal) {

//                     //go to the correct user document by referencing to the user uid
//                     currentUser = db.collection("goals").doc(user.uid)
//                     //get the document for current user.
//                     currentUser.get()
//                         .then(userDoc => {
//                             //get the data fields of the user
//                             var goalNumber = userDoc.data().name;
//                             var goalTime = userDoc.data().school;

//                             //if the data fields are not empty, then write them in to the form.
//                             if (userName != null) {
//                                 document.getElementById("nameInput").value = userName;
//                             }
//                             if (userSchool != null) {
//                                 document.getElementById("schoolInput").value = userSchool;
//                             }
//                         })
//                 } else {
//                     // No user is signed in.
//                     console.log ("No user is signed in");
//                 }
//             });
//         }

// //call the function to run it 
// populateInfo();

// function editUserInfo() {
//    //Enable the form fields
//    document.getElementById('personalInfoFields').disabled = false;
// }

// function saveUserInfo() {
//     userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
//     userSchool = document.getElementById('schoolInput').value;     //get the value of the field with id="schoolInput"
//     userCity = document.getElementById('cityInput').value;       //get the value of the field with id="cityInput"

//     currentUser.update({
//                     name: userName,
//                     school: userSchool,
//                     city: userCity
//                 })
//                 .then(() => {
//                     console.log("Document successfully updated!");
//                 })

//                 document.getElementById('personalInfoFields').disabled = true;
// }


function insertName() {
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // let me to know who is the user that logged in to get the UID
            currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
            currentUser.get().then(userDoc => {
                //get the user name
                var user_Goals = userDoc.data().goals;
                console.log(user_Goals);
                $("#goals-goes-here").text(user_Goals); //jquery
                // document.getElementByID("name-goes-here").innerText=user_Name;
            })
        }

    })
}
insertName();