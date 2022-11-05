

const showGroups=document.getElementById('showGroups');
const userGROUPS=document.getElementById('userGROUPS');

window.addEventListener('DOMContentLoaded',async (e)=>{
    e.preventDefault();
    const token=localStorage.getItem('token');
    const userMessages=await axios.get('http://localhost:8000/usersGroups',{headers:{'Authorization':token}});
    console.log(userMessages);
    for(i of userMessages.data.res){
      
        displayGroups(i);
    }

})

function displayGroups(displayName){
  
    const button=document.createElement('button');
    button.innerText=displayName;
    button.id='usersButton';
    button.className=displayName;
    userGROUPS.appendChild(button);
    
    const usersButton=document.getElementsByClassName(displayName);
    for(i of usersButton){
    i.addEventListener('click',async (e)=>{
        try{
        console.log(button.className);
        
        const userGroupName={
            usergroupname:button.className
        }
        // const userMessages=await axios.post('http://localhost:8000/userGroupName',userGroupName);
        // console.log(userMessages.data.res);
        
        sessionStorage.setItem('groupName',button.className)
        alert(`Opening Group ${button.className}`);
        window.location.href='../messages/messages.html'
    }
    catch(err){
        console.log(err);
    }
    })
}
}

const Logout=document.getElementById('logout');
Logout.addEventListener('click',(e)=>{
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    alert('you are being logging out')
    window.location.href='../LoginPage/login.html'
})