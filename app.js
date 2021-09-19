document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid');
  const scoreDisplay = document.querySelector('#score');
  const resultDisplay = document.querySelector('.result');
  const width = 4;
  let squares = [];
  let score = 0;
  //create a playing boards;

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

function play() {
  var audio = new Audio('https://soundcloud.com/marcinprzybylowicz/the-fields-of-ard-skellig');
  audio.play();
}

  //generate a number randomly
  function generate() {
    try {
      changeColor();
      let randomNumber = Math.floor(Math.random() * squares.length);
      if (squares[randomNumber].innerHTML == 0) {
        squares[randomNumber].innerHTML = 2;
        changeColor();
      } else {
        changeColor();
        generate();
      }

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
      changeColor();
      checkForFull();
      if (e.keyCode === 39 || e.keyCode === 68) {
        keyRigth();
      } else if (e.keyCode === 37 || e.keyCode === 65) {
        keyLeft();
      } else if (e.keyCode === 38 || e.keyCode === 87) {
        keyUp();
      } else if (e.keyCode === 40 || e.keyCode === 83) {
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
          resultDisplay.innerHTML = "You won! 🎉 🎉<br> Refresh or Continue";
        }
      }
    }

    function checkForFull() {
      var zero = 0;
      for (let i = 0; i < 4 * 4; i++) {
        if (squares[i].innerHTML == 0) {
            zero++;
        }
      }
      if (zero == 0) {
        var same = 0;
        for (let i = 0; i < 4 * 4; i++) {
          if (checkRigth(i) || checkLeft(i) || checkUp(i) || checkDown(i)) {
            same++;
          }
        }
          if (same == 0) {
            resultDisplay.innerHTML = "You Lost<br>Hit Refresh to start again";
            document.removeEventListener('keyup', control);
        }
      }
    }




    let checkRigth = (pos) => {
      const val = squares[pos].innerHTML;
      if (pos % 4 != 0 && typeof(squares[pos + 1]) != 'undefined' && squares[pos + 1].innerHTML == val ) {
        return true;
      } else {
        return false;
      }
    }
    let checkLeft = (pos) => {
      const val = squares[pos].innerHTML
      if (pos % 4 != 3 && typeof(squares[pos - 1]) != 'undefined' && squares[pos - 1].innerHTML == val) {
        return true;
      } else {
        return false;
      }
    }
    let checkUp = (pos) => {
      const val = squares[pos].innerHTML;
      if (pos > 4 && typeof(squares[pos - 4]) != 'undefined' && squares[pos - 4].innerHTML == val) {
        return true;
      } else {
        return false;
      }
    }
    let checkDown = (pos) => {
      const val = squares[pos].innerHTML;
      if (pos < 12 && typeof(squares[pos + 4]) != 'undefined' && squares[pos + 4].innerHTML == val) {
        return true;
      } else {
        return false;
      }
    }

    let changeColor = () => {
      for (let i = 0; i < width * width; i++) {

        let colors1= ["#f2fbff", "#daf4fe", "#c9effe", "#99e0ff", "#68d2ff", "#37c3ff", "#06b5ff", "#0095d4", "#0072a3", "#005072", "#002d41", "#000b10"];
        let colors2 = ["#F3FBFC", "#D6F5F8", "#C4F0F7", "#B3E9F5", "#A2DFF2", "#8CE0E0", "#7BD8D2", "#6AC2C4", "#5BC0B6", "#4AB8A8", "#3A9E9E", "#2A7E7E", "#1A5E5E", "#0A3E3E", "#002626"];
        let colors = ["#F3FBFC", "#DDF3F5", "#C3EBEF", "#9EDFE5", "#73D3DC", "#70C2DF", "#77ADE6", "#7D99ED", "#7E84F3", "#7E6CFB", "#3A9E9E", "#7254F4", "#6146D9", "#4F38BC", "#3E2DA5"];

        if (squares[i].innerHTML < 256) {
          squares[i].style.color = '#1C005C';
        } else {
            squares[i].style.color = '#FFF';
        }
        if (squares[i].innerHTML == 0)
          squares[i].style.backgroundColor = colors[0];
        else if (squares[i].innerHTML == 2)
          squares[i].style.backgroundColor = colors[1];
        else if (squares[i].innerHTML == 4)
          squares[i].style.backgroundColor = colors[2];
        else if (squares[i].innerHTML == 8)
          squares[i].style.backgroundColor = colors[3];
        else if (squares[i].innerHTML == 16)
          squares[i].style.backgroundColor = colors[4];
        else if (squares[i].innerHTML == 32)
          squares[i].style.backgroundColor = colors[5];
        else if (squares[i].innerHTML == 64) {
          squares[i].style.backgroundColor = colors[6];
        }
        else if (squares[i].innerHTML == 128) {
          squares[i].style.backgroundColor = colors[7];
        }
        else if (squares[i].innerHTML == 256) {
          squares[i].style.backgroundColor = colors[8];
        }
        else if (squares[i].innerHTML == 512) {
          squares[i].style.backgroundColor = colors[9];
        }
        else if (squares[i].innerHTML == 1024){
          squares[i].style.backgroundColor = colors[10];
        }
        else if (squares[i].innerHTML == 2048) {
          squares[i].style.backgroundColor = colors[11];
        }
        else
          changeColor();

      }
    }


  });
