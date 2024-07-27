const gameInfo = document.querySelector(".gameInfo");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector("[data-btn]");

// initially:
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
  [2, 4, 6],
];

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].classList.remove("win");
    boxes[index].style.pointerEvents = "all";
  })
  gameInfo.innerText = `Current player - ${currentPlayer}`;
  newGameBtn.classList.remove("active");
}
initGame();

function swapTurn() {
  if (currentPlayer == "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
   let answer = "";
    winningPosition.forEach((position) => {
        if((gameGrid[position[0]]!= "" || gameGrid[position[1]] != "" || gameGrid[position[2]] != "")
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
        
       // matlb winning waali condition aagyi hai
       if(gameGrid[position[0]] === "X"){
        answer = "X";
       }
       else{
        answer = "O";
       }

       boxes.forEach((box) => {
        box.style.pointerEvents = "none";
        // boxes.classList.remove("win");
       })
       
       boxes[position[0]].classList.add("win");
       boxes[position[1]].classList.add("win");
       boxes[position[2]].classList.add("win");

        }
    });

    if(answer != ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
    }

    // condition to check tie or not
    let fillCount = 0;
    gameGrid.forEach((box) => {
     
      if(box != ""){
        fillCount++;
      }

    })

    if(fillCount === 9){
      gameInfo.innerText = "Game Tied";
    }

}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";

    swapTurn();
    // check if game is over or not
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  })
});

newGameBtn.addEventListener("click", initGame);