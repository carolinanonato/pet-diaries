document.addEventListener("DOMContentLoaded", function () {
    console.log("Ready");
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) firebase.auth().signOut();
    });
});
