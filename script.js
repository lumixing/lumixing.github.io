console.log("successfully loaded a LOT of js!");

let lumix_code = [];
let bounces = 0;

let letters = document.querySelectorAll(".lumix > *");
let profile = document.getElementById("profile");
let bouncy = document.getElementById("bounce");
let bounceCount = document.querySelector(".bounce-count");
let coolButton = document.getElementById("cool");
let flash = document.getElementById("flash");
let lightLink = document.getElementById("light-link");
let version = document.querySelector(".version");

let flashbang_sound = new Audio("./static/sounds/flashbang.mp3");

init();

coolButton.addEventListener("click", () => {
    switch (~~(Math.random() * 2)) {
        case 0:
            let fonts = ["comic sans ms", "arial", "calibri", "cambria", "consolas", "courier pro", "impact", "ink free", "segoe script", "tahoma", "verdana", "webdings", "wingdings"];
            document.querySelector("body").style.fontFamily = fonts[~~(Math.random() * fonts.length)];
            break;
        case 1:
            let r = Math.random() * 256;
            let g = Math.random() * 256;
            let b = Math.random() * 256;
            document.querySelector("body").style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            break
        default:
            break;
    }
});

letters.forEach((l, i) => {
    l.addEventListener("click", () => {
        lumix_code.push(i);
        check_lumix_code();
    });
});

version.addEventListener("click", () => {
    version.textContent = Math.random();
});

function check_lumix_code() {
    console.log(btoa(JSON.stringify(lumix_code)))
    if (btoa(JSON.stringify(lumix_code)) != "WzAsMiw0LDQsMywxLDJd") return; // ;)
    alert("hooray! you found a secret!");
}

function flashbang() {
    flashbang_sound.play();

    flash.style.display = "block";

    setTimeout(() => {
        flash.style.opacity = "0";
        lightLink.setAttribute("rel", "stylesheet");
        document.getElementById("flashbang").remove();
}, 2000);
    setTimeout(() => {
        flash.style.display = "none";
        flash.style.opacity = "1";
    }, 4000);
}

function init() {
    random_profile();
    bounce();
}

function bounce() {
    setInterval(() => {
        bounceEffect()
    }, 500*2);
    setInterval(() => {
        bounceEffect()
    }, 1400*2);
}

function bounceEffect() {
    bounceCount.textContent = ++bounces;
    bouncy.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
}

function random_profile() {
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
    let random_pic = pics[~~(Math.random() * pics.length)];

    profile.setAttribute("src", `./static/profile/${random_pic}`);
    profile.style.borderColor = `hsl(${Math.random() * 360}, 100%, 50%)`
}