// new WOW().init();

$('.cupContent').click(function() {
	$('.cupContent').toggleClass('cross');
	$('.highscore').toggleClass('isActive');
})

var btn = $('#tryAgain');

var redirect = function() {
	window.location.href = "level1.html";
}

$('#tryAgain').click(function() {
	console.log('fvghjk')
	var songItem =  new Audio('../../sounds/imBack.mp3');
	songItem.play();
	setTimeout(redirect, 1800);
});

