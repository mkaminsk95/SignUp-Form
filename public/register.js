function validateRegisterForm() {

    var firstNameValue =    document.forms["registerForm"]["firstName"].value;
    var secondNameValue =   document.forms["registerForm"]["secondName"].value;
    var emailValue =        document.forms["registerForm"]["email"].value;
    var passwordValue =     document.forms["registerForm"]["password"].value;
    
    var falseData = false;
    
    //getting alert 
    var firstNameAlert = document.querySelector("#firstName p");
    var secondNameAlert = document.querySelector("#secondName p");
    var emailAlert = document.querySelector("#email p:nth-of-type(1)");
    var emailFormatAlert = document.querySelector("#email p:nth-of-type(2)");
    var passwordAlert = document.querySelector("#password p");

    var firstNameInput = document.querySelector("#firstName input");
    var secondNameInput = document.querySelector("#secondName input");
    var emailInput = document.querySelector("#email input");
    var passwordInput = document.querySelector("#password input");    

    //checking in inpus isn't empty
    if (firstNameValue == "") {
        
        firstNameAlert.style.display = "block";
        firstNameInput.style.border = "1px solid red";
        firstNameInput.style['background-image'] = "url(\"images/icon-error.svg\")";
        falseData = true;
    } else {
        firstNameAlert.style.display = "none";
        firstNameInput.style.border = "1px solid #ccc";
        firstNameInput.style['background-image'] = "none";
    }
    

    if (secondNameValue == "") {
        
        secondNameAlert.style.display = "block";
        secondNameInput.style.border = "1px solid red";
        secondNameInput.style['background-image'] = "url(\"images/icon-error.svg\")"; 
        falseData = true;
    } else {
        secondNameAlert.style.display = "none";
        secondNameInput.style.border = "1px solid #ccc";
        secondNameInput.style['background-image'] = "none";
    }
        

    if (emailValue == "") {
        
        emailAlert.style.display = "block";
        emailInput.style.border = "1px solid red";
        emailInput.style['background-image'] = "url(\"images/icon-error.svg\")"; 
        falseData = true;
    } else {
        
        emailAlert.style.display = "none";
        emailInput.style.border = "1px solid #ccc";
        emailInput.style['background-image'] = "none"; 

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) { //checking if an email has a valid format
            emailFormatAlert.style.display = "block";
            emailInput.style.border = "1px solid red";
            emailInput.style['background-image'] = "url(\"images/icon-error.svg\")"; 
            falseData = true;
        } else {
            emailFormatAlert.style.display = "none"; 
            emailInput.style.border = "1px solid #ccc";
            emailInput.style['background-image'] = "none"; 
        }
    }
    

    if (passwordValue == "") {
        
        passwordAlert.style.display = "block";
        passwordInput.style.border = "1px solid red";
        passwordInput.style['background-image'] = "url(\"images/icon-error.svg\")"; 
        falseData = true;
    } else {
        passwordAlert.style.display = "none";
        passwordInput.style.border = "1px solid #ccc";
        passwordInput.style['background-image'] = "none"; 
    }


    //deciding if form is valid
    if(falseData == true) {
        return false;
    } else {
        return true;
    }
}


function inputChanged(input) {

    var alert = document.querySelector("#"+input.name+" p");

    alert.style.display = "none";
    input.style.border = "1px solid #ccc";
    input.style['background-image'] = "none";

    if(input.name == "email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value) ) {
        
        alert = document.querySelector("#"+input.name+" p:nth-of-type(2)");
        alert.style.display = "none";
    }

}


