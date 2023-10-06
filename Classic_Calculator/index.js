//fetching variables 

//character image change
 
const image = document.querySelector('[image]');
//middle keys
const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const Four = document.querySelector(".four");
const five = document.querySelector(".five");
const six = document.querySelector(".six");
const seven = document.querySelector(".seven");
const eight = document.querySelector(".eight");
const nine = document.querySelector(".nine");
const zero = document.querySelector(".zero");
const  double_zero= document.querySelector(".doubleZero");
const  dot = document.querySelector(".dot");
const middle = document.querySelectorAll('.middle');
//left keys

const gt = document.querySelector('#gt');
const mu = document.querySelector('#mu');
const plus_minus = document.querySelector('#plus_minus');
const root=   document.querySelector('#root');
const clear = document.querySelector('#ce');
const left = document.querySelectorAll(".left")

//right keys

const divide = document.querySelector('.divide');
const multiply = document.querySelector('.multiply');
const modulo = document.querySelector('.modulo');
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const equal = document.querySelector('.equal');
const on_off = document.querySelector('.on_off');
const backspace = document.querySelector('.backspace');
const left_bracket = document.querySelector('.left_bracket');
const right_bracket = document.querySelector('.right_bracket');
const auto_replay = document.querySelector('.auto_reply');
const right = document.querySelectorAll('.right');

//check keys

const check = document.querySelector('.check');
const left_arrow = document.querySelector('.left_arrow');
const right_arrow = document.querySelector('.right_arrow');
const correct = document.querySelector('.correct');
const solar_display = document.querySelector('.solar_display')
//input box

const upper_input = document.querySelector('.upper');
const lower_input = document.querySelector('.lower');
const auto_dot = document.querySelector('.auto_dot_off');

// variables
let value = "";
prev_value="";
let off = true;
let on = false;
let auto_off=true;
let auto_on=false;

//********** check if value is empty of not according to which double zero btn work ********
check_doubleZero(parseFloat(value));


// *********** reset function ***************
function reset()
{
    on = false;
    off = true;
    value="";
    prev_value="";
    upper_input.value = value;
    lower_input.value="";
}



// ********************* block button **********************
function block_button(){
   middle.forEach((btn)=>{
    btn.style.pointerEvents = "none";
   });
   left.forEach((btn)=>{
    btn.style.pointerEvents = "none";
   });
   right.forEach((btn)=>{
    btn.style.pointerEvents = "none";
   });


}

block_button()
 
// ****************** active button **************
function active_button(){
    middle.forEach((btn)=>{
     btn.style.pointerEvents = "all";
    });
    left.forEach((btn)=>{
        btn.style.pointerEvents = "all";
       });
       right.forEach((btn)=>{
        btn.style.pointerEvents = "all";
       });
    
 }


// ****************** function to handle middle button ***************

 middle.forEach((box) =>{
    box.addEventListener('click', (e)=>{
        handleMiddleClick(e);
    });
 });

 right.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
         
        handleRightmostBtnClick(e);
    });
 });

 //  **************** handle middle keys **************

 function handleMiddleClick(num){
    
    
        
        value+=num.target.value;
        upper_input.value = value;
        check_doubleZero(value);
        check_for_zero(value);
        try{
            showResult();
        }
        catch(e)
        {
            lower_input.value = prev_value;
        }
      

        
    
      
 }
  // *********** handle rightmost keys *****************
 function handleRightmostBtnClick(operations){
    
    value+=operations.target.value;
    upper_input.value = value;
   
    
 }

right_bracket.addEventListener('click',showResult);

//****************** clear button *****************
clear.addEventListener('click',()=>{
    reset();
});

// ********** on off button **************

on_off.addEventListener('click',()=>{
   if(off === true)
   {
     on = true;
     off=false;
     solar_display.classList.remove('off');
     solar_display.classList.add('on');
     solar_display.innerText = "ON";
      
     image.src = "./asset/artistan_character.png";
 
     active_button();
   }
   else{
    off = true;
    on=false;
    solar_display.innerText = "OFF";
    solar_display.classList.remove('on');
    solar_display.classList.add('off');
     
    image.src = "./asset/sleep.png";
    block_button();
    reset();

   }
});

// *************** backspace **********************
backspace.addEventListener('click',()=>{
    if(value.length >0)
    {
        value = value.slice(0,-1);
        upper_input.value = value;

        showResult();
    }
    
  
     
});

// **************check if value is empty then 00 button should be blocked ************
function check_doubleZero(){
     let x = parseInt(value);
    if(x===null || x===0o0 || x === 0)
    {
        double_zero.style.pointerEvents = "none";
    }
    else
    {
        double_zero.style.pointerEvents = "all";
    }
}

//  ****************** calculate root ***************
// root.addEventListener('click',()=>{
      
        
//         let x = Math.sqrt(value);
//          if(x!==NaN || x!== undefined)
//          {
//             upper_input
//          }

// });

function check_for_zero(){
    let x = parseInt(value);
    if(x===null || x===0o0 || x === 0)
    {
        zero.style.pointerEvents = "none";
    }
    else
    {
        zero.style.pointerEvents = "all";
    }
}

//*************** show answer on lower input ****************
function showResult(){
    const res = calculateResult(value);
    console.log(res);
    try{
       
        if(res === NaN || res === undefined){
            lower_input.value="";
            prev_value = lower_input.value;
        }
        else{
            lower_input.value = res;
            prev_value = lower_input.value;
        }
    }
    catch(error)
    {
        lower_input.value = "error";
    }
    
}


// ************ evaluation ********************
function calculateResult(val)
{ 
    try{
        const res = eval(val);
        return res;
    }
    catch(e)
    {
        console.log("error");
    }
    
    
}

// ************ equal button **************
equal.addEventListener('click', ()=>{
   if(lower_input.value !=""){
    value = lower_input.value;
    upper_input.value = value;
    lower_input.value="";
   }
    
    
 });


 // ************* auto replay function *********************
auto_replay.addEventListener('click',()=>{
     if(auto_off===true)
     {
        auto_off =false;
        auto_on = true;
        auto_dot.classList.remove('auto_dot_off');
        auto_dot.classList.add('auto_dot_on');
        reset();    
        left_bracket.style.pointerEvents = "none";
        right_bracket.style.pointerEvents = "none";
        

     }
     else{
        auto_off =true;
        auto_on = false;
        auto_dot.classList.remove('auto_dot_on');
        auto_dot.classList.add('auto_dot_off');
        reset();
        left_bracket.style.pointerEvents = "all";
        right_bracket.style.pointerEvents = "all";
        
 
     }


});

// **************** handle auto replay ******************

// function handle_auto_reply()
// {
//     let result = calculateResult(value);
//     console.log(result);
//     if(auto_on===true){
//         if(result !== NaN && result !== undefined)
//         {
//             value = result;
//             console.log("value is "+value);
//             upper_input.value = value;
//             lower_input.value = "";
//         }
        
//     }
   
// }