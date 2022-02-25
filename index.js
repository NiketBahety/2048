let grid_num = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

let old_grid;
let score = 0;

function getPoints(grid) {
  let array = [];
  for (let i = 0; i < 4; i++) {
    let a = [];
    for (let j = 0; j < 4; j++) {
      let arr = [];
      if (grid[i][j] != 0) {
        arr.push(i);
        arr.push(j);
        arr.push(grid[i][j]);
        a.push(arr);
      }
    }
    array.push(a);
  }
  return array;
}

function transpose(mat) {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < i; j++) {
      const tmp = mat[i][j];
      mat[i][j] = mat[j][i];
      mat[j][i] = tmp;
    }
  }
  return mat;
}

function resizeArray(arr1, arr2) {
  console.table(arr1);
  console.table(arr2);

  let x = [];
  for (let i = 0; i < 4; i++) {
    if (arr1[i].length != 0) {
      if (arr1[i].length === arr2[i].length) console.log(true);
      else {
        console.log(false);
        for (let k = 0; k < arr1[i].length - 1; k++) {
          if (arr1[i][k][2] === arr1[i][k + 1][2]) {
            arr2[i].splice(k, 0, arr2[i][k]);
            k++;
          }
        }
        console.log("arr1", arr1[i]);
        console.log("arr2", arr2[i]);
      }
      for (let j = 0; j < arr1[i].length; j++) {
        let y = 0;
        y = Math.abs(arr1[i][j][1] - arr2[i][j][1]) * 124;
        if (y != 0) y = y * -1;
        y = y + "%";
        x.push(y);
      }
    }
  }
  console.log(x);
  return x;
}

function resizeArrayNew(arr1, arr2) {
  let arr3 = [],
    arr4 = [];

  for (let k = 0; k < 4; k++) {
    let arr = [];
    for (let i = 0; i < 4; i++) {
      if (arr1[i].length != 0) {
        for (let j = 0; j < arr1[i].length; j++) {
          if (arr1[i][j][1] == k) {
            arr.push(arr1[i][j]);
          }
        }
      }
    }
    arr3.push(arr);
  }
  for (let k = 0; k < 4; k++) {
    let arr = [];
    for (let i = 0; i < 4; i++) {
      if (arr2[i].length != 0) {
        for (let j = 0; j < arr2[i].length; j++) {
          if (arr2[i][j][1] == k) {
            arr.push(arr2[i][j]);
          }
        }
      }
    }
    arr4.push(arr);
  }

  ///////////
  let x = [];
  for (let i = 0; i < 4; i++) {
    if (arr3[i].length != 0) {
      if (arr3[i].length === arr4[i].length) console.log(true);
      else {
        console.log(false);
        for (let k = 0; k < arr3[i].length - 1; k++) {
          if (arr3[i][k][2] === arr3[i][k + 1][2]) {
            arr4[i].splice(k, 0, arr4[i][k]);
            k++;
          }
        }
        console.log("arr3", arr3[i]);
        console.log("arr4", arr4[i]);
      }
      for (let j = 0; j < arr3[i].length; j++) {
        let y = 0;
        y = Math.abs(arr3[i][j][0] - arr4[i][j][0]) * 124;
        if (y != 0) y = y * -1;
        y = y + "%";
        x.push(y);
      }
    }
  }
  console.log(x);
  return x;
  ///////////
}

function applyTransitionLeft(x, old) {
  console.log("old", old);
  console.log(x);
  let count = 0;
  let cells = document.getElementsByClassName("number");
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let cell = cells[count];
      if (old[i][j] != 0) {
        console.log(cell);
        console.log(`translateX(${x[count]})`);
        cell.style.transform = `translateX(${x[count]})`;
        count++;
      }
    }
  }
  setTimeout(function () {
    addRandom();
    createGrid();
  }, 200);
}

function applyTransitionRight(x, old) {
  console.log(old);
  console.log(x);
  let count = 0;
  let cells = document.getElementsByClassName("number");
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let cell = cells[count];
      if (old[i][j] != 0) {
        console.log(cell);
        let a = x[count].split("%")[0] * -1 + "%";
        console.log(a);
        console.log(`translateX(${a})`);
        cell.style.transform = `translateX(${a})`;
        count++;
      }
    }
  }
  setTimeout(function () {
    addRandom();
    createGrid();
  }, 200);
}

