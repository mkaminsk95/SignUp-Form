function validateRegisterForm() {

    var falseData = false;
    
    //getting alerts 
    var firstNameAlert =    document.querySelector("#firstName p");
    var secondNameAlert =   document.querySelector("#secondName p");
    var emailAlert =        document.querySelector("#email p:nth-of-type(1)");
    var emailFormatAlert =  document.querySelector("#email p:nth-of-type(2)");
    var passwordAlert =     document.querySelector("#password p");

    var alertIconPath =     "images/icon-error.svg";

    //getting iputs
    var firstNameInput =    document.querySelector("#firstName input");
    var secondNameInput =   document.querySelector("#secondName input");
    var emailInput =        document.querySelector("#email input");
    var passwordInput =     document.querySelector("#password input");    

    //checking in inpus isn't empty
    if (firstNameInput.value == "") {
        
        firstNameAlert.style.display = "block";
        firstNameInput.style.border = "1px solid red";
        firstNameInput.style['background-image'] = "url(\""+alertIconPath+"\")";
        falseData = true;
    } else {
        firstNameAlert.style.display = "none";
        firstNameInput.style.border = "1px solid #ccc";
        firstNameInput.style['background-image'] = "none";
    }
    

    if (secondNameInput.value == "") {
        
        secondNameAlert.style.display = "block";
        secondNameInput.style.border = "1px solid red";
        secondNameInput.style['background-image'] = "url(\""+alertIconPath+"\")"; 
        falseData = true;
    } else {
        secondNameAlert.style.display = "none";
        secondNameInput.style.border = "1px solid #ccc";
        secondNameInput.style['background-image'] = "none";
    }
        

    if (emailInput.value == "") {
        
        emailAlert.style.display = "block";
        emailInput.style.border = "1px solid red";
        emailInput.style['background-image'] = "url(\""+alertIconPath+"\")"; 
        falseData = true;
    } else {
        
        emailAlert.style.display = "none";
        emailInput.style.border = "1px solid #ccc";
        emailInput.style['background-image'] = "none"; 

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) { //checking if an email has a valid format
            emailFormatAlert.style.display = "block";
            emailInput.style.border = "1px solid red";
            emailInput.style['background-image'] = "url(\""+alertIconPath+"\")"; 
            falseData = true;
        } else {
            emailFormatAlert.style.display = "none"; 
            emailInput.style.border = "1px solid #ccc";
            emailInput.style['background-image'] = "none"; 
        }
    }
    

    if (passwordInput.value == "") {
        
        passwordAlert.style.display = "block";
        passwordInput.style.border = "1px solid red";
        passwordInput.style['background-image'] = "url(\""+alertIconPath+"\")"; 
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


