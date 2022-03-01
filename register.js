document.addEventListener("DOMContentLoaded", function () {
    console.log("Ready!");

    const db = firebase.firestore();
    const userName = document.getElementById("userName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const submit = document.getElementById("submit");

    submit.addEventListener("click", function () {
        if (
            !userName.value ||
            !email.value ||
            !password.value
        )
            return;

        firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(function (data) {
                console.log("user created!", data);

                window.location = "dashboard.html"
                const user = firebase.auth().currentUser;
                addUser(user.uid, userName.value);
            })
            .catch((err) => alert(err));
    });

    function addUser(uid, name) {
        db.collection("Users")
            .doc(uid)
            .set({
                userName: name,
                user: uid,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(function () {
                console.log("User created!");
            })
            .catch((err) => console.log("err", err));
    }
});
