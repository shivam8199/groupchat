
const usersLogged=document.getElementById('userLoggedin');

const Form=document.getElementById('Form');

const message=document.getElementById('message');


//setTimeout(()=>{window.location.reload()},2000);


window.addEventListener('DOMContentLoaded',async (e)=>{
    try{
    e.preventDefault();
   
    const token=localStorage.getItem('token');
    const userLoggedinResponse=await axios.get('http://localhost:8000/usersLoggedin',{headers:{'Authorization':token}});
    

    //${userLoggedinResponse.data.res.firstname}
    
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(` You Joined`)); // or you joined will be displayed
    usersLogged.appendChild(li);
    
    displayCurrentMessages(userLoggedinResponse.data.res.firstname)
    
    displayAllUserMessages();
    
    displayListOfUsers()
    
    }

    catch(err){
        console.log(err);
    }

})

function displayCurrentMessages(user){
Form.addEventListener('submit',async(e)=>{
    e.preventDefault();
   
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(`${user}: ${message.value} `));
    usersLogged.appendChild(li);
    const GroupName=sessionStorage.getItem('groupName')
    let userMessage={
        umessage:message.value,
        userName:user,
        groupName:GroupName
    }
    const token=localStorage.getItem('token');
    
    const userLoggedinResponse=await axios.post('http://localhost:8000/chatAppHome/groupChatMessages',userMessage,{headers:{'Authorization':token}});
    
    
})
}

async function displayAllUserMessages(){
    try{
    const userGroupName=sessionStorage.getItem('groupName');
    const GroupName={
        userGroupName:userGroupName
    }

    const getAllGroupMessages=await axios.post('http://localhost:8000/chatAppHome/usersMessages',GroupName)
    

    for (i of getAllGroupMessages.data.res){
        allUserMessages(i.name,i.umessage);
    }


    }
    catch(err){
        console.log(err);
    }

}

function allUserMessages(user,Messages){
    
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(`${user}: ${Messages} `));
    usersLogged.appendChild(li);

}


const userList=document.getElementById('userList');


async function displayListOfUsers(){


    const userGroupName=sessionStorage.getItem('groupName');
    const GroupName={
        userGroupName:userGroupName
    }
    const token=localStorage.getItem('token');

    const allUserResponse=await axios.post('http://localhost:8000/displayListOfUsers',GroupName,{headers:{'Authorization':token}});

 
    const Admins=allUserResponse.data.Admin;

    for(i of allUserResponse.data.res){
        if(Admins.includes(i)){
            const li=document.createElement('li');
            li.appendChild(document.createTextNode(` ${i} * `));
                    
            userList.appendChild(li);
        }
        else{
            const li=document.createElement('li');
            li.appendChild(document.createTextNode(` ${i}  `));
                    
            userList.appendChild(li);
        }
    }
    


}