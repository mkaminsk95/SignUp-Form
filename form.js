function validateRegisterForm() {

    var firstNameInput =    document.forms["registerForm"]["firstName"].value;
    var secondNameInput =   document.forms["registerForm"]["secondName"].value;
    var emailInput =        document.forms["registerForm"]["email"].value;
    var passwordInput =     document.forms["registerForm"]["password"].value;
    
    var falseData = false;
    
    //getting alert 
    var firstNameAlert = document.querySelector("#firstNameAlert");
    var secondNameAlert = document.querySelector("#secondNameAlert");
    var emailAlert = document.querySelector("#emailAlert");
    var emailFormatAlert = document.querySelector("#emailFormatAlert");
    var passwordAlert = document.querySelector("#passwordAlert");

    //checking in inpus isn't empty
    if (firstNameInput == "") {
        
        firstNameAlert.style.display = "block";
        falseData = true;
    } else 
        firstNameAlert.style.display = "none";
    

    if (secondNameInput == "") {
        
        secondNameAlert.style.display = "block";
        falseData = true;
    } else 
        secondNameAlert.style.display = "none";
        

    if (emailInput == "") {
        
        emailAlert.style.display = "block";
        falseData = true;
    } else {
        
        emailAlert.style.display = "none";
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) { //checking if an email has a valid format
            emailFormatAlert.style.display = "block";
            falseData = true;
        } else 
            emailFormatAlert.style.display = "none"; 
    }
    

    if (passwordInput == "") {
        
        passwordAlert.style.display = "block";
        falseData = true;
    } else 
        passwordAlert.style.display = "none";


    //deciding if form is valid
    if(falseData == true) {
        return false;
    } else {
        return true;
    }
}
