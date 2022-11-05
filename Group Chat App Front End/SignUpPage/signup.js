
const Form=document.querySelector('#Form');
const firstName=document.querySelector('#FirstName');
const lastName=document.querySelector('#LastName');
const userId=document.querySelector('#userId');
const Email=document.querySelector('#Email');
const password=document.querySelector('#Password');
var rePassword = document.getElementById("Re-EnterPasssword");
const err=document.querySelector('#err');


Form.addEventListener('submit',(event)=>{saveLoginDetails(event)});

async function saveLoginDetails(event){
    event.preventDefault();
try{
    
    if(password.value!=rePassword.value){
        err.innerHTML='*Please Check The password';
        setTimeout(()=>{
         err.innerHTML=''
        },2000);
    }
    else{
   event.preventDefault();
   let userDetails={
    UFirstName:firstName.value,
    ULastName:lastName.value,
    UserId:userId.value,
    UEmail:Email.value,
    UPassword:password.value
   }
   firstName.value='',
   lastName.value='',
   userId.value='',
   Email.value='',
   password.value=''
   let response=await axios.post('http://localhost:8000/userSignUp',userDetails);
   
   console.log(response);
   alert(response.data.message);
   window.location.href='../LoginPage/login.html'
   
}
}
catch(err){
    console.log(err);
}
}



const checkbox=document.querySelector('#checkbox');

checkbox.addEventListener('click',checkPassword);
function checkPassword() {
   
    
    if (password.type === "password" && rePassword.type === "password") {
        password.type = "text";
        rePassword.type = "text";
    } else {
        password.type = "password";
        rePassword.type = "password";
    }
  }