function applyTransitionUp(x, old) {
  console.log("old", old);

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < i; j++) {
      let tmp = old[i][j];
      old[i][j] = old[j][i];
      old[j][i] = tmp;
    }
  }

  console.log("old transpose", old);
  let count = 0;
  let cells = document.getElementsByClassName("cell");
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let cell = cells[4 * j + i];
      if (old[i][j] != 0) {
        console.log(cell);
        console.log(`translateY(${x[count]})`);
        cell.childNodes[0].style.transform = `translateY(${x[count]})`;
        count++;
      }
    }
  }
  setTimeout(function () {
    addRandom();
    createGrid();
  }, 200);
}

function applyTransitionDown(x, old) {
  console.log("old", old);

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < i; j++) {
      let tmp = old[i][j];
      old[i][j] = old[j][i];
      old[j][i] = tmp;
    }
  }

  console.log("old transpose", old);
  let count = 0;
  let cells = document.getElementsByClassName("cell");
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let cell = cells[4 * j + i];
      if (old[i][j] != 0) {
        console.log(cell);
        let a = x[count].split("%")[0] * -1 + "%";
        console.log(a);
        console.log(`translateY(${a})`);
        cell.childNodes[0].style.transform = `translateY(${a})`;
        count++;
      }
    }
  }
  setTimeout(function () {
    addRandom();
    createGrid();
  }, 200);
}

function applyFontSize(el, val) {
  let size = new Map([
    [2, [70, "#ff7dc9"]],
    [4, [70, "#ff47b2"]],
    [8, [70, "#ff24a4"]],
    [16, [60, "#c7187e"]],
    [32, [60, "#b0156f"]],
    [64, [60, "#961261"]],
    [128, [50, "#730041"]],
    [256, [50, "#450127"]],
    [512, [50, "#45011a"]],
    [1024, [40, "#450133"]],
    [2048, [40, "#240023"]],
  ]);
  el.style.fontSize = size.get(val)[0] + "px";
  el.style.background = size.get(val)[1];
}

function createElement(val) {
  let el = document.createElement("div");
  el.classList.add("number");
  el.innerText = val;
  applyFontSize(el, val);
  return el;
}

function createRandom() {
  let x = Math.random();
  let val = x > 0.1 ? 2 : 4;
  return val;
}

function addRandom() {
  let arr = getEmpty();
  let a, b;
  if (Object.keys(arr).length != 0) {
    let x = Math.floor(Math.random() * Object.keys(arr).length);
    if (x > 15) {
      addRandom();
    } else {
      a = arr[x][0];
      b = arr[x][1];
      grid_num[a][b] = createRandom();
    }
  }
}

function createGrid() {
  let els = document.getElementsByClassName("cell");
  for (let i = 0; i < grid_num.length; i++) {
    for (let j = 0; j < grid_num.length; j++) {
      if (grid_num[i][j] != 0) {
        els[4 * i + j].innerHTML = "";
        els[4 * i + j].append(createElement(grid_num[i][j]));
      } else els[4 * i + j].innerHTML = "";
    }
  }
}

function getEmpty() {
  let arr = [];
  for (let i = 0; i < 4; i++) {
    let a = [];
    for (let j = 0; j < 4; j++) {
      if (grid_num[i][j] === 0) {
        a.push(i);
        a.push(j);
        arr.push(a);
        a = [];
      }
    }
  }
  return arr;
}

addRandom();
addRandom();

createGrid();

function gameWon() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid_num[i][j] === 2048) {
        return true;
      }
    }
  }
  return false;
}

function gameLost() {
  let count = 0;
  let arr = getEmpty();
  if (Object.keys(arr).length === 0) {
    for (let i = 1; i < 3; i++) {
      for (let j = 1; j < 3; j++) {
        if (
          grid_num[i][j] === grid_num[i - 1][j] ||
          grid_num[i][j] === grid_num[i + 1][j] ||
          grid_num[i][j] === grid_num[i][j - 1] ||
          grid_num[i][j] === grid_num[i][j + 1]
        ) {
          count++;
          break;
        }
      }
    }
    if (count === 0) return true;
  }
  return false;
}

