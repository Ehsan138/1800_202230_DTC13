function saveSettings() {
    firebase.auth().onAuthStateChanged(user => {   //find out who's logged in
        console.log("in save function");
        const n = document.querySelector('#notifications');
        console.log(n.checked);      //get checked attribute
        db.collection("users").doc(user.uid).update({   //update user's doc
            notifications: n.checked
        })
    })
}

//Logout
function myFunction() {
    // [START auth_sign_out]
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    // [END auth_sign_out]
  }




function showSettings() {
    firebase.auth().onAuthStateChanged(user => 
            db.collection("users").doc(user.uid0
                .get()
                .then(function (doc) {
                    console.log("notfications is: " + doc.data().notifications);
                })
    })

showSettings();

