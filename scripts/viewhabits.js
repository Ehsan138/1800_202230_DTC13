// This function populates the users habits post-submission from categorize.html page.
// Will return statements with boolean values indicating if they have selected the corresponding habit.

function populateHabits() {
    let habitCardTemplate = document.getElementById("habitCardTemplate");
    let params = new URL(window.location.href);         //get URL of search bar
    let habitEntered = params.searchParams.get("manualHabits");
    let message = "Here are your submitted habits:" + habitEntered;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid).get().then(
                doc => {
                    const poortime = doc.data().poortime; //gets the name field
                    const lacksleep = doc.data().lacksleep; //gets the unique ID field
                    const lackexercise = doc.data().lackexercise;
                    const lackwater = doc.data().lackwater; //gets the length field
                    const lackposture = doc.data().lackposture;
                    const phoneaddiction = doc.data().phoneaddiction;
                    const gameaddiction = doc.data().gameaddiction;
                    const gamblingaddiction = doc.data().gamblingaddiction;

                    let habitCard = habitCardTemplate.content.cloneNode(true);
                    habitCard.querySelector('.poortime').innerHTML = `It's ${poortime} that you have poor time management.`;
                    habitCard.querySelector('.lacksleep').innerHTML = `It's ${lacksleep} that you are lacking sleep.`;
                    habitCard.querySelector('.lackexercise').innerHTML = `It's ${lackexercise} that you are not exercising enough.`;
                    habitCard.querySelector('.lackwater').innerHTML = `It's ${lackwater} that you can improve your water intake.`;
                    habitCard.querySelector('.lackposture').innerHTML = `It's ${lackposture} that you can improve your posture.`;
                    habitCard.querySelector('.phoneaddiction').innerHTML = `It's ${phoneaddiction} that you can spend less time on your phone.`;
                    habitCard.querySelector('.gameaddiction').innerHTML = `It's ${gameaddiction} that you can play less games.`;
                    habitCard.querySelector('.gamblingaddiction').innerHTML = `It's ${gamblingaddiction} that you can improve your gambling habit.`;
                    habitCardGroup.appendChild(habitCard);
                }


            )
        }
    })
}
populateHabits();
