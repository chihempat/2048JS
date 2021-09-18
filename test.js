  let testArray = [0, 1, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];


    function checkForFull() {
      let zero = 0;
      console.log("===>same1",zero)
      for (let i = 0; i < 4 * 4; i++) {
              console.log("===>same2",zero)
        if (testArray[i] == 0) {
            zero++;
        }
      }
      if (zero == 0) {
        console.log("it is full");
      } else {
          let same = 0;
        for (let i = 0; i < 4 * 4; i++) {
          if (checkRigth(i) || checkLeft(i) || checkUp(i) || checkDown(i)) {
            same++;
          }
        }
          if (same == 0) {
            console.log("Stop");
            //resultDisplay.innerHTML = "You Lose";
        }
      }
    }


    let checkRigth = (pos) => {
      const val = testArray[pos];
      if (pos % 4 != 0 && testArray[pos + 1] == val ) {
        return true;
      } else {
        return false;
      }
    }
    let checkLeft = (pos) => {
      const val = testArray[pos]
      if (pos % 4 != 3 && testArray[pos - 1] == val) {
        return true;
      } else {
        return false;
      }
    }
    let checkUp = (pos) => {
      const val = testArray[pos];
      if (pos > 4 && testArray[(pos - 4)] == val) {
        return true;
      } else {
        return false;
      }
    }
    let checkDown = (pos) => {
      const val = testArray[pos];
      if (pos < 12 && testArray[(pos + 4)] == val) {
        return true;
      } else {
        return false;
      }
    }


checkForFull();