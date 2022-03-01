document.addEventListener("DOMContentLoaded", function () {
    console.log("ready!");

    const auth = document.getElementById("auth");
    const noAuth = document.getElementById("noAuth");

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("User exist", user);
            auth.style.display = "block";
            noAuth.style.display = "none";
        } else {
            noAuth.style.display = "block";
            auth.style.display = "none";
            console.log("User logged out!");
        }
    })


});
