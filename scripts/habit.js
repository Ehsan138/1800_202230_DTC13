// function goalEditHandler() {
//   x = $("#goal-textarea").val()
//   x = String(x)
//   $("#card-text").html(x)
// }


// function setup() {
//   $("#goal-submit").click(goalEditHandler)
// }


// $(document).ready(setup)


var currentUser;        //put this right after you start script tag before writing any functions.

// Ask the users about their goals and how they want to get notifications.

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
                    var userNumber = userDoc.data().number;
                    var userStart_time = userDoc.data().start_time;
                    var userEnd_time = userDoc.data().end_time;

                    //if the data fields are not empty, then write them in to the form.
                    if (userNumber != null) {
                        document.getElementById("numberInput").value = userNumber;
                    }
                    if (userStart_time != null) {
                        document.getElementById("start_timeInput").value = userStart_time;
                    }
                    if (userEnd_time != null) {
                        document.getElementById("end_timeInput").value = userEnd_time;
                    }
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}

//call the function to run it 
// populateInfo();

function editUserInfo() {
   //Enable the form fields
   document.getElementById('personalInfoFields').disabled = false;
}

// Saving the user answers in the firestore

function saveUserInfo() {
    userNumber = document.getElementById('numberInput').value;       //get the value of the field with id="nameInput"
    userStart_time = document.getElementById('start_timeInput').value;     //get the value of the field with id="schoolInput"
    userEnd_time = document.getElementById('end_timeInput').value;       //get the value of the field with id="cityInput"

    console.log(userNumber)
    $("#habit-goals-number").text(userNumber);

    console.log(userStart_time)
    $("#habit-goals-startTime").text(userStart_time);

    console.log(userEnd_time)
    $("#habit-goals-endTime").text(userEnd_time);


    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            console.log(currentUser)
            currentUser.update({ // updating the firestore based on the answers we got from users
                    number: userNumber,
                    start_time: userStart_time,
                    end_time: userEnd_time
                })
                .then(() => {
                    console.log("Document successfully updated!");
                })

                document.getElementById('personalInfoFields').disabled = true;
}}
    )}

    