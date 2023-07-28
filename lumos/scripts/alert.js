function createAlert() {
    createWindow({
        title: "alert!",
        content: /*html*/`
            <div style="padding: 32px">
                <div class="flex gap-m">
                    <img src="nft.png" alt="nft!" width="48" height="48">
                    <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus blanditiis rerum delectus illum, doloribus autem vero iste. Ex a, iste blanditiis nemo autem aliquid rem! Magni asperiores commodi ab natus?</span>
                </div>
                <button style="margin-top: 8px">ok</button>
            </div>  
        `,
        minimizable: false,
        resizable: false,
        autoSize: true,
        addTaskbarApp: false
    });
}

// createAlert();

function testToast() {
    let toastDiv = document.createElement("div");
    toastDiv.classList.add("toast");

    toastDiv.innerHTML = /*html*/`
        <span>yoyoy this is yor local toast informing you</span>
        <span>also this is the time ${Date.now()}</span>
    `;

    document.getElementById("toast-container").append(toastDiv);

    setTimeout(() => {
        toastDiv.style.animation = "none";
    }, 200);

    setTimeout(() => {
        toastDiv.style.animation = "toastOpen .2s ease reverse forwards";
        
        setTimeout(() => {
            toastDiv.remove();
        }, 200);
    }, 2000);
}