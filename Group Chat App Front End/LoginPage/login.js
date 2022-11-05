const Form=document.querySelector('#Form');
const Email=document.querySelector('#Email');
const password=document.querySelector('#Password');

Form.addEventListener('submit',(event)=>{saveUserDetails(event)});

async function saveUserDetails(event){
    
    try{
    
    event.preventDefault();
    let user={

        UEmail:Email.value,
        UPassword:password.value
    }
    
    let response=await axios.post('http://localhost:8000/userLogin',user);
    console.log(response.data.res);

    if(response.data.success===true){
    alert(response.data.message);
    localStorage.setItem('token',response.data.res);
    window.location.href='../ChatAppHome/chatAppHome.html';

    }
    else{
    alert(response.data.message);
    Email.value='';
    password.value='';
    }
    }
    catch(err){
        console.log(err);
    }
    

}

