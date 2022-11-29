function populateHabits() {
    let habitCardTemplate = document.getElementById("habitCardTemplate");
    // let habitCardGroup = document.getElementById("habitCardGroup");
    let params = new URL(window.location.href);         //get URL of search bar
    // let hikeCode = params.searchParams.get("id");       //get value for key "id"
    let habitEntered = params.searchParams.get("manualHabits");
    // document.getElementById("HikeName").innerHTML = hikeName;
    let message = "Here are your submitted habits:" + habitEntered;
    console.log("hello")

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
                    habitCard.querySelector('.poortime').innerHTML = `it's ${poortime} that you have poor time management`;
                    habitCard.querySelector('.lacksleep').innerHTML = `lacksleep: ${lacksleep}`;
                    habitCard.querySelector('.lackexercise').innerHTML = `lackexercise: ${lackexercise}`;
                    habitCard.querySelector('.lackwater').innerHTML = `lackwater: ${lackwater}`;
                    habitCard.querySelector('.lackposture').innerHTML = `lackposture: ${lackposture}`;
                    habitCard.querySelector('.phoneaddiction').innerHTML = `phoneaddiction: ${phoneaddiction}`;
                    habitCard.querySelector('.gameaddiction').innerHTML = `gameaddiction: ${gameaddiction}`;
                    habitCard.querySelector('.gamblingaddiction').innerHTML = `gamblingaddiction: ${gamblingaddiction}`;
                    habitCardGroup.appendChild(habitCard);
                }


            )
        }
    })
}
populateHabits();
console.log("hello2")