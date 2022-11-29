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
 

 
 
// Notification
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
    console.log('gi')
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
 
 
 
 
 
 // Delete account
// currentUser = user.uid
 
function new23(){
    console.log(currentUser)
    firebase.auth().currentUser.delete()    
}
 
function window(){
    window.location = "https://www.google.com";
    window.location.href = "https://www.google.com";
}
 
function deleteUserById() {
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = user.uid
            console.log(currentUser)
            db.collection('users').doc(currentUser).delete();
            new23()
            alert("Account deleted logout")
            window()
        }
    }
    )
}
