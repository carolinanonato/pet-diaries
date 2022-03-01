
document.addEventListener("DOMContentLoaded", function () {
    console.log('ready')

    const email = document.getElementById("email")
    const password = document.getElementById("password")
    const submit = document.getElementById("submit")

    submit.addEventListener("click", function () {
        if (
            !email.value ||
            !password.value
        )
            return;

        firebase
            .auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .then(function () {
                window.location = "dashboard.html"
            }).catch(function (err) {
                alert('Invalid User or password')
            })
    })
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) window.location = "dashboard.html";
    });
})



document.addEventListener("DOMContentLoaded", function () {
    console.log("Ready");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const submit = document.getElementById("submit");

    submit.addEventListener("click", function () {
        if (!email.value || !password.value) return;

        firebase
            .auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .then(function () {
                window.location = "dashboard.html";
            })
            .catch(function (err) {
                console.log("err", err);
            });
    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) window.location = "dashboard.html";
    });
});
