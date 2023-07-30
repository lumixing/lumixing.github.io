let start = document.getElementById("start");
let apps = document.querySelector(".apps");
let clock = document.getElementById("clock");

updateClock();
setInterval(updateClock, 500);

function updateClock() {
    let date = new Date();
    clock.innerText = date.toLocaleTimeString();
}

function addTaskbarApp(id, name) {
    let appDiv = document.createElement("div");
    appDiv.classList.add("app");
    appDiv.dataset.id = id;
    appDiv.innerText = name;
    appDiv.onclick = focusApp;
    apps.append(appDiv);
}

function removeTaskbarApp(id) {
    document.querySelector(`.app[data-id="${id}"]`).remove();
}

function focusApp(e) {
    let id = e.target.dataset.id;
    let window = document.querySelector(`.window[data-id="${id}"]`);

    window.style.zIndex = ++zIndex;

    if (window.style.display == "none") { // focus
        window.style.display = "block";
        window.style.animation = "windowMinimize .2s ease reverse forwards";
        
        setTimeout(() => {
            window.style.animation = "none";
        }, 200);
    } else { // minimize
        window.style.animation = "windowMinimize .2s ease forwards";
        
        setTimeout(() => {
            window.style.display = "none";
            window.style.animation = "none";
        }, 200);
    }
}

function openStart() {
    if (start.style.display == "block") return closeStart();

    start.style.animation = "startOpen .1s ease";
    start.style.display = "block";

    setTimeout(() => {
        start.style.animation = "none";    
    }, 100);
}

function closeStart() {
    start.style.animation = "startOpen .1s ease reverse forwards";

    setTimeout(() => {
        start.style.display = "none";
        start.style.animation = "none";    
    }, 100);
}