function leftMove(e) {
  old_grid = grid_num.slice(0);
  let arr = getPoints(old_grid);
  let zero = [];
  let one = [];
  for (let i = 0; i < 4; i++) {
    let a = [];
    let b = [];
    for (let j = 0; j < 4; j++) {
      if (grid_num[i][j] === 0) a.push(0);
      else b.push(grid_num[i][j]);
    }
    zero.push(a);
    one.push(b);
  }
  for (let i = 0; i < one.length; i++) {
    if (
      one[i].length === 4 &&
      one[i][0] === one[i][1] &&
      one[i][1] === one[i][2] &&
      one[i][2] === one[i][3]
    ) {
      one[i][0] = one[i][0] * 2;
      one[i][1] = one[i][0];
      one[i][2] = 0;
      one[i][3] = 0;
      score = score + one[i][0] * 2;
    } else {
      for (let j = 0; j < one[i].length - 1; j++) {
        if (one[i][j] === one[i][j + 1]) {
          one[i][j] = one[i][j + 1] * 2;
          score = score + one[i][j];
          one[i][j + 1] = 0;
        } else if (one[i][j] === 0) {
          one[i][j] = one[i][j + 1];
          one[i][j + 1] = 0;
        }
      }
    }
  }

  for (let i = 0; i < 4; i++) {
    grid_num[i] = one[i].concat(zero[i]);
  }

  let new_arr = getPoints(grid_num);

  let x = resizeArray(arr, new_arr);
  console.log(x);
  applyTransitionLeft(x, old_grid);

  // addRandom();
  // createGrid();
  document.getElementsByClassName("score")[0].innerHTML = score;
}

function rightMove(e) {
  old_grid = grid_num.slice(0);
  let old_old_grid = grid_num.slice(0);
  let arr = getPoints(old_grid);
  let zero = [];
  let one = [];
  for (let i = 0; i < 4; i++) {
    let a = [];
    let b = [];
    for (let j = 0; j < 4; j++) {
      if (grid_num[i][j] === 0) a.push(0);
      else b.push(grid_num[i][j]);
    }
    zero.push(a);
    one.push(b);
  }
  for (let i = 0; i < 4; i++) {
    if (
      one[i].length === 4 &&
      one[i][0] === one[i][1] &&
      one[i][1] === one[i][2] &&
      one[i][2] === one[i][3]
    ) {
      one[i][3] = one[i][0] * 2;
      one[i][2] = one[i][3];
      one[i][1] = 0;
      one[i][0] = 0;
      score = score + one[i][3] * 2;
    } else {
      for (let j = one[i].length - 1; j >= 1; j--) {
        if (one[i][j] === one[i][j - 1]) {
          one[i][j] = one[i][j - 1] * 2;
          one[i][j - 1] = 0;
          score = score + one[i][j];
        } else if (one[i][j] === 0) {
          one[i][j] = one[i][j - 1];
          one[i][j - 1] = 0;
        }
      }
    }
  }
  for (let i = 0; i < 4; i++) {
    grid_num[i] = zero[i].concat(one[i]);
  }

  let new_arr = getPoints(grid_num);

  let x = resizeArray(arr, new_arr);
  console.log(x);
  applyTransitionRight(x, old_old_grid);

  // addRandom();
  // createGrid();
  document.getElementsByClassName("score")[0].innerHTML = score;
}

function upMove(e) {
  old_grid = grid_num.slice(0);
  let old_old_grid = [];
  for (let a = 0; a < 4; a++) {
    let arr = [];
    for (let b = 0; b < 4; b++) {
      arr.push(grid_num[a][b]);
    }
    old_old_grid.push(arr);
  }
  console.log(old_grid);
  let arr = getPoints(old_grid);
  let zero = [];
  let one = [];
  for (let i = 0; i < 4; i++) {
    let a = [];
    let b = [];
    for (let j = 0; j < 4; j++) {
      if (grid_num[j][i] === 0) a.push(0);
      else b.push(grid_num[j][i]);
    }
    zero.push(a);
    one.push(b);
  }

  for (let i = 0; i < 4; i++) {
    if (
      one[i].length === 4 &&
      one[i][0] === one[i][1] &&
      one[i][1] === one[i][2] &&
      one[i][2] === one[i][3]
    ) {
      one[i][0] = one[i][0] * 2;
      one[i][1] = one[i][0];
      one[i][2] = 0;
      one[i][3] = 0;
      score = score + one[i][0] * 2;
    } else {
      for (let j = 0; j < one[i].length - 1; j++) {
        if (one[i][j] === one[i][j + 1]) {
          one[i][j] = one[i][j + 1] * 2;
          score = score + one[i][j];
          one[i][j + 1] = 0;
        } else if (one[i][j] === 0) {
          one[i][j] = one[i][j + 1];
          one[i][j + 1] = 0;
        }
      }
    }
  }
  let final = [];
  for (let i = 0; i < 4; i++) {
    final.push(one[i].concat(zero[i]));
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      grid_num[j][i] = final[i][j];
    }
  }

  let new_arr = getPoints(grid_num);
  let x = resizeArrayNew(arr, new_arr);
  applyTransitionUp(x, old_old_grid);

  // addRandom();
  // createGrid();
  document.getElementsByClassName("score")[0].innerHTML = score;
}

function downMove(e) {
  old_grid = grid_num.slice(0);
  let old_old_grid = [];
  for (let a = 0; a < 4; a++) {
    let arr = [];
    for (let b = 0; b < 4; b++) {
      arr.push(grid_num[a][b]);
    }
    old_old_grid.push(arr);
  }
  console.log(old_grid);
  let arr = getPoints(old_grid);
  let zero = [];
  let one = [];
  for (let i = 0; i < 4; i++) {
    let a = [];
    let b = [];
    for (let j = 0; j < 4; j++) {
      if (grid_num[j][i] === 0) a.push(0);
      else b.push(grid_num[j][i]);
    }
    zero.push(a);
    one.push(b);
  }
  for (let i = 0; i < 4; i++) {
    if (
      one[i].length === 4 &&
      one[i][0] === one[i][1] &&
      one[i][1] === one[i][2] &&
      one[i][2] === one[i][3]
    ) {
      one[i][3] = one[i][0] * 2;
      one[i][2] = one[i][3];
      one[i][1] = 0;
      one[i][0] = 0;
      score = score + one[i][3] * 2;
    } else {
      for (let j = one[i].length - 1; j >= 1; j--) {
        if (one[i][j] === one[i][j - 1]) {
          one[i][j] = one[i][j - 1] * 2;
          one[i][j - 1] = 0;
          score = score + one[i][j];
        } else if (one[i][j] === 0) {
          one[i][j] = one[i][j - 1];
          one[i][j - 1] = 0;
        }
      }
    }
  }
  let final = [];
  for (let i = 0; i < 4; i++) {
    final.push(zero[i].concat(one[i]));
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      grid_num[j][i] = final[i][j];
    }
  }

  let new_arr = getPoints(grid_num);
  let x = resizeArrayNew(arr, new_arr);
  applyTransitionDown(x, old_old_grid);

  // addRandom();
  // createGrid();
  document.getElementsByClassName("score")[0].innerHTML = score;
}

document.addEventListener("keyup", function (e) {
  if (!gameLost() && !gameWon()) {
    if (e.keyCode === 37) leftMove(e);
    else if (e.keyCode === 39) rightMove(e);
    else if (e.keyCode === 38) upMove(e);
    else if (e.keyCode === 40) downMove(e);
    if (gameWon()) {
      setTimeout(function () {
        document.getElementsByClassName("victory")[0].style.display = "flex";
      }, 200);
    }
    if (gameLost()) {
      document.getElementsByClassName("victory")[0].style.display = "flex";
      document.getElementsByClassName(
        "victory"
      )[0].innerHTML = `YOU LOST<br>YOUR SCORE: ${score}`;
    }
  }
});
