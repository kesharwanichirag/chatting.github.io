const user_1_add_btn = document.querySelector("#user_1_add_btn");
const user_2_add_btn = document.querySelector("#user_2_add_btn");
const users_records = document.querySelector("#users_records");
const messages = document.querySelector("#messages");

// ### User Object
let user = {
    userId: "" ,
    message: "",
    savedTime:"",
    liked: false
}

// ### Counter ###
let row = 0;

// ### Add fields 1 ###
user_1_add_btn.addEventListener('click',(e)=>{

    const field = `<div class="">
                        <div class="my-2">
                            <textarea type="input" class="form-control user_data user_1" id="exampleFormControlInput1" placeholder="Enter User 1"></textarea>
                        </div>   
                    </div>`;

    const deleteBtn = `<div class=""><i class="fa-solid fa-circle-xmark btn btn-danger my-2 delete_btn"></i></div>`;

    addInput(field,deleteBtn);
});
    
// ### Add fields 2 ###
user_2_add_btn.addEventListener('click',(e)=>{

    const field = `<div class="">
                        <div class="my-2">
                            <textarea type="input" class="form-control user_data user_2" id="exampleFormControlInput2" placeholder="Enter User 2"></textarea>
                        </div>   
                    </div>`;

    const deleteBtn = `<div class=""><i class="fa-solid fa-circle-xmark btn btn-danger my-2 delete_btn"></i></div>`;

    addInput(field,deleteBtn);
});

// ### method for Adding ###
const addInput = (field,deleteBtn)=>{
    const nr = users_records.insertRow(row++);

	const c1 = nr.insertCell(0);
	const c2 = nr.insertCell(1);

    c1.innerHTML += field;
    c2.innerHTML += deleteBtn; 

};

// #### Delete Fields ####
const deleteInput = (index)=>{
    const user_data = Array.from(document.querySelectorAll(".user_data")); 
    
    user_data.splice(index,1);
};

users_records.addEventListener('click',(e)=>{
    if(e.target.classList.contains("delete_btn")){
        e.target.closest("tr").remove(row--);        
    }else{
        console.log(e.target);
    }
});

//### save chats ###
submit_btn.addEventListener('click',(e)=>{
    e.preventDefault();

    const user_data = Array.from(document.getElementsByClassName("user_data"));

    saveChats(user_data);
});

let saveChats = (userDatas)=>{
    userDatas.forEach((data)=>{
        
        if(data.value.trim()==0){
            alert("enter data");
        }else{
            let task = localStorage.getItem("user");

            if(task == null){
                taskObj = [];
            }else{
                taskObj = JSON.parse(task);
            }

            if(data.className == 'form-control user_data user_1'){
                user.userId = 1;
            }else if(data.className == 'form-control user_data user_2'){
                user.userId = 2;
            }else{
                console.log("null User Id");
            }
            
            user.message = data.value;
            user.savedTime = new Date().getTime();
            
            taskObj.push(user);

            localStorage.setItem("user",JSON.stringify(taskObj));
            data.value = "";
        }
    });

    showChats();
};

// ### Check Links in Messages ####
const checkLinks = (userId,text)=>{
    var urlRegex = /(https?:\/\/[^\s]+)/g;

    if(userId == 1){
        return text.replace(urlRegex, function(url) {
            return '<a class="links_left" href="' + url + '">' + url + '</a>';
        })
    }else if(userId == 2){
        return text.replace(urlRegex, function(url) {
            return '<a class="links_right" href="' + url + '">' + url + '</a>';
        })
    }else{
        console.log('No User Id');
    }
    
}

// ### show Chats in UI ###
const showChats = ()=>{
    messages.innerHTML = '';
	let task = localStorage.getItem("user");

	if(task == null){
		taskObj = [];
	}else{
		taskObj = JSON.parse(task);
	}
    
    let data;

	taskObj.forEach((obj,index)=>{
        if(obj.userId != null){
            if(obj.userId == 1){
                    let textWithLinkCheck = checkLinks(obj.userId,obj.message);
                    messages.innerHTML += `<div class="answer left my-1">
                                                <div class="avatar">
                                                    <img src="lakshman.jpg" alt="User name">
                                                </div>
                                                <div class="text" ondblclick="likeMessages(${index})">
                                                    ${textWithLinkCheck}
                                                </div>
                                            </div>`                   
                
            }

            if(obj.userId == 2){
                let textWithLinkCheck = checkLinks(obj.userId,obj.message);
                messages.innerHTML += `<div class="answer right normal my-1">
                                                <div class="text" ondblclick="likeMessages(${index})">
                                                    ${textWithLinkCheck}
                                                </div>
                                            </div>`
            }

        }else{
            alert('!');
        }
	});
};

const likeMessages = (index)=>{
    let task = localStorage.getItem("user");

	if(task == null){
		taskObj = [];
	}else{
		taskObj = JSON.parse(task);
        taskObj[index].liked = true;
	}

    localStorage.setItem("user",JSON.stringify(taskObj));
};

//### On load ###
window.addEventListener('load',(e)=>{
    showChats();
});


