// Select all required elements

const selectBox = document.querySelector('.select-box'),
    selectXbtn = document.querySelector('.playerX'),
    selectYbtn = document.querySelector('.playerY'),
    playboard = document.querySelector('.play-board'),
    allBox = document.querySelectorAll("section span"),
    players = document.querySelector(".players"),
    result = document.querySelector(".result-box");

window.onload = () => // Once window loaded
{
    for (let index = 0; index < allBox.length; index++) {
        allBox[index].setAttribute("onclick", "clickedBox(this)");
    }

    selectXbtn.onclick = () => {
        selectBox.classList.add("hide");
        playboard.classList.add("show");
    }
    selectYbtn.onclick = () => {
        selectBox.classList.add("hide");
        playboard.classList.add("show");
        players.setAttribute("class", "players active player");
    }
}

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";
let main = "x";

function clickedBox(element) {
    console.log(element);
    if (players.classList.contains("player")) {
        element.innerHTML = `<i class = "${playerOIcon}"></i>`;
        players.classList.remove("active");
        playerSign = "O";
        main = "O";
    } else {
        element.innerHTML = `<i class = "${playerXIcon}"></i>`
        players.classList.add("active");
        playerSign = "X";
        main = "X";
    }
    playboard.style.pointerEvents = "none";
    element.setAttribute("id",playerSign);
    element.style.pointerEvents = "none";
    if(winner())
    {
        clearTimeout(stop);
    }
    let stop = setTimeout(bot,1000);
}

function bot() {
    let a = [];
    for (let i = 0; i < allBox.length; i++) {
        if (allBox[i].childElementCount == 0) {
            a.push(i);
        }
    }
    let rnd = a[Math.floor(Math.random() * (a.length))];
    if (a.length > 0) {
        if (players.classList.contains("player")) {
            allBox[rnd].innerHTML = `<i class = "${playerXIcon}"></i>`;
            players.classList.add("active");
            playerSign = "X";
        } else {
            allBox[rnd].innerHTML = `<i class = "${playerOIcon}"></i>`
            players.classList.remove("active");
            playerSign = "O";
        }
        allBox[rnd].setAttribute("id",playerSign);
    }else
    {
        document.querySelector(".won-text").innerHTML = `<span>Ohh No ...!</span>  <span>Game Draw.</span>`;
        playboard.classList.remove("show");
        result.classList.add("show");
    }
    allBox[rnd].style.pointerEvents = "none";
    playboard.style.pointerEvents = "auto";
    if(winner())
    {
        clearTimeout(stop);
    }
}

// Decide Winner

function getValue(idno)
{
    return document.querySelector(".box"+idno).id;
}

function check(b1,b2,b3,val)
{
    if(getValue(b1) == val && getValue(b2) == val && getValue(b3) == val)
    {
        return true;
    }
}

function winner()
{
    if(check(1,2,3,main) || check(4,5,6,main) || check(7,8,9,main) || check(1,4,7,main) || check(2,5,8,main) || check(3,6,9,main) || check(1,5,9,main) || check(3,5,7,main))
    {
        document.querySelector(".won-text").innerHTML = `<span>Congratulations ...!</span>  <span>You won the game.</span>`;
        playboard.classList.remove("show");
        result.classList.add("show");

        return true;
    }
    let p2;
    if(main == "X")
    {
        p2 = "O";
    }else
    {
        p2 = "X";
    }
    if(check(1,2,3,p2) || check(4,5,6,p2) || check(7,8,9,p2) || check(1,4,7,p2) || check(2,5,8,p2) || check(3,6,9,p2) || check(1,5,9,p2) || check(3,5,7,p2))
    {
        document.querySelector(".won-text").innerHTML = `<span>Jarvis won the game...!</span>  <span>Better Luck next time.</span>`;
        playboard.classList.remove("show");
        result.classList.add("show");

        return true;
    }
    return false;
}

// Replay

const replay = document.querySelector(".btnr");

replay.onclick = () =>
{
    result.classList.remove("show");
    selectBox.classList.remove("hide");
    location.reload();
}
