// test creates a new notification and sends it a certain amount of times
// return: none
// param: none
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

    })();
}


var iter = 1;
// myloop is called when the button is pressed. It loops 5 times to give the user a notification 5 times.
// return: none
// pram: none                
function myLoop() {
    setTimeout(function () {
        console.log('hi');
        test();
        iter++;
        if (iter < 5) {
            myLoop();
        }
    }, 10000)
}


// Button action call loop and starts the notification process
let btn = document.getElementById("btn");
btn.addEventListener('click', event => {
    myLoop();
});



// myFunction logs out the current user from the app.
// return: none
// pram: none
function myFunction() {
    // [START auth_sign_out]
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
    // [END auth_sign_out]
}





// Delete account process


// deleteFromFirebase deletes user from the firebase auth and sends an alert warning them of this change
// return: none
// pram : none
function deleteFromFirebase() {
    console.log(currentUser)
    firebase.auth().currentUser.delete()
    alert("Account deleted logout")
}


// deleteUserById deletes the user from the firestore and then call the deleteFromFirebase() function
// return: none
// pram: none
function deleteUserById() {
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = user.uid
            alert("Account was deleted")
            console.log(currentUser)
            db.collection('users').doc(currentUser).delete();
            console.log(db.collection('users').doc(currentUser))
            deleteFromFirebase()
            // alert("Account deleted logout")
        }
    })
}