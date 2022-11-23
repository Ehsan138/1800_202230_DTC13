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

function showSettings() {
    firebase.auth().onAuthStateChanged(user => {
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    nstatus = doc.data().notifications;
                    console.log("notfications is: " + nstatus);
                    document.getElementById("notifications").checked = nstatus;

                })
    })
}

showSettings




function test() {
    (async () => {
        // create and show the notification
        const showNotification = () => {
            // create a new notification
            const notification = new Notification('habitory.com', {
                body: 'Go back to habit',
            });
    
            // close the notification after 5 seconds
            setTimeout(() => {
                notification.close();
            }, 5 * 1000);
    
            // navigate to a URL when clicked
            notification.addEventListener('click', () => {
    
                window.open('./main.html');
            });
        }
    
        // show an error message
        const showError = () => {
            const error = document.querySelector('.error');
            error.style.display = 'block';
            error.textContent = 'You blocked the notifications';
        }
    
        // check notification permission
        let granted = false;
    
        if (Notification.permission === 'granted') {
            granted = true;
        } else if (Notification.permission !== 'denied') {
            let permission = await Notification.requestPermission();
            granted = permission === 'granted' ? true : false;
        }
    
        // show notification or error
        granted ? showNotification() : showError();

        // Open
    })();
    
  }
  var i = 1;                  

  function myLoop() {         
    setTimeout(function() {   
      test();   
      i++;            
      if (i < 5) {         
        myLoop();            
      }            
    }, 20000)                     
  }



  let btn = document.getElementById("btn");
  btn.addEventListener('click', event => {
    myLoop();
  });



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


function deleteUserById() {
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = user.uid; // will to to the firestore and go to the document of the user
            console.log(currentUser)
            db.collection('users').doc('user.uid').delete();
            firebase.auth().currentUser.delete()
            // getAuth()
            //     .deleteUser(uid)
            //     .then(() => {
            //         console.log('Successfully deleted user');
            //     })
            //     .catch((error) => {
            //         console.log('Error deleting user:', error);
            //     });
        }
    })
}



// function deleteUserById(){
//     currentUser = user.uid;
//     firestore.collection("users").doc(currentUser).delete()
//     console.log(id);
// }

