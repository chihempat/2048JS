document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid');
  const scoreDisplay = document.querySelector('#score');
  const resultDisplay = document.querySelector('#result');
  const width = 4;
  let squares = [];
  let score = 0;
  //create a playing board;

  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      let square = document.createElement('div');
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generate();
    generate();
  }

  createBoard();



  //generate a number randomly
  function generate() {
    try {
        changeColor();
      randomNumber = Math.floor(Math.random() * squares.length);
      if (squares[randomNumber].innerHTML == 0) {
        squares[randomNumber].innerHTML = 2;
        changeColor();
      } else {
        generate();
        changeColor();
      }
      //checkForFull();
    } catch (e) {
      if (e instanceof RangeError) {
        //resultDisplay.innerHTML = "You lose!";
        //document.removeEventListener('keyup', control);
      }
    }
  }

  //swipe right
  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];


        let filteredRow = row.filter(num => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = zeros.concat(filteredRow);
        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
        check = 0;
      }

    }
  }
  // swap left
  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];


        let filteredRow = row.filter(num => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = filteredRow.concat(zeros);
        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

    //swipe down
    function moveDown() {
      for (let i = 0; i < 4; i++) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + width].innerHTML;
        let totalThree = squares[i + width * 2].innerHTML;
        let totalFour = squares[i + width * 3].innerHTML;
        let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

        let filteredColumn = column.filter(num => num);
        let missing = 4 - filteredColumn.length;
        let zeros = Array(missing).fill(0);
        let newColumn = zeros.concat(filteredColumn);
        squares[i].innerHTML = newColumn[0];
        squares[i + width].innerHTML = newColumn[1];
        squares[i + width * 2].innerHTML = newColumn[2];
        squares[i + width * 3].innerHTML = newColumn[3];
      }
    }

    //swipe up
    function moveUp() {
      for (let i = 0; i < 4; i++) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + width].innerHTML;
        let totalThree = squares[i + width * 2].innerHTML;
        let totalFour = squares[i + width * 3].innerHTML;
        let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

        let filteredColumn = column.filter(num => num);
        let missing = 4 - filteredColumn.length;
        let zeros = Array(missing).fill(0);
        let newColumn = filteredColumn.concat(zeros);
        squares[i].innerHTML = newColumn[0];
        squares[i + width].innerHTML = newColumn[1];
        squares[i + width * 2].innerHTML = newColumn[2];
        squares[i + width * 3].innerHTML = newColumn[3];
      }
    }

    function combineRow() {
      for (let i = 0; i < 15; i++) {
        if (squares[i].innerHTML === squares[i + 1].innerHTML) {
          let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
          squares[i].innerHTML = combinedTotal;
          squares[i + 1].innerHTML = 0;
          score += combinedTotal;
          scoreDisplay.innerHTML = score;
        }
      }
      checkForWin();
    }

    function combineColumn() {
      for (let i = 0; i < 12; i++) {
        if (squares[i].innerHTML === squares[i + width].innerHTML) {
          let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
          squares[i].innerHTML = combinedTotal;
          squares[i + width].innerHTML = 0;
          score += combinedTotal;
          scoreDisplay.innerHTML = score;
        }
      }
      checkForWin();

    }

    //assign keycodes
  function control(e) {
      if (e.keyCode === 39) {
        keyRigth();
      } else if (e.keyCode === 37) {
        keyLeft();
      } else if (e.keyCode === 38) {
        keyUp();
      } else if (e.keyCode === 40) {
        keyDown();
      }

    }
    document.addEventListener('keyup', control);
    function keyRigth(e) {
      moveRight();
      combineRow();
      moveRight();
      generate();
    }
    function keyLeft(e) {
      moveLeft();
      combineRow();
      moveLeft();
      generate();
    }
    function keyDown(e) {
      moveDown();
      combineColumn();
      moveDown();
      generate();
    }
    function keyUp(e) {
      moveUp();
      combineColumn();
      moveUp();
      generate();
    }

    //check for 2048
    function checkForWin() {
      for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML == 2048) {
          resultDisplay.innerHTML = "You win!";
          document.addEventListener('keyup', control);
        }
      }
    }

    //check for loses
    // function checkForFull() {
    //   let zero = 0;
    //   console.log("===>same1",same)
    //   for (let i = 0; i < 4 * 4; i++) {
    //           console.log("===>same2",same)
    //     if (squares[i].innerHTML == 0) {
    //         zero++;
    //     }
    //   }
    //   if (zero == 0) {
    //     console.log("it is full");
    //   } else {
    //       let same = 0;
    //     for (let i = 0; i < 4 * 4; i++) {
    //       if (checkRigth(i) || checkLeft(i) || checkUp(i) || checkDown(i)) {
    //         same++;
    //       }
    //     }
    //       if (same == 0) {
    //         console.log("Stop");
    //         resultDisplay.innerHTML = "You Lose";
    //     }
    //   }
    // }




    let checkRigth = (pos) => {
      const val = squares[pos].innerHTM;
      if (pos % 4 != 0 && squares[pos + 1].innerHTML == val ) {
        return true;
      } else {
        return false;
      }
    }
    let checkLeft = (pos) => {
      const val = squares[pos].innerHTM;
      if (pos % 4 != 3 && squares[pos - 1].innerHTML == val) {
        return true;
      } else {
        return false;
      }
    }
    let checkUp = (pos) => {
      const val = squares[pos].innerHTM;
      if (pos > 4 && squares[(pos - 4)].innerHTML == val) {
        return true;
      } else {
        return false;
      }
    }
    let checkDown = (pos) => {
      const val = squares[pos].innerHTM;
      if (pos < 12 && squares[(pos + 4)].innerHTML == val) {
        return true;
      } else {
        return false;
      }
    }

    let changeColor = () => {
      for (let i = 0; i < width * width; i++) {
        if (squares[i].innerHTML == 0)
          squares[i].style.backgroundColor = '#F3FBFC';
        else if (squares[i].innerHTML == 2)
          squares[i].style.backgroundColor = '#DDF3F5';
        else if (squares[i].innerHTML == 4)
          squares[i].style.backgroundColor = '#C3EBEF';
        else if (squares[i].innerHTML == 8)
          squares[i].style.backgroundColor = '#9EDFE5';
        else if (squares[i].innerHTML == 16)
          squares[i].style.backgroundColor = '#73D3DC';
        else if (squares[i].innerHTML == 32)
          squares[i].style.backgroundColor = '#77ADE6';
        else if (squares[i].innerHTML == 64)
          squares[i].style.backgroundColor = '#7D99ED';
        else if (squares[i].innerHTML == 128)
          squares[i].style.backgroundColor = '#7E84F3';
        else if (squares[i].innerHTML == 256)
          squares[i].style.backgroundColor = '#7254F4';
        else if (squares[i].innerHTML == 512)
          squares[i].style.backgroundColor = '#6146D9';
        else if (squares[i].innerHTML == 1024)
          squares[i].style.backgroundColor = '#4F38BC';
        else if (squares[i].innerHTML == 2048)
          squares[i].style.backgroundColor = '#3E2DA5';
        else
          changeColor();

      }
    }


  });
