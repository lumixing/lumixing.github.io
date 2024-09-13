(async () => {
    const data = await (await fetch("https://wakatime.com/share/@lumixing/73625530-1804-4636-80c4-7a2f4c160e02.json")).json();
    data.data.slice(0, 5).forEach(v => {
        const perc = Math.floor(v.percent);
        document.querySelector(".langs__list").innerHTML += /*html*/`
            <div class="langs__lang">
                <span class="lang__name">${v.name}</span>
                <span class="lang__usage">(${perc}%)</span>
                <div class="lang__bar" style="background-color: ${v.color}; width: ${perc}%;"></div>
            </div>
        `;
    });
    const target = document.querySelector(".aside__langs");
    target.style.display = "block";
    setTimeout(() => { // timing skill issue
        target.style.opacity = "1";
        target.style.maxHeight = "500px";
    }, 20)
})();

let scrollerClicks = 0;

function clickScroller() {
    scrollerClicks++;
    if (scrollerClicks == 2) {
        document.querySelector(".aside__scroll").classList.add("animation__swing");
        document.querySelector(".aside__scroll").start();
        document.querySelector(".aside__scroll").setAttribute("direction", "right");
        document.querySelector(".aside__scroll").setAttribute("scrollamount", "18");
        document.querySelector(".aside__scroll").textContent = "ERROR! ERROR! ERROR! ERROR! ERROR! ERROR! ERROR! ERROR! ERROR! "
    } else if (scrollerClicks == 4) {
        document.querySelector(".aside__scroll").classList.add("animation__fall");
        document.querySelector(".aside__scroll").textContent = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!!!"
    }
}
