var awards = {
	FAIL : "FAIL",
	PASS : "PASS",
	PASSPLUS : "PASS PLUS",
	SILVER : "SILVER",
	GOLD : "GOLD",
	GOLDPLUS : "GOLD PLUS"
};

var agegroupts = 0;
var situppts = 0;
var pushuppts = 0;
var runningpts = 0;
var pstotal = 0;

var agegroupscore = 0;
var situpscore = 0;
var pushupscore = 0;
var runningscore = 0;
var sptotal = 0;

var agegroupsum = 0;

var init = function() {

	createPushupArray();
	createRunningArray();
	createSitupArray();
	populateSitupTable();

	//alert(PushupScore2Point(1, 60))
	//alert(RunningScore2Point(5,786));
	//alert(SitupScore2Point(3, 30));

	//alert(PushupPoint2Score(5, 18))
	//alert(SitupPoint2Score(5,13));
	//alert(RunningPoint2Score(5,20));
	$("#running-score-slider").parent().prepend('<input type="text" data-role="none" class="timeLabel score-pts-slider ui-shadow-inset ui-body-inherit ui-corner-all ui-slider-input" value="12:00" disabled />')

	$("#running-score-slider").on("change", function() {
		var time = secondsToTimeString($(this).val());
		$(".timeLabel").val(time);
	});

	$(".pts-score-slider").bind("change", function(event, ui) {
		calculatePts2Score();
	});

	$('#age-pts-input').bind("change", function(event, ui) {
		calculatePts2Score();
	});

	$(".score-pts-slider").bind("change", function(event, ui) {
		calculateScore2Pts();
	});

	$('#age-score-input').bind("change", function(event, ui) {
		calculateScore2Pts();
	});
}

$(document).ready(init);

function calculatePts2Score() {
	agegroupts = getAgeGroup(parseInt($("#age-pts-input").val()));

	situppts = $("#situp-pts-slider").val();
	$("#situp-score").text(SitupPoint2Score(agegroupts, situppts));

	pushuppts = $("#pushup-pts-slider").val();
	$("#pushup-score").text(PushupPoint2Score(agegroupts, pushuppts));

	runningpts = $("#running-pts-slider").val();
	$("#running-score").text(secondsToTimeString(RunningPoint2Score(agegroupts, runningpts)));

	pstotal = parseInt(situppts) + parseInt(pushuppts) + parseInt(runningpts);
	$('#ps-total').text(pstotal);

	$('#ps-award').text(getAward(pstotal));
}

function calculateScore2Pts() {
	agegroupscore = getAgeGroup(parseInt($("#age-score-input").val()));

	situpscore = $("#situp-score-slider").val();
	$("#situp-pts").text(SitupScore2Point(agegroupscore, situpscore));

	pushupscore = $("#pushup-score-slider").val();
	$("#pushup-pts").text(PushupScore2Point(agegroupscore, pushupscore));

	runningscore = $("#running-score-slider").val();
	$("#running-pts").text(RunningScore2Point(agegroupscore, runningscore));

	sptotal = parseInt(SitupScore2Point(agegroupscore, situpscore)) + parseInt(PushupScore2Point(agegroupscore, pushupscore)) + parseInt(RunningScore2Point(agegroupscore, runningscore));
	$('#sp-total').text(sptotal);

	$('#sp-award').text(getAward(sptotal));
}

function populateSitupTable() {
	agegroupsum = getAgeGroup(parseInt($("#age-sum-input").val()));
	$(".table-left").append('<tr><td>Score</td><td>Point</td></tr>');
	$(".table-center").append('<tr><td>Score</td><td>Point</td></tr>');
	$(".table-right").append('<tr><td>Score</td><td>Point</td></tr>');
	
	for (var i = 60; i > 40; i--) {
		$(".table-left").append('<tr><td>' + i + '</td><td>'+ SitupScore2Point(agegroupsum, i) +'</td></tr>');
	}
	for (var i = 40; i > 20; i--) {
		$(".table-center").append('<tr><td>' + i + '</td><td>'+ SitupScore2Point(agegroupsum, i) +'</td></tr>');
	}
	for (var i = 20; i > 0; i--) {
		$(".table-right").append('<tr><td>' + i + '</td><td>'+ SitupScore2Point(agegroupsum, i) +'</td></tr>');
	}
}

function getAgeGroup(age) {
	if (age < 22)
		return 1;
	else if (age >= 22 && age <= 24)
		return 2;
	else if (age >= 25 && age <= 27)
		return 3;
	else if (age >= 28 && age <= 30)
		return 4;
	else if (age >= 31 && age <= 33)
		return 5;
	else if (age >= 34 && age <= 36)
		return 6;
	else if (age >= 37 && age <= 39)
		return 7;
	else if (age >= 40 && age <= 42)
		return 8;
	else if (age >= 43 && age <= 45)
		return 9;
	else if (age >= 46 && age <= 48)
		return 10;
	else if (age >= 49 && age <= 51)
		return 11;
	else if (age >= 52 && age <= 54)
		return 12;
	else if (age >= 55 && age <= 57)
		return 13;
	else if (age >= 58 && age <= 60)
		return 14;
	else
		return 0;
}

function getAward(points) {
	if (points >= 85)
		return awards.GOLDPLUS;
	else if (points > 80)
		return awards.GOLD;
	else if (points > 70)
		return awards.SILVER;
	else if (points > 60)
		return awards.PASSPLUS;
	else if (points > 50)
		return awards.PASS;
	else
		return awards.FAIL;
}

function secondsToTimeString(seconds) {
	var min = Math.floor(seconds / 60);
	var sec = seconds - (min * 60);
	return pad(min, 2) + ":" + pad(sec, 2);
}

function IntToTime(val) {
	var hours = parseInt(val / 60);
	var min = val - (hours * 60);
	var time = hours + ':' + (min < 10 ? '0' + min : min);
	return time;
}

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
