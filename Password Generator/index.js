const inputSlider = document.querySelector("[data-lengthSlider]");
const display_length = document.querySelector("[change-length]");
const display_password = document.querySelector("[data-password-display]");
const cpy_msg = document.querySelector("[data-copied-msg]");
const cpy_btn = document.querySelector("[data_cpy]")
const upper_case_check = document.querySelector("#upperCase");
const lower_case_check = document.querySelector("#LowerCase");
const number_check = document.querySelector("#number");
const symbol_check = document.querySelector("#symbol");
const indicator = document.querySelector("[strength-indicator]");
const generate_btn = document.querySelector(".generateButton");
const all_checkbox = document.querySelectorAll("input[type = checkbox]");
const symbols = '.~`!@#$%^&*()_-+={[}]|:;"<,>?/';
let password = "";
let password_length = 10;
let check_count = 0;

handle_Slider();

//set password length wth slider
function handle_Slider(){
    inputSlider.value = password_length;
    display_length.innerText = inputSlider.value;
    // fill slider background color according to number
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize =
      ((password_length - min) * 100) / (max - min) + "% 100%";
}



function shufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // find out random j
      const j = Math.floor(Math.random() * (i + 1));
      // swap 2 numbers
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    let str = "";
    // array.forEach((el) => (str += el));
    str = array.join("");
    return str;
}
//set indicator color

function setIndicator(color){
  indicator.style.backgroundColor = color;
  //shadows
  indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}

//Random integer

function get_random_integer(min,max)
{
   return Math.floor(Math.random()*(max-min)) +min;
}

function generate_rand_number()
{
    return get_random_integer(0,9);
}

//lower case generate

function generate_lower_case()
{
    return String.fromCharCode( get_random_integer(97,123));

}

//upper case generate 
function generate_upper_case()
{
    return String.fromCharCode(get_random_integer(65,91));
}

//generate symbols
 

function generate_symbols()
{

    const rnd = get_random_integer(0, symbols.length);
    

    return symbols.charAt(rnd);
}
console.log(generate_symbols());

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;
         
    if(upper_case_check.checked) hasUpper = true;
    if(lower_case_check.checked) hasLower = true;
    if(number_check.checked) hasNumber = true;
    if(symbol_check.checked) hasSymbol = true;

    if(hasUpper && hasLower && (hasNumber || hasSymbol) && password_length >= 8){
        setIndicator("#0f0");
    }
    else if((hasUpper || hasLower) && (hasNumber || hasSymbol) && password_length >= 6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}

async function copyContent()
{
    try{
        await navigator.clipboard.writeText(display_password.value);
        cpy_msg.innerText = "copied";
    }
   catch(e)
   {
       cpy_msg.innerText = "Failed";    
   }
   cpy_msg.classList.add("active");
    setTimeout(() => {
        cpy_msg.classList.remove("active");
    }, 2000);
}
function handelCheckboxChange()
{
    check_count = 0;
    all_checkbox.forEach((checkbox) =>{
        if(checkbox.checked== true)
        {
            check_count++;
        }
        
        
    });
     
    if(password_length<check_count)
    {
        password_length = check_count;
        handle_Slider();
    }
}

all_checkbox.forEach((checkbox) => {
    checkbox.addEventListener('change', handelCheckboxChange);
})


inputSlider.addEventListener('input', (e) => {
    password_length = e.target.value;
    handle_Slider();
});

cpy_btn.addEventListener('click',()=>{
    if(display_password.value)
    {
        copyContent();
    }
});

generate_btn.addEventListener('click',()=>{

    if(check_count<=0) return;
    if(password_length<check_count)
    {
        password_length=check_count;
        handle_Slider();
    }
// generate new password

//remove old password
password = "";

// if(upper_case_check.checked)
// {
//     password+= generate_upper_case();
// }
// if(lower_case_check.checked)
// {
//     password+= generate_lower_case();
// }

// if(number_check.checked)
// {
//     password+= generate_rand_number();
// }
// if(symbol_check.checked)
// {
//     password+= generate_symbols();
// }
 let funArr=[];
 
 if(upper_case_check.checked)
 {
    funArr.push(generate_upper_case);
    
 }
 if(lower_case_check.checked)
 {
    funArr.push(generate_lower_case);

 }
 if(number_check.checked)
 {
    funArr.push(generate_rand_number);
    
 }
 if(symbol_check.checked)
 {
    funArr.push(generate_symbols);
    
 }

 for(let i=0;i<funArr.length;i++)
 {
    password+=funArr[i]();
 }
for(let i=0;i<password_length-funArr.length;i++)
{
    let randIndex = get_random_integer(0, funArr.length);
    password+=funArr[randIndex]();
}

//shuffle the password
password = shufflePassword(Array.from(password));
display_password.value = password;

//calculate strength
calcStrength();

});