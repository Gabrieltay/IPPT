var awards = {
	FAIL : "FAIL",
	PASS : "PASS",
	PASSPLUS : "PASS PLUS",
	SILVER : "SILVER",
	GOLD : "GOLD",
	GOLDPLUS : "GOLD PLUS"
};

var agegroup = 0;
var situppts = 0;
var pushuppts = 0;
var runningpts = 0;
var pstotal = 0;

var init = function() {
	//alert(PushupScore2Point(1, 60))
	//alert(RunningScore2Point(5,786));
	//alert(SitupScore2Point(3, 30));

	//alert(PushupPoint2Score(5, 18))
	//alert(SitupPoint2Score(5,13));
	//alert(RunningPoint2Score(5,20));

	$(".pts-score-slider").bind("change", function(event, ui) {
		calculatePts2Score();
	});

	$('#age-pts-input').bind("change", function(event, ui) {
		calculatePts2Score();
	});
}

$(document).ready(init);

function calculatePts2Score() {
	agegroup = getAgeGroup(parseInt($("#age-pts-input").val()));

	situppts = $("#situp-pts-slider").val();
	$("#situp-score").text(SitupPoint2Score(agegroup, situppts));

	pushuppts = $("#pushup-pts-slider").val();
	$("#pushup-score").text(PushupPoint2Score(agegroup, pushuppts));

	runningpts = $("#running-pts-slider").val();
	$("#running-score").text(secondsToTimeString(RunningPoint2Score(agegroup, runningpts)));
	
	pstotal = parseInt(situppts) + parseInt(pushuppts) + parseInt(runningpts);
	$('#ps-total').text(pstotal);
	
	$('#ps-award').text(getAward(pstotal));
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

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
