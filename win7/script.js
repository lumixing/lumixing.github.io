let [x, y] = [0, 0];
let zIndex = 0;
let selectedWindow = null;
let selectedWindowResize = null;

document.addEventListener("mousedown", (e) => {
    let windowHeadTarget = e.target.closest(".window > .head:not(.no-move)");
    if (windowHeadTarget) {
        if (e.target.closest(".window-head-buttons")) return;
        selectedWindow = windowHeadTarget.parentElement;
        return windowMoveMouseDownHandler(e);
    }

    let windowResizeTarget = e.target.closest(".window > .window-resize");
    if (windowResizeTarget) {
        selectedWindow = windowResizeTarget.parentElement;
        selectedWindowResize = windowResizeTarget;
        return windowResizeMouseDownHandler(e);
    }
});

function windowMoveMouseDownHandler(e) {
    x = e.clientX;
    y = e.clientY;

    selectedWindow.style.zIndex = ++zIndex;

    document.addEventListener("mousemove", windowMoveMouseMoveHandler);
    document.addEventListener("mouseup", windowMoveMouseUpHandler);
}

function windowResizeMouseDownHandler(e) {
    x = e.clientX;
    y = e.clientY;

    selectedWindow.style.zIndex = ++zIndex;

    document.addEventListener("mousemove", windowResizeMouseMoveHandler);
    document.addEventListener("mouseup", windowResizeMouseUpHandler);
}

function windowMoveMouseMoveHandler(e) {
    const dx = e.clientX - x;
    const dy = e.clientY - y;

    selectedWindow.style.top = `${selectedWindow.offsetTop + dy}px`;
    selectedWindow.style.left = `${selectedWindow.offsetLeft + dx}px`;

    x = e.clientX;
    y = e.clientY;
}

function windowResizeMouseMoveHandler(e) {
    const dx = e.clientX - x;
    const dy = e.clientY - y;

    if (selectedWindowResize.classList.contains("top-resize") ||
        selectedWindowResize.classList.contains("top-left-resize") ||
        selectedWindowResize.classList.contains("top-right-resize")) {
        selectedWindow.style.height = `${selectedWindow.offsetHeight - dy - 2}px`;
        selectedWindow.style.top = `${selectedWindow.offsetTop + dy}px`;
    }
    if (selectedWindowResize.classList.contains("right-resize") ||
        selectedWindowResize.classList.contains("top-right-resize") ||
        selectedWindowResize.classList.contains("bottom-right-resize")) {
        selectedWindow.style.width = `${selectedWindow.offsetWidth + dx - 2}px`;
    }
    if (selectedWindowResize.classList.contains("bottom-resize") ||
        selectedWindowResize.classList.contains("bottom-left-resize") ||
        selectedWindowResize.classList.contains("bottom-right-resize")) {
        selectedWindow.style.height = `${selectedWindow.offsetHeight + dy - 2}px`;
    }
    if (selectedWindowResize.classList.contains("left-resize") ||
        selectedWindowResize.classList.contains("top-left-resize") ||
        selectedWindowResize.classList.contains("bottom-left-resize")) {
        selectedWindow.style.width = `${selectedWindow.offsetWidth - dx - 2}px`;
        selectedWindow.style.left = `${selectedWindow.offsetLeft + dx}px`;
    }

    x = e.clientX;
    y = e.clientY;
}

function windowMoveMouseUpHandler() {
    selectedWindow = null;
    document.removeEventListener("mousemove", windowMoveMouseMoveHandler);
    document.removeEventListener("mouseup", windowMoveMouseUpHandler);
}

function windowResizeMouseUpHandler() {
    selectedWindow = null;
    selectedWindowResize = null;
    document.removeEventListener("mousemove", windowResizeMouseMoveHandler);
    document.removeEventListener("mouseup", windowResizeMouseUpHandler);
}

function closeWindow(e) {
    e.closest(".window").style.animation = "none";
    setTimeout(() => {
        e.closest(".window").style.animation = "openWindow .2s ease reverse forwards";
    }, 0);
}

function minimizeWindow(e) {
    e.closest(".window").style.animation = "none";
    setTimeout(() => {
        e.closest(".window").style.animation = "minimizeWindow .2s ease forwards";
    }, 0);
}