

let add = document.querySelector("#btn");
let input = document.querySelector("#inputText");

let list = document.querySelector(".lists");



        
function addTask(){
    if(input.value=="") alert("Enter the task first");
    else{
        let li = document.createElement("li");
        
                       
      
        li.innerText = input.value;
        list.appendChild(li);

        let span = document.createElement('span');
        span.innerText='\u00d7';
        li.appendChild(span);
       
    }
    input.value = "";
    saveData();
}

// span.addEventListener('click',()=>{
//     list.removeChild(li);
//     console.log("task removed");
// })

list.addEventListener('click', (e)=>{
    // console.log(e.target.tagName);
  if(e.target.tagName == 'LI'){
    
    e.target.classList.toggle('checked');
    saveData();
  }
  else if(e.target.tagName =='SPAN')
  {
    e.target.parentElement.remove();
    console.log(e.target.parentElement);
    saveData();
  }
})


add.addEventListener('click', ()=>{
    addTask();
})


function saveData(){
    localStorage.setItem('data', list.innerHTML);
    console.log(localStorage);
}

 


function showTask(){
    list.innerHTML = localStorage.getItem("data");
    console.log("local"+localStorage);
    console.log(list.innerHTML);
}

showTask();

 