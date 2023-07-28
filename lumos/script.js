console.log("ready!");

let container = document.querySelector("#window-container");
let windowHeads = document.querySelectorAll(".window > .head");

let x = 0;
let y = 0;
let zIndex = 100;
let menu = document.querySelector(".context-menu");
let menuState = 0;
let contextMenuActive = "block";

function toggleMenuOn() {
    if (menuState !== 1) {
      menuState = 1;
      menu.classList.add(contextMenuActive);
    }
  }

  function toggleMenuOff() {
    if (menuState !== 0) {
      menuState = 0;
      menu.classList.remove(contextMenuActive);
    }
  }

  function getPosition(e) {
    var posx = 0;
    var posy = 0;
  
    if (!e) var e = window.event;
  
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy =
        e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
  
    return {
      x: posx,
      y: posy
    };
  }

  function positionMenu(e) {
    let clickCoords = getPosition(e);
    let clickCoordsX = clickCoords.x;
    let clickCoordsY = clickCoords.y;
  
    let menuWidth = menu.offsetWidth + 4;
    let menuHeight = menu.offsetHeight + 4;
  
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
  
    if (windowWidth - clickCoordsX < menuWidth) {
      menu.style.left = windowWidth - menuWidth + "px";
    } else {
      menu.style.left = clickCoordsX + "px";
    }
  
    if (windowHeight - clickCoordsY < menuHeight) {
      menu.style.top = windowHeight - menuHeight + "px";
    } else {
      menu.style.top = clickCoordsY + "px";
    }
  }

  document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    toggleMenuOn();
    positionMenu(event);
  });

  document.addEventListener("click", (e) => {
    var button = e.which || e.button;
    if (button === 1) {
      toggleMenuOff();
    }
  });

const mouseDownHandler2 = function (e) {
    x = e.clientX;
    y = e.clientY;

    e.target.closest(".icon").style.zIndex = ++zIndex;

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
};

const mouseMoveHandler = function (e) {
    const dx = e.clientX - x;
    const dy = e.clientY - y;

    e.target.parentElement.style.top = `${e.target.parentElement.offsetTop + dy}px`;
    e.target.parentElement.style.left = `${e.target.parentElement.offsetLeft + dx}px`;

    x = e.clientX;
    y = e.clientY;
};

const mouseUpHandler = function () {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
};

document.addEventListener("mousedown", (e) => {
    let windowHeadTarget = e.target.closest(".window > .head");
    if (windowHeadTarget) mouseDownHandler(e);

    let desktopIconTarget = e.target.closest("#desktop > .icon");
    if (desktopIconTarget) mouseDownHandler2(e);
});

function createWindow() {
    let windowDiv = document.createElement("div");
    windowDiv.classList.add("window");
    windowDiv.innerHTML = /*html*/`
        <div class="head">
            cool window #${Math.random()}
            <button onclick="closeWindow(this)">x</button>
        </div>
        <div class="body">body</div>  
    `;
    container.append(windowDiv);
}

function closeWindow(e) {
    e.closest(".window").remove();
}
