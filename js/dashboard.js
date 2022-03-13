function upload() {

    var image = document.getElementById('image').files[0];

    var post = document.getElementById('post').value;

    var title = document.getElementById('title').value;

    var imageName = image.name;

    var storageRef = firebase.storage().ref('images/' + imageName);

    var uploadTask = storageRef.put(image);

    uploadTask.on('state_changed', function (snapshot) {

        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is " + progress + " done");
    }, function (error) {

        console.log(error.message);
    }, function () {

        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {

            firebase.database().ref('my-pet-diary/').push().set({
                text: post,
                title: title,
                imageURL: downloadURL
            }, function (error) {
                if (error) {
                    alert("Error while uploading");
                } else {
                    alert("Successfully uploaded");

                    document.getElementById('post-form').reset();
                    getdata();
                }
            });
        });
    });

}

window.onload = function () {
    this.getdata();
}


function getdata() {
    firebase.database().ref('my-pet-diary/').once('value').then(function (snapshot) {

        var posts_div = document.getElementById('posts');

        posts.innerHTML = "";

        var data = snapshot.val();
        console.log(data);

        for (let [key, value] of Object.entries(data)) {
            posts_div.innerHTML = "<div>" +
                "<div class='card'>" +

                "<div class='card-body'><h2 class='card-title'>" + value.title + "</h2><p class='card-text'>" + value.text + "</p>" +
                "<img src='" + value.imageURL + "' style='height:250px;'>" +

                "<br><button class='btn btn-danger' id='" + key + "' onclick='delete_post(this.id)'>🗑️</button>" +
                "</div></div></div>" + posts_div.innerHTML;
        }

    });
}

function delete_post(key) {
    firebase.database().ref('my-pet-diary/' + key).remove();
    getdata();

}
