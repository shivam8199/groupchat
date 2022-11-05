const form=document.getElementById('Form');
const email=document.getElementById('email');
const newEmail=document.getElementById('newEmail');


form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    let userEmail={
        email:email.value
    }
    
    let response= await axios.post(`http://localhost:8000/forgotPassword`,userEmail);
    console.log(response.data);
    alert(response.data.message);
 
   
    
})


// newEmail.addEventListener('submit',(e)=>{
//     e.preventDefault();
    
//     window.location.href='../LoginPage/login.html.html';
// })



   // let newResponse= await axios.put(`http://127.0.0.1:5500/forgotPassword/resetPassword/${UID}`);
