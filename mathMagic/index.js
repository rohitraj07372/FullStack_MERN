const textEnglish = document.querySelector(".english");
const textHindi = document.querySelector(".hindi");
const reset = document.querySelector(".reset");
const next = document.querySelector(".next");

//find random number between 1 to 100
let x = Math.floor(Math.random()*100);
const remaining = x/2;
let nextCount = 0;
//english text array
let txtEnglish=["Think any amount in your mind, For easy calculation choose small amount or take a calculator for calculation.",
 "Now take the same amount form your friend and add them to the original amount.",
`Now I'm giving you ${x} amount add them too.`,
"Now suppose you like cigarettes, so you spent half the money on them. Remember the money you have left.",
"Okay, now return the money you have taken from your friend.",
`Alright, Let me guess the remaining amount with you. Is it ${remaining} 😅😅😅😅`];

//hindi text array
let txtHindi=["अपने मन में कोई भी राशि सोचें, आसान गणना के लिए छोटी राशि चुनें या गणना के लिए कैलकुलेटर लें।","अब उतनी ही राशि अपने मित्र से लें और उन्हें मूल राशि में जोड़ दें।",
`अब मैं तुम्हें ${x}  राशि दे रहा हूँ, उन्हें भी जोड़ दो।`,
"अब मान लीजिए कि आपको सिगरेट पसंद है, तो आपने आधा पैसा उस पर खर्च कर दिया। जो पैसा आपके पास बचा है उसे याद रखें।",
"ठीक है, अब जो पैसे तुमने अपने दोस्त से लिये थे, उन्हें वापस कर दो।",
`ठीक है, मुझे आपके पास शेष राशि का अनुमान लगाने दीजिए। क्या यह ${remaining} है?😅😅😅😅`];



function handleNext()
{
   textEnglish.innerText = txtEnglish[nextCount];
    textHindi.innerText = txtHindi[nextCount];
   nextCount++;
   if(nextCount >=  txtEnglish.length)
   {
    next.disabled = true;
    next.style.pointerEvents = "none";
   }
}

next.addEventListener('click', ()=>{
    handleNext();
});

reset.addEventListener('click',()=>{
    if(nextCount >= txtHindi.length)
    {
        nextCount=0;
        textEnglish.innerText = "Click the 'NEXT' button to start the  game.";
        textHindi.innerText = "गेम शुरू करने के लिए 'NEXT' बटन पर क्लिक करें।"
        next.disabled = false;
        next.style.pointerEvents = "all";
    }
    else{
        if(confirm("Do your really want to Reset?") == true)
        {
            nextCount=0;
            textEnglish.innerText = "Click the 'NEXT' button to start the  game.";
            textHindi.innerText = "गेम शुरू करने के लिए 'NEXT' बटन पर क्लिक करें।"
            next.disabled = false;
            next.style.pointerEvents = "all";  
        }
    }
  
});