$(document).ready(() => {
	console.log("ready!");

	// $(".command").hover((e) => {
	// 	// hover enter
	// 	$(e.target).closest(".command").find(".command-syntax").fadeIn(100);
	// 	$(e.target).closest(".command").find(".command-info").slideDown(100);
	// }, (e) => {
	// 	// hover exit
	// 	$(e.target).closest(".command").find(".command-syntax").fadeOut(100);
	// 	$(e.target).closest(".command").find(".command-info").slideUp(100);
	// });

	$(".command").click((e) => {
		// hover enter
		$(e.target).closest(".command").find(".command-syntax").fadeToggle(100);
		$(e.target).closest(".command").find(".command-info").slideToggle(100);
	});
});