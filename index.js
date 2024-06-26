const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// function to initialize the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // To make boxes empty on UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList=`box box${index+1}`;
    });
    newGameBtn.classList.remove(".active");
    gameinfo.innerText = `Current Player- ${currentPlayer}`;
}
initGame();

function swapturn() {
    if (currentPlayer == "X") {
        currentPlayer = "O"
    }
    else {
        currentPlayer = "X";
    }
    // UI Update
    gameinfo.innerText = `Current Player- ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";
    winningPosition.forEach((position) => {
        // all boxes should be non-empty and values of all boxes should be same
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]]=== gameGrid[position[2]])) {
            // check which player is winner
            if(gameGrid[position[0]]==="X"){
                answer="X";
            }
            else{
                answer="Y";
            }
            // disable pointer events
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            });
            // add greeen color to winner line
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    
    //WE have a winner
    if(answer!==""){
        gameinfo.innerText=`Winner Player- ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    // let's check if there is no winner i.e. game is tied
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }
    });
    //Game is  Tied
    if(fillCount===9){
        gameinfo.innerText="Game Tied!";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap turn
        swapturn();
        // Check if any player won the game
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);