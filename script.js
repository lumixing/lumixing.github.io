console.log("successfully loaded a lot of js!");

let lumixCode = [];
let bounceCount = 0;
let bounceLastPos = [0, 0];

let flashbangSound = new Audio("./static/sounds/flashbang.mp3");

randomProfilePicture();
bounce();

query(".lumix > *", true).forEach((l, i) => {
    l.addEventListener("click", () => {
        lumixCode.push(i);
        if (btoa(JSON.stringify(lumixCode)) != "WzAsMiw0LDQsMywxLDJd") return;
        alert("hooray! you found a secret!");
    });
});

function randomVersion(e) {
    e.textContent = Math.random();
}

function randomEffect() {
    switch (~~(Math.random() * 2)) {
        case 0: // random font
            let fonts = ["comic sans ms", "arial", "calibri", "cambria", "consolas", "courier pro", "impact", "ink free", "segoe script", "tahoma", "verdana", "webdings", "wingdings"];
            document.querySelector("body").style.fontFamily = fonts[~~(Math.random() * fonts.length)];
            break;
        case 1: // random body background-color
            let r = Math.random() * 256;
            let g = Math.random() * 256;
            let b = Math.random() * 256;
            document.querySelector("body").style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            break
        default:
            break;
    }
}

function randomProfilePicture() {
    let pics = [
        "normal.png",
        "pixelated.png",
        "upsidedown.png",
        "washed.png",
        "contentaware.gif",
        "cube.gif",
        "explosion.gif",
        "glitch.gif",
        "hue.gif",
        "human.gif",
        "slices.gif",
        "snake.gif",
        "veryglitch.gif",
    ];
    let randomPic = pics[~~(Math.random() * pics.length)];

    profile.setAttribute("src", `./static/profile/${randomPic}`);
    profile.style.borderColor = `hsl(${Math.random() * 360}, 100%, 50%)`
}

// insane physics engine
function bounce() {
    let bouncy = document.getElementById("bounce");
    let bounceBox = document.getElementById("bounce-box");
    let bounceCounter = query(".bounce-count");

    setInterval(() => {
        let x = ~~(bouncy.getBoundingClientRect().left - bounceBox.getBoundingClientRect().left);
        let y = ~~(bouncy.getBoundingClientRect().top - bounceBox.getBoundingClientRect().top);

        // TOP COLLISIONS
        if (y <= 8 && !bounceLastPos[0]) {
            bounceLastPos[0] = true;
            bounceCounter.textContent = ++bounceCount;
        }
        if (y > 8 && bounceLastPos[0]) {
            bounceLastPos[0] = false;
        }

        // RIGHT COLLISIONS
        if (x <= 233-8 && !bounceLastPos[1]) {
            bounceLastPos[1] = true;
            bounceCounter.textContent = ++bounceCount;
        }
        if (x > 233-8 && bounceLastPos[1]) {
            bounceLastPos[1] = false;
        }

        // BOTTOM COLLISIONS
        if (y <= 84-8 && !bounceLastPos[2]) {
            bounceLastPos[2] = true;
            bounceCounter.textContent = ++bounceCount;
        }
        if (y > 84-8 && bounceLastPos[2]) {
            bounceLastPos[2] = false;
        }

        // LEFT COLLISIONS
        if (x <= 8 && !bounceLastPos[3]) {
            bounceLastPos[3] = true;
            bounceCounter.textContent = ++bounceCount;
        }
        if (x > 8 && bounceLastPos[3]) {
            bounceLastPos[3] = false;
        }
    }, 100);
}

function flashbang() {
    flashbangSound.play();

    let flash = query("#flash");

    flash.style.display = "block";
    query("#light-link").setAttribute("rel", "stylesheet");

    setTimeout(() => {
        flash.style.opacity = "0";
        query("#flashbang").remove();
    }, 2000);
    setTimeout(() => {
        flash.style.display = "none";
        flash.style.opacity = "1";
    }, 4000);
}

function query(query, all = false) {
    if (all) { return document.querySelectorAll(query); }
    return document.querySelector(query);
}