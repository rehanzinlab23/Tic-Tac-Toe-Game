let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('.reset-btn');
let newGameBtn = document.querySelector('.new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turnO = true; // true = Player O (You), false = Computer X

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
          if (turnO && box.innerText === '') {  // ✅ Player O ka move
               box.innerText = 'O';
               box.style.color = 'blue';
               box.disabled = true;
               turnO = false;

               checkWinner();

               if (!msgContainer.classList.contains('hide')) return;

               // ✅ Computer ki turn thoda delay ke sath
               setTimeout(computerMove, 600);
          }
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
     msg.innerHTML = `🎉 Winner is ${winner}!`;
     msgContainer.classList.remove('hide');
     disabledBoxes();
}

const showDraw = () => {
     msg.innerHTML = `Game is a draw 🤝`;
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
                    return true;
               }
          }
     }

     let allFilled = true;
     for (let box of boxes) {
          if (box.innerText === '') {
               allFilled = false;
               break;
          }
     }

     if (allFilled) {
          showDraw();
          return true;
     }
     return false;
};

// ✅ Smart Computer Move
const computerMove = () => {
     if (turnO) return; // agar player ki turn hai toh kuch na kare

     // Step 1: Try to win
     for (let pattern of winPatterns) {
          let [a, b, c] = pattern;
          if (boxes[a].innerText === 'X' && boxes[b].innerText === 'X' && boxes[c].innerText === '') return placeMove(c);
          if (boxes[a].innerText === 'X' && boxes[c].innerText === 'X' && boxes[b].innerText === '') return placeMove(b);
          if (boxes[b].innerText === 'X' && boxes[c].innerText === 'X' && boxes[a].innerText === '') return placeMove(a);
     }

     // Step 2: Block opponent (O)
     for (let pattern of winPatterns) {
          let [a, b, c] = pattern;
          if (boxes[a].innerText === 'O' && boxes[b].innerText === 'O' && boxes[c].innerText === '') return placeMove(c);
          if (boxes[a].innerText === 'O' && boxes[c].innerText === 'O' && boxes[b].innerText === '') return placeMove(b);
          if (boxes[b].innerText === 'O' && boxes[c].innerText === 'O' && boxes[a].innerText === '') return placeMove(a);
     }

     // Step 3: Random move
     let emptyBoxes = [];
     boxes.forEach((box, index) => {
          if (box.innerText === '') emptyBoxes.push(index);
     });

     if (emptyBoxes.length > 0) {
          let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
          placeMove(randomIndex);
     }
};

const placeMove = (index) => {
     let box = boxes[index];
     if (box.innerText !== '') return;

     box.innerText = 'X';
     box.style.color = 'red';
     box.disabled = true;
     turnO = true;

     checkWinner();
};

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);