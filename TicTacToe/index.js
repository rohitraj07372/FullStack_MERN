const boxes = document.querySelectorAll('.box');
const newGameBtn = document.querySelector('.newGameBtn');
const gameInfo = document.querySelector('.gameInfo');


let currentPlayer;
let grid;
const WinningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
    
];
function initGame()
{
    currentPlayer = "X";
    grid=["","","","","","","","",""];
    newGameBtn.classList.remove("active");
    //empty all boxes on ui 
    boxes.forEach((box,index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // remove the green background color
        box.classList.remove('win');
    })
    
    
    gameInfo.innerText = `Current Player - ${currentPlayer} `
}
initGame();

function swapTurn()
{
    
    if(currentPlayer === "X")
    {
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    //change in ui
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
};

boxes.forEach((box,index) =>{
   box.addEventListener('click', ()=>{
            handleClick(index);
            
   })
});


function  checkGameOver(){
    let ans = "";
    WinningPositions.forEach((position) =>{
       if((grid[position[0]] !== "" || grid[position[1]] !==""  ||  grid[position[2]] !=="") && 
       grid[position[0]] === grid[position[1]] && grid[position[1]] === grid[position[2]]){
            if(grid[position[0]]==="X")
                {ans="X";}
            else
                {ans = "O";}

        //we got our winner so stop the pointer event
        boxes.forEach((box)=>{
              box.style.pointerEvents = "none";
        });
             //add green color to boxes
       boxes[position[0]].classList.add("win");
       boxes[position[1]].classList.add("win");
       boxes[position[2]].classList.add("win");
       }
      
    });

    if(ans !== "")
    {
        gameInfo.innerText = `Winner is - ${ans}`;
        newGameBtn.classList.add('active');
        return;
    }
    //when there is no winner
    let fillCount = 0;
    grid.forEach((box)=>{
        if(box!=="") fillCount++;
    });
    if(fillCount === 9)
    {
        gameInfo.innerText = `Game Tied ! Click on New Game`;
        newGameBtn.classList.add('active');
    }
}

function handleClick(index)
{
    if(grid[index]==="")
    {
        boxes[index].innerText = currentPlayer;
        grid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
         console.log(index);
        //swap the player
        swapTurn();
        //check if any play won or not
        checkGameOver();
    }
}

newGameBtn.addEventListener('click',initGame);