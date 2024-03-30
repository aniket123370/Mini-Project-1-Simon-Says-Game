let gameSeq = [];
let userSeq = [];

let Started = false;
let Level = 0;
let highestScore = 0; // Initialize highest score

let h2 = document.querySelector("h2");
let highestScoreDisplay = document.querySelector("#highestScore"); // Reference to display element

document.addEventListener("keypress", function () {
    if (Started === false) {
        console.log("game will started");
        Started = true;
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userByFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

let randomNum = ["one", "two", "three", "four"];
function levelUp() {
    userSeq = [];
    Level++;
    h2.innerHTML = `Level ${Level}`;

    let randomIdx = Math.floor(Math.random() * 3);
    let randomNumber = randomNum[randomIdx];

    gameSeq.push(randomNumber);
    console.log(gameSeq.length);
    console.log(gameSeq);

    let btn = document.querySelector(`.${randomNumber}`);
    btnFlash(btn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (Level > highestScore) {
            highestScore = Level; // Update highest score if current level is higher
            highestScoreDisplay.innerHTML = highestScore; // Update display
        }
        h2.innerHTML = `Game Over ! Your Score was <b>${Level}</b> <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnWasPressed() {
    let btn = this;
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
    userByFlash(btn);
}

let allBtn = document.querySelectorAll(".btn");
for (pressBtn of allBtn) {
    pressBtn.addEventListener("click", btnWasPressed);
}

function reset() {
    gameSeq = [];
    userSeq = [];
    Started = false;
    Level = 0;
}
