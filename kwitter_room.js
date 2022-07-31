username = localStorage.getItem("user_input");
document.getElementById("username").innerHTML = "Welcome "+username+"!";
function addRoom()
{
      roomname = document.getElementById("roomname").value;
      firebase.database().ref("/").child(roomname).update({
            purpose:'addroom'
      });
      localStorage.setItem("roomname",roomname);
      window.location = "kwitter_page.html";
}
//ADD YOUR FIREBASE LINKS HERE
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
function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log("Room Names : "+ Room_names);
      r = "<div id="+Room_names+" onclick='redirect(this.id)'>#"+Room_names+"</div><hr>";
      document.getElementById("output").innerHTML += r;
      //End code
      });});}
getData();
function redirect(name)
{
      localStorage.setItem("roomname",name);
      window.location = "kwitter_page.html";
}
function logout()
{
      localStorage.removeItem("user_input");
      localStorage.removeItem("roomname");
      window.location = "index.html";
}