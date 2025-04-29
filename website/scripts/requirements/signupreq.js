
//---------------------------------------------------------------------------
//Autorisering for inloggning, skapades innan jag läste instruktionerna, blir 
//en mall istället
//---------------------------------------------------------------------------
/*

// Login Info

var email = document.getElementById('signupEmail').value;
var emailConfirm = document.getElementById('signupConfirmEmail').value;
var password = document.getElementById('signupPassword').value;
var username = document.getElementById('signupUsername').value;

//Email Validation
function checkEmailReq(email) {

  var validemail = true;
  function returnFalseEmail() {
    console.log("Invalid email");
    validemail = false;
  }

  while (validemail = true) {
   if (email === "") {
    returnFalseEmail();
    break;
   }
    if (email.includes("@") === false) {
      returnFalseEmail();
      break;
   }
    if(email[0] === "@" || email[ email.length - 1 ] === "@") {
      returnFalseEmail();
      break;
    }

    if (email.indexOf("@") > email.indexOf(".")) {
      returnFalseEmail();
      break;
    }

    else if (email.includes(".") === false) {
      returnFalseEmail();
      break;
  }
  else {
    console.log(true);
    break;
  }
}
}


//Password Validation

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                 'u', 'v', 'w', 'x', 'y', 'z'];

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const specialChars = ['!', '@', '#', '$', '%', '&', '*'];

function checkPasswordReq() {
    if (password === "") {
        alert("Password cannot be empty");
        return false;
    }
    else if (password.length < 8) {
        alert("Password must be at least 8 characters long");
        return false;
    }
    else if (password.length > 20) {
        alert("Password must be less than 20 characters long");
        return false;
    }
    else if (password.toLowerCase().includes(letters) === false) {
        alert("Password must contain at least one letter");
        return false;
    }
    else if (password.includes(numbers) === false) {
        alert("Password must contain at least one number");
        return false;
    }
    else if (password.includes(specialChars) === false) {
        alert("Password must contain at least one special character ('!', '@', '#', '$', '%', '&', or '*')");
        return false;
    }
    else {
        return true;
  }
}

//Username Validation
//(borrowed from Chat GPT)
const allowedSpecialChars = ['_', '-', '.'];

function checkUsernameReq(username) {
    if (username === "") {
        console.log("Please enter a username");
        return false;
    }
    if (username.length < 3) {
        console.log("Username must be at least 3 characters long");
        return false;
    }
    if (username.length > 15) {
        console.log("Username must be less than 20 characters long");
        return false;
    }
    
    if (!/[a-zA-Z]/.test(username)) {
        console.log("Username must contain at least one letter");
        return false;
    }
    for (let char of username) {
        if (!/[a-zA-Z]/.test(char) && !allowedSpecialChars.includes(char) && !/[0-9]/.test(char)) {
            console.log(`Invalid special character ' ${char} ' in username. Only ' _ ', ' - ', and ' . ' are allowed.`);
            return false;
        }
    }

    return(username.toLowerCase());
}
*/