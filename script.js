console.log("lumOS is ready!");

let x, y = 0;
let selectedWindow; // DOM .window element
let zIndex = 100;

createWindow("secret O_O", "you actually moved the window! nice :D", [300, 400])
createWindow("welcome B)", /*html*/`
<div class="height flex column center gap16">
    <div class="flex column center">
        <p>ayo wassup welcome to my site</p>
        <p><i>(still in progress)</i></p>
        <p>im a window! move me around by dragging the top</p>
    </div>
    <div class="flex column center gap4">
        <p>also check out my projects</p>
        <div>
            <button onmousedown="astatineWindow()">astatine</button>
            <a href="https://lumix.lol/image2cape/"><button>image2cape</button></a>
            <a href="https://github.com/lumixing/mfbot"><button>mfbot</button></a>
        </div>
        <p>i have a LOT more, will publicize sometime&trade;</p>
    </div>
    <div class="flex column center gap4">
        <p>and my socials</p>
        <div>
            <a href="https://github.com/lumixing/"><button>github</button></a>
            <a href="https://twitter.com/lumixing/"><button>twitter</button></a>
            <button onmousedown="discordWindow()">discord</button>
        </div>
    </div>
</div>
`, [300, "center"], [400, 300]);

function discordWindow() {
    createWindow("discord yo", "@lumix_", [300, 700]);
}

function astatineWindow() {
    createWindow("astatine (pre-pre-pre-alpha)", /*html*/`
    <div class="height flex column center gap16">
        <div class="flex column align">
            <h1>astatine</h1>
            <p>2d survival game <i>(pre-pre-pre-alpha)</i></p>
            <p>i've rewritten this game like 10 times</p>
        </div>
        <div>
            <p>here are some major versions:</p>
            <p><a href="https://github.com/lumixing/astatine-java">astatine-java</a>: first major version in java and libgdx</p>
            <p><a href="https://github.com/lumixing/astatine-kt">astatine-kt</a>: rewrite in kotlin and libktx (most advanced?)</p>
            <p><a href="https://github.com/lumixing/astatine">astatine</a>: in rust and bevy</p>
        </div>
        <div>
            <p class="aligned">and now im rewriting it with the amazing <a href="https://odin-lang.org/">odin</a> language and trying to make my own opengl rendering engine</p>
        </div>
    </div>
    `, [750, "random"], [450, 300]);
}

function rand(range) {
    return ~~(Math.random() * range);
}

function createWindow(title, body, position, size) {
    let windowElement = document.createElement("div");
    windowElement.classList.add("window");

    windowElement.style.left = `${position[0]}px`;
    windowElement.style.top = `${position[1]}px`;

    if (position == "center") {
        windowElement.style.left = `${(window.innerWidth - size[0]) / 2}px`;
        windowElement.style.top = `${(window.innerHeight - size[1]) / 2}px`;
    }

    if (position[0] == "center") {
        windowElement.style.left = `${(window.innerWidth - size[0]) / 2}px`;
    }
    if (position[1] == "center") {
        windowElement.style.top = `${(window.innerHeight - size[1]) / 2}px`;
    }

    if (position == "random") {
        windowElement.style.left = `${rand(window.innerWidth)}px`;
        windowElement.style.top = `${rand(window.innerHeight)}px`;
    }

    if (position[1] == "random") {
        windowElement.style.top = `${rand(window.innerHeight - size[1])}px`;
    }

    if (size != null) {
        windowElement.style.width = `${size[0]}px`;
        windowElement.style.height = `${size[1]}px`;
    }
        
    windowElement.innerHTML = /*html*/`
    <div class="window-head">${title}</div>
    <div class="window-body">${body}</div>
    `;

    // focus
    zIndex += 1;
    selectedWindow = windowElement;
    selectedWindow.style.zIndex = zIndex;

    windowElement.addEventListener("mousedown", () => {
        zIndex += 1;
        selectedWindow = windowElement;
        selectedWindow.style.zIndex = zIndex;
    });

    windowElement.querySelector(".window-head").addEventListener("mousedown", ev => {
        x = ev.clientX;
        y = ev.clientY;

        document.addEventListener("mousemove", windowMouseMove);
        document.addEventListener("mouseup", windowMouseUp);
    });

    document.body.appendChild(windowElement);
}

function windowMouseMove(ev) {
    let dx = ev.clientX - x;
    let dy = ev.clientY - y;

    if (ev.clientX > 0 && ev.clientX < window.innerWidth) {
        selectedWindow.style.left = `${selectedWindow.offsetLeft + dx}px`;
    }

    if (ev.clientY > 0 && ev.clientY < window.innerHeight) {
        selectedWindow.style.top = `${selectedWindow.offsetTop + dy}px`;
    }

    x = ev.clientX;
    y = ev.clientY;
}

function windowMouseUp() {
    document.removeEventListener("mousemove", windowMouseMove);
    document.removeEventListener("mouseup", windowMouseUp);
}

// disable context menu
document.oncontextmenu = ev => ev.preventDefault();

function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}

// redirect mobile users to old homepage
if (isMobile()) {
    window.location.replace("https://lumix.lol/old/");
}
