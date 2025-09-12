let boxes = document.querySelectorAll('.box');

let resetBtn = document.querySelector('.reset-btn');

let newGameBtn = document.querySelector('.new-btn');

let msgContainer = document.querySelector('.msg-container');

let msg = document.querySelector('#msg');

let turnO = true;

const winPatterns = [
     [0, 1, 2],
     [0, 3, 6],
     [0, 4, 8],
     [1, 4, 7],
     [2, 5, 8],
     [2, 4, 6],
     [3, 4, 5],
     [6, 7, 8],
];

const resetGame = () => {
     turnO = true;
     enabledBoxes();
     msgContainer.classList.add('hide');
     msg.innerText = '';
}

boxes.forEach((box) => {
     box.addEventListener('click', () => {
          if (turnO) {  // Player O
               box.innerText = 'O';
               box.style.color = 'blue';
               turnO = false;
          } else { // Player X
               box.innerText = 'X';
               box.style.color = 'red';
               turnO = true;
          }
          box.disabled = true;

          checkWinner();
     });
});

const disabledBoxes = () => {
     for (let box of boxes) {
          box.disabled = true;
     }
}

const enabledBoxes = () => {
     for (let box of boxes) {
          box.disabled = false;
          box.innerText = '';
          box.style.color = '';
     }
}

const showWinner = (winner) => {
     msg.innerHTML = `Congratulations, Winner is ${winner} ❤️ — better luck to the other! 🥲`;
     msgContainer.classList.remove('hide');
     disabledBoxes();
}

const showDraw = () => {
     msg.innerHTML = `Game is a draw — No winner this time. 🤝`;
     msgContainer.classList.remove('hide');
     disabledBoxes();
}

const checkWinner = () => {
     for (let pattern of winPatterns) {
          let pos1Val = boxes[pattern[0]].innerText;
          let pos2Val = boxes[pattern[1]].innerText;
          let pos3Val = boxes[pattern[2]].innerText;

          if (pos1Val !== '' && pos2Val !== '' && pos3Val !== '') {
               if (pos1Val === pos2Val && pos2Val === pos3Val) {
                    showWinner(pos1Val);
                    return; 
               }
          }
     };

     let allFilled = true;
     for (let box of boxes) {
          if (box.innerText === '') {
               allFilled = false;
               break;
          }
     }

     if (allFilled) {
          showDraw();
     }
};

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);