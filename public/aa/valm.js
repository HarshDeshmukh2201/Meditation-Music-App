
function validation2() {
    var name = document.getElementById("name").value;
    if(name==""){
        document.getElementById("u1").innerHTML="** please fill the name field"
        return false;  
    }

    var email = document.getElementById("email").value;
    if(email==""){
        document.getElementById("u2").innerHTML="** please fill the email field"
        return false;  
    }
    var password = document.getElementById("password").value;
    if(password==""){
        document.getElementById("u3").innerHTML="** please fill the password field"
        return false;  
    }
    var Cpassword = document.getElementById("Cpassword").value;
    if(Cpassword==""){
        document.getElementById("u4").innerHTML="** please fill the Confirm password field"
        return false;  
    }
    var mobile = document.getElementById("mobile").value;
 if(mobile==""){
        document.getElementById("u5").innerHTML="** please fill the Mobile No. field"
       return false;  
    }
    
    if(password!=Cpassword){
        document.getElementById("u3").innerHTML="** password are not matching"
        document.getElementById("u4").innerHTML="** password are not matching"
        return false;
    }

    if(password.length<=5 || password.length>=10 ){
    document.getElementById("u3").innerHTML="** password min 6 max 10"
    return false;
}
}
    

  

