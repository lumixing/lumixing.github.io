let windowContainer = document.getElementById("window-container");
let windowHeads = document.querySelectorAll(".window > .head");

let [x, y] = [0, 0];
let zIndex = 0;
let selectedWindow = null;

const createWindowOptionDefaults = {
    title: "window title",
    closeButton: true,
    x: 100,
    y: 100,
    width: 600,
    height: 400,
    resizable: true,
    movable: true,
    alwaysOnTop: false,
    content: "",
    url: "",
    addTaskbarApp: true,
    minimizable: true,
    autoSize: false
};

// startUpWindow();

document.addEventListener("mousedown", (e) => {
    let windowHeadTarget = e.target.closest(".window > .head:not(.no-move)");
    if (windowHeadTarget) {
        selectedWindow = windowHeadTarget.parentElement;
        mouseDownHandler(e);
    }
});

function mouseDownHandler(e) {
    x = e.clientX;
    y = e.clientY;

    selectedWindow.style.zIndex = ++zIndex;

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
}

function mouseMoveHandler(e) {
    const dx = e.clientX - x;
    const dy = e.clientY - y;

    selectedWindow.style.top = `${selectedWindow.offsetTop + dy}px`;
    selectedWindow.style.left = `${selectedWindow.offsetLeft + dx}px`;

    x = e.clientX;
    y = e.clientY;
}

function mouseUpHandler() {
    selectedWindow = null;
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
}

function canOpener() {
    createWindow({
        title: "my cool website B)",
        movable: false,
        resizable: false,
        content: "https://dimden.dev"
    });
}

function startUpWindow() {
    createWindow({
        title: "welcome to lumOS",
        content: /*html*/`
            <h1>welcome to lumOS!!!</h1>
            <p>everything you see is still in development :)</p>
            <p>have fun and heres my nft:</p>
            <img src="nft.png" alt="my nft" width="300">
        ` 
    });
}

function dimDenWindow() {
    createWindow({
        title: "dimden's awesome website",
        url: "https://dimden.dev" 
    });
}

function lumixWindow() {
    createWindow({
        title: "lumix's epic website B)",
        url: "https://lumixing.github.io/lumos" 
    });
}

function changeFontWindow() {
    createWindow({
        title: "change font",
        content: /*html*/`
            <button onclick="document.querySelector('body').style.fontFamily = 'inter'">click me for cool font</button>   
        `,
        autoSize: true
    });
}

function settingsWindow() {
    createWindow({
        title: "settings",
        content: /*html*/`
            yo
        `
    });
}

function createWindow(options) {
    options = _.defaults({}, _.clone(options), createWindowOptionDefaults);

    let windowDiv = document.createElement("div");
    windowDiv.classList.add("window");
    windowDiv.style.left = `${options.x}px`;
    windowDiv.style.top = `${options.y}px`;

    windowDiv.innerHTML = /*html*/`
        <div class="head">
            ${options.title}
            <div>
                ${options.url ? '<button onclick="reloadIframe(this)">r</button>' : ""}
                ${options.minimizable ? '<button onclick="minimizeWindow(this)">_</button>' : ""}
                ${options.closeButton ? '<button onclick="closeWindow(this)">x</button>' : ""}
            </div>
        </div>
        <div class="body">
            ${options.content || ""}
            ${options.url ? `<iframe src="${options.url}" frameborder="0"></iframe>` : ""}
        </div>  
    `;

    let windowHead = windowDiv.querySelector(".head");
    let windowBody = windowDiv.querySelector(".body");

    windowBody.style.width = `${options.width}px`;
    windowBody.style.height = `${options.height}px`;

    if (options.url) {
        windowBody.style.overflow = "hidden";
    }

    if (options.autoSize) {
        windowBody.style.width = "auto";
        windowBody.style.height = "auto";
        windowBody.style.minWidth = "auto";
        windowBody.style.minHeight = "auto";
        windowBody.style.maxWidth = "800px";
        windowBody.style.maxHeight = "800px";
    }

    if (!options.movable) {
        windowHead.classList.add("no-move");
    }

    if (!options.resizable) {
        windowBody.classList.add("no-resize");
    }

    if (options.alwaysOnTop) {
        windowDiv.style.zIndex = 9999999;
    }

    if (options.addTaskbarApp) {
        let id = Math.random();
        windowDiv.dataset.id = id;
        addTaskbarApp(id, options.title);
    }

    windowContainer.append(windowDiv);
    
    setTimeout(() => {
        windowDiv.style.animation = "none";
    }, 100);
}

function closeWindow(e) {
    let window = e.closest(".window");
    let id = window.dataset.id;

    window.style.animation = "windowOpen .1s ease reverse forwards";
    
    setTimeout(() => {
        window.remove();
    }, 100);
    
    removeTaskbarApp(id);
}

function minimizeWindow(e) {
    let window = e.closest(".window");
    window.style.animation = "windowMinimize .2s ease forwards";
    
    setTimeout(() => {
        window.style.display = "none";
        window.style.animation = "none";
    }, 200);
}

function reloadIframe(e) {
    e.closest(".window").querySelector("iframe").src += "";
}