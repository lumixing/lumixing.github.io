$(document).ready(() => {
	console.log("ready!");
	$("#title").text(emotes[Math.floor(Math.random() * emotes.length)]);
});

let emotes = [
	"¯\\_(ツ)_/¯",
	"ಠ_ಠ",
	"(ง'̀-'́)ง",
	"(ಥ﹏ಥ)",
	"ಠ╭╮ಠ",
	"♪~ ᕕ(ᐛ)ᕗ",
	"ヾ(⌐■_■)ノ♪",
	"(╯°□°）╯︵ ┻━┻",
	"┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻",
	"┬──┬ ノ( ゜-゜ノ)",
	"(¬_¬)"
]