//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyBMyiBJjp6_1XfGYaiF4h8eF8qG-YhBTAc",
      authDomain: "kwitterproject-90c31.firebaseapp.com",
      databaseURL: "https://kwitterproject-90c31-default-rtdb.firebaseio.com",
      projectId: "kwitterproject-90c31",
      storageBucket: "kwitterproject-90c31.appspot.com",
      messagingSenderId: "541704906766",
      appId: "1:541704906766:web:79896ad18deb76de84f45f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var room_name= localStorage.getItem("roomname");
function sends() {
      room_name = localStorage.getItem("roomname");
      usern = localStorage.getItem("user_input");
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            uname: usern,
            umessage: msg,
            like: 0
      })
      document.getElementById("msg").value = "";
}
function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        named = message_data['uname'];
                        message = message_data['umessage'];
                        like = message_data['like'];
                        nl = "<h4> "+ named +"<img class='user_tick' src='tick.png'></h4>";
                        ml = "<h4 class='message_h4'>" + message + "</h4>";
                        ll ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
                        bl = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
           
                   row = nl + ml + ll + bl;       
                   document.getElementById("output").innerHTML += row;
                        //End code
                  }
            });
      });
}
getData();
function logout() {
      localStorage.removeItem("roomname");
      localStorage.removeItem("user_input");
      window.location = "index.html";
}
function updateLike(message_id)
{
  console.log("clicked on like button - " + message_id);
	button_id = message_id;
	likes = document.getElementById(button_id).value;
	updated_likes = Number(likes) + 1;
	console.log(updated_likes);

	firebase.database().ref(room_name).child(message_id).update({
		like : updated_likes  
	 });

}

