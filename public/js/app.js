var loginButton = document.getElementById('loginBtn');
var logoutButton = document.getElementById('logoutBtn');
var loginSection = document.getElementById('login_box');
var profileBox = document.getElementById('profileBox');

function loginSectionToggle(a){
	if(a=="logged"){
		loginButton.classList.add('hide');
		logoutButton.classList.remove('hide');
		loginSection.classList.add('hide');
		profileBox.classList.remove('hide');
		document.querySelector('#profileLink img').src=firebase.auth().currentUser.photoURL;
	}else{
		loginButton.classList.remove('hide');
		logoutButton.classList.add('hide');			
		loginSection.classList.remove('hide');
		profileBox.classList.add('hide');
	}
}

(function(){

	var email = document.getElementById('email');
	var password = document.getElementById('password');

	loginButton.addEventListener('click', function(){
		firebase.auth().signInWithEmailAndPassword(email.value,password.value).catch(function(error){
			console.log(error);
		});
	});

	logoutButton.addEventListener('click',function(){
		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		  logoutButton.classList.remove('hide');
		}, function(error) {
			console.log(error);
		});
	});

	firebase.auth().onAuthStateChanged(function(user){
		if(user){
			console.log("User is signed in!");
			loginSectionToggle("logged");
		}else{
			console.log("Not logged in");
			loginSectionToggle("not logged");
		}
	});
}());

var user = firebase.auth().currentUser;

if(user){
	loginSectionToggle("logged");
}