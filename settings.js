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
                body: 'This is a JavaScript Notification API demo',
                icon: './img/js.png'
            });
    
            // close the notification after 10 seconds
            setTimeout(() => {
                notification.close();
            }, 10 * 1000);
    
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
  let btn = document.getElementById("btn");
  btn.addEventListener('click', event => {
    test();
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

 



