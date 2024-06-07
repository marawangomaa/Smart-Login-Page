var nameUp = document.getElementById("nameUp");
var emailUp = document.getElementById("emailUp");
var passwordUp = document.getElementById("passwordUp");
var emailIn = document.getElementById("emailIn");
var passwordIn = document.getElementById("passwordIn");
var signUpBtn = document.getElementById("signUpBtn");
var upBtn = document.getElementById("upBtn");
var inBtn = document.getElementById("inBtn");
var logInBtn = document.getElementById("logInBtn");
var logOutBtn = document.getElementById("logOutBtn");
var signInDiv = document.querySelector(".signIn");
var signUpDiv = document.querySelector(".signUp");



//! switching to login page
function switchToLogin(){
    signUpDiv.classList.toggle("d-none")
    signInDiv.classList.toggle("d-none")
}
inBtn.addEventListener('click',function(){
    switchToLogin()
})

//! switching to signup page
function switchToSignUp(){
    signUpDiv.classList.toggle("d-none")
    signInDiv.classList.toggle("d-none")
}
upBtn.addEventListener('click',function(){
    switchToSignUp()
})




var userList=[]; //? the list that gonna resevs the data from the user
//! storing the data in the local storage
if(localStorage.getItem("userData")===null){
    userList =[]
}else{
    userList = JSON.parse(localStorage.getItem("userData"));
}


//! Name validation
function validateName(name) {
    const nameRegex = /^[a-zA-Z\s\-]+$/;
    return nameRegex.test(name);
}

//! Email validation
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

//! Password validation
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}


//! signUP adding the user info in the data base 
function addUser (){
    var success = document.getElementById("success");
    var error = document.getElementById("error");
    
    //? if the inputs are empty
    if(nameUp.value==''||emailUp.value==''||passwordUp.value==''){
        error.textContent = "All files are required."
        error.classList.remove("d-none");
        success.classList.add("d-none")
        return;
    }
    
    //? if the name are envalid
    if (!validateName(nameUp.value)) {
        error.textContent = "Invalid name. Only letters, spaces, and hyphens are allowed.";
        error.classList.remove("d-none");
        success.classList.add("d-none");
        return;
    }
    
    //? if the email are envalid
    if (!validateEmail(emailUp.value)) {
        error.textContent = "Invalid email format.";
        error.classList.remove("d-none");
        success.classList.add("d-none");
        return;
    }
    
    //? if the password are envalid
    if (!validatePassword(passwordUp.value)) {
        error.textContent = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character[@$!%*?&].";
        error.classList.remove("d-none");
        success.classList.add("d-none");
        return;
    }
    

    var userData ={
        name:nameUp.value,
        email:emailUp.value,
        password:passwordUp.value
    } //? take the user data and make it opjict so it can be stored all at once in the array

    userList.push(userData) //? adding the data that stored in userData in UserList
    localStorage.setItem("userData", JSON.stringify(userList)) //? add it in the local storage
    
    error.classList.add("d-none");
    success.classList.remove("d-none");
    success.textContent = "User registered Success!";
}
signUpBtn.addEventListener('click',function(){
    addUser ()
}) //! add the data on click


//! sign in function
function signIn(){
    var logInError = document.getElementById("logInError");
    var userExists = false;
    var userName = "";

    for(var i = 0; i < userList.length ; i++){
        if(userList[i].email === emailIn.value && userList[i].password === passwordIn.value){
            userExists=true;
            userName = userList[i].name;
            break;
        }
    }

    if(userExists){
        window.location.href="home.html"
        
    }else{
        logInError.classList.remove("d-none");
        logInError.textContent = "Invalid email or password.";
    }
}
logInBtn.addEventListener('click',function(){
    signIn()
})
