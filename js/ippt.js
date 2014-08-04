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

var agegrouprw = 0;
var situprw = 0;
var situprwpts = 0;
var pushuprw = 0;
var pushuprwpts = 0;
var runningrw = 0;
var runningrwpts = 0;
var rwtotal = 0;
var target = 0;
var remaining = 0;

var agegroupsum = 0;
$(document).on('pageinit', '#home-page', function() {
	console.log("Init home-page");
	$('#age-input').change(function() {
		if (isNumeric($('#age-input').val()) && parseInt($('#age-input').val()) >= 16 && parseInt($('#age-input').val()) <= 60) {
			calculateScore2Pts();
			calculatePts2Score();
			window.localStorage.setItem("age", Math.floor(parseInt($('#age-input').val())));
		}
	});
});

$(document).on('pageinit', '#ps-page', function() {
	console.log("Init ps-page");
	$(".pts-score-slider").change(function() {
		calculatePts2Score();
	});
});

$(document).on('pageinit', '#sp-page', function() {
	console.log("Init sp-page");
	$(".score-pts-slider").change(function() {
		calculateScore2Pts();
	});

	$(".timeLabel").remove();
	$("#running-score-slider").parent().prepend('<input type="text" data-role="none" class="timeLabel score-pts-slider ui-shadow-inset ui-body-inherit ui-corner-all ui-slider-input" value="12:00" disabled />')
	$("#running-score-slider").change(function() {
		var time = secondsToTimeString(parseInt(1100 - $(this).val()));
		$(".timeLabel").val(time);
	});
});

$(document).on('pageinit', '#rs-page', function() {
	console.log("Init rs-page");
	$(".rw-score-slider").change(function() {
		calculateReward2Score();
	});
	
	$("#select-choice-rewards").change(function() {
		constantAdjustment();
	});

	$("#situp-rw-slider").on('slidestop', function(event) {
		target = getAwardPoints($("#select-choice-rewards").val());
		if ($("input[name*=radio-choice-a]:checked").val() == "SITUP") {
			constantAdjustment();
		} else if ($("input[name*=radio-choice-a]:checked").val() == "PUSHUP") {
			remaining = target - SitupScore2Point(agegrouprw, situprw) - PushupScore2Point(agegrouprw, pushuprw);
			if (remaining > 50) {
				$("#situp-rw-slider").val(SitupPoint2Score(agegrouprw, (target - PushupScore2Point(agegrouprw, pushuprw) - 50)));
				$("#situp-rw-slider").slider('refresh');
				situprw = $("#situp-rw-slider").val();
				remaining = target - SitupScore2Point(agegrouprw, situprw) - PushupScore2Point(agegrouprw, pushuprw);
			}
			$("#running-rw-slider").val(1100 - RunningPoint2Score(agegrouprw, remaining));
			$("#running-rw-slider").slider('refresh');
			var time = secondsToTimeString(parseInt(RunningPoint2Score(agegrouprw, remaining)));
			$(".rw-timeLabel").val(time);
		} else// Running
		{
			remaining = target - SitupScore2Point(agegrouprw, situprw) - RunningScore2Point(agegrouprw, runningrw);
			if (remaining > 25) {
				$("#situp-rw-slider").val(SitupPoint2Score(agegrouprw, (target - RunningScore2Point(agegrouprw, runningrw) - 25)));
				$("#situp-rw-slider").slider('refresh');
				situprw = $("#situp-rw-slider").val();
				remaining = target - SitupScore2Point(agegrouprw, situprw) - RunningScore2Point(agegrouprw, runningrw);
			}
			$("#pushup-rw-slider").val(PushupPoint2Score(agegrouprw, remaining));
			$("#pushup-rw-slider").slider('refresh');
		}

	});

	$("#pushup-rw-slider").on('slidestop', function(event) {
		target = getAwardPoints($("#select-choice-rewards").val());
		if ($("input[name*=radio-choice-a]:checked").val() == "PUSHUP") {
			constantAdjustment();
		} else if ($("input[name*=radio-choice-a]:checked").val() == "SITUP") {
			remaining = target - SitupScore2Point(agegrouprw, situprw) - PushupScore2Point(agegrouprw, pushuprw);
			if (remaining > 50) {
				$("#pushup-rw-slider").val(PushupPoint2Score(agegrouprw, (target - SitupScore2Point(agegrouprw, situprw) - 50)));
				$("#pushup-rw-slider").slider('refresh');
				pushuprw = $("#pushup-rw-slider").val();
				remaining = target - SitupScore2Point(agegrouprw, situprw) - PushupScore2Point(agegrouprw, pushuprw);
			}
			$("#running-rw-slider").val(1100 - RunningPoint2Score(agegrouprw, remaining));
			$("#running-rw-slider").slider('refresh');
			var time = secondsToTimeString(parseInt(RunningPoint2Score(agegrouprw, remaining)));
			$(".rw-timeLabel").val(time);

		} else// Running
		{
			remaining = target - PushupScore2Point(agegrouprw, pushuprw) - RunningScore2Point(agegrouprw, runningrw);
			if (remaining > 25) {
				$("#pushup-rw-slider").val(PushupPoint2Score(agegrouprw, (target - RunningScore2Point(agegrouprw, runningrw) - 25)));
				$("#pushup-rw-slider").slider('refresh');
				pushuprw = $("#pushup-rw-slider").val();
				remaining = target - PushupScore2Point(agegrouprw, pushuprw) - RunningScore2Point(agegrouprw, runningrw);
			}
			$("#situp-rw-slider").val(SitupPoint2Score(agegrouprw, remaining));
			$("#situp-rw-slider").slider('refresh');
		}
	});

	$("#running-rw-slider").on('slidestop', function(event) {
		target = getAwardPoints($("#select-choice-rewards").val());
		if ($("input[name*=radio-choice-a]:checked").val() == "RUNNING") {
			constantAdjustment();
		} else if ($("input[name*=radio-choice-a]:checked").val() == "SITUP") {
			remaining = target - SitupScore2Point(agegrouprw, situprw) - RunningScore2Point(agegrouprw, runningrw);
			if (remaining > 25) {
				$("#running-rw-slider").val(1100 - RunningPoint2Score(agegrouprw, (target - SitupScore2Point(agegrouprw, situprw) - 25)));
				$("#running-rw-slider").slider('refresh');
				runningrw = parseInt(1100 - $("#running-rw-slider").val());
				remaining = target - SitupScore2Point(agegrouprw, situprw) - RunningScore2Point(agegrouprw, runningrw);
			}
			$("#pushup-rw-slider").val(PushupPoint2Score(agegrouprw, remaining));
			$("#pushup-rw-slider").slider('refresh');
		} else// Pushup
		{
			remaining = target - PushupScore2Point(agegrouprw, pushuprw) - RunningScore2Point(agegrouprw, runningrw);
			if (remaining > 25) {
				$("#running-rw-slider").val(1100 - RunningPoint2Score(agegrouprw, (target - PushupScore2Point(agegrouprw, pushuprw) - 25)));
				$("#running-rw-slider").slider('refresh');
				runningrw = parseInt(1100 - $("#running-rw-slider").val());
				remaining = target - PushupScore2Point(agegrouprw, pushuprw) - RunningScore2Point(agegrouprw, runningrw);
			}
			$("#situp-rw-slider").val(SitupPoint2Score(agegrouprw, remaining));
			$("#situp-rw-slider").slider('refresh');
		}
	});

	$(".rw-timeLabel").remove();
	$("#running-rw-slider").parent().prepend('<input type="text" data-role="none" class="rw-timeLabel score-pts-slider ui-shadow-inset ui-body-inherit ui-corner-all ui-slider-input" value="12:00" disabled />')
	$("#running-rw-slider").change(function() {
		var time = secondsToTimeString(parseInt(1100 - $(this).val()));
		$(".rw-timeLabel").val(time);
	});
});

$(document).on("pagecontainershow", function(event, ui) {
	var activePage = $.mobile.pageContainer.pagecontainer("getActivePage").prop('id');
	if (activePage === "rs-page") {
		constantAdjustment();
	} else if (activePage === "sp-page") {

	}

});

var init = function() {
	initLocalStorage();
	createPushupArray();
	createRunningArray();
	createSitupArray();

	$('#age-input').val(window.localStorage.getItem("age"));
}
function initLocalStorage() {
	if (window.localStorage.getItem("age") == null)
		window.localStorage.setItem("age", 30);
}


$(document).ready(init);

function initAdjustmenet() {
	calculateReward2Score();
}

function constantAdjustment() {
	agegrouprw = getAgeGroup(parseInt($("#age-input").val()));
	var target = getAwardPoints($("#select-choice-rewards").val());

	if ($("input[name*=radio-choice-a]:checked").val() == "SITUP") {
		remaining = target - SitupScore2Point(agegrouprw, situprw);
		if (remaining > 75) {
			$("#situp-rw-slider").val(SitupPoint2Score(agegrouprw, (target - 75)));
			$("#situp-rw-slider").slider('refresh');
			situprw = $("#situp-rw-slider").val();
			remaining = target - SitupScore2Point(agegrouprw, situprw);
		}
		var allo = Math.floor(remaining / 3);
		$("#pushup-rw-slider").val(PushupPoint2Score(agegrouprw, allo));
		$("#pushup-rw-slider").slider('refresh');

		$("#running-rw-slider").val(1100 - RunningPoint2Score(agegrouprw, remaining - allo));
		$("#running-rw-slider").slider('refresh');
		var time = secondsToTimeString(parseInt(RunningPoint2Score(agegrouprw, remaining - allo)));
		$(".rw-timeLabel").val(time);
	} else if ($("input[name*=radio-choice-a]:checked").val() == "PUSHUP") {
		remaining = target - PushupScore2Point(agegrouprw, pushuprw);
		if (remaining > 75) {
			$("#pushup-rw-slider").val(PushupPoint2Score(agegrouprw, (target - 75)));
			$("#pushup-rw-slider").slider('refresh');
			pushuprw = $("#pushup-rw-slider").val();
			remaining = target - PushupScore2Point(agegrouprw, pushuprw);
		}
		var allo = Math.floor(remaining / 3);
		$("#situp-rw-slider").val(SitupPoint2Score(agegrouprw, allo));
		$("#situp-rw-slider").slider('refresh');

		$("#running-rw-slider").val(1100 - RunningPoint2Score(agegrouprw, remaining - allo));
		$("#running-rw-slider").slider('refresh');
		var time = secondsToTimeString(parseInt(RunningPoint2Score(agegrouprw, remaining - allo)));
		$(".rw-timeLabel").val(time);
	} else// RUNNING
	{
		remaining = target - RunningScore2Point(agegrouprw, runningrw);
		if (remaining > 50) {
			$("#running-rw-slider").val(1100 - RunningPoint2Score(agegrouprw, (target - 50)));
			$("#running-rw-slider").slider('refresh');
			runningrw = parseInt(1100 - $("#running-rw-slider").val());
			remaining = target - RunningScore2Point(agegrouprw, runningrw);
		}
		var allo = Math.floor(remaining / 2);
		$("#situp-rw-slider").val(SitupPoint2Score(agegrouprw, allo));
		$("#situp-rw-slider").slider('refresh');

		$("#pushup-rw-slider").val(PushupPoint2Score(agegrouprw, remaining - allo));
		$("#pushup-rw-slider").slider('refresh');
	}

}

function calculateReward2Score() {
	agegrouprw = getAgeGroup(parseInt($("#age-input").val()));

	situprw = $("#situp-rw-slider").val();
	$("#situp-rw-pts").text(SitupScore2Point(agegrouprw, situprw));

	pushuprw = $("#pushup-rw-slider").val();
	$("#pushup-rw-pts").text(PushupScore2Point(agegrouprw, pushuprw));

	runningrw = parseInt(1100 - $("#running-rw-slider").val());
	$("#running-rw-pts").text(RunningScore2Point(agegrouprw, runningrw));

	rwtotal = parseInt(SitupScore2Point(agegrouprw, situprw)) + parseInt(PushupScore2Point(agegrouprw, pushuprw)) + parseInt(RunningScore2Point(agegrouprw, runningrw));
	$('#rw-total').text(rwtotal);
}

function calculatePts2Score() {
	agegroupts = getAgeGroup(parseInt($("#age-input").val()));

	situppts = $("#situp-pts-slider").val();
	$("#situp-score").text(SitupPoint2Score(agegroupts, situppts));

	pushuppts = $("#pushup-pts-slider").val();
	$("#pushup-score").text(PushupPoint2Score(agegroupts, pushuppts));

	runningpts = $("#running-pts-slider").val();
	$("#running-score").text(secondsToTimeString(RunningPoint2Score(agegroupts, runningpts)));

	pstotal = parseInt(situppts) + parseInt(pushuppts) + parseInt(runningpts);
	$('#ps-total').text(pstotal);

	$('#ps-award').text(getAward(pstotal) + '\xA0\xA0\xA0' +getNextAward(pstotal));
}

function calculateScore2Pts() {
	agegroupscore = getAgeGroup(parseInt($("#age-input").val()));

	situpscore = $("#situp-score-slider").val();
	$("#situp-pts").text(SitupScore2Point(agegroupscore, situpscore));

	pushupscore = $("#pushup-score-slider").val();
	$("#pushup-pts").text(PushupScore2Point(agegroupscore, pushupscore));

	runningscore = parseInt(1100 - $("#running-score-slider").val());
	$("#running-pts").text(RunningScore2Point(agegroupscore, runningscore));

	sptotal = parseInt(SitupScore2Point(agegroupscore, situpscore)) + parseInt(PushupScore2Point(agegroupscore, pushupscore)) + parseInt(RunningScore2Point(agegroupscore, runningscore));
	$('#sp-total').text(sptotal);

	$('#sp-award').text(getAward(sptotal) + '\xA0\xA0\xA0' +getNextAward(sptotal));
}

function populateSitupTable() {
	$(".table").empty();
	agegroupsum = getAgeGroup(parseInt($("#age-input").val()));
	$(".table").append('<tr><td>Situps</td><td>Points</td></tr>');
	for (var i = 60; i > 0; i--) {
		$(".table").append('<tr><td>' + i + '</td><td>' + SitupScore2Point(agegroupsum, i) + '</td></tr>');
	}
}

function populatePushupTable() {
	$(".table").empty();
	agegroupsum = getAgeGroup(parseInt($("#age-input").val()));
	$(".table").append('<tr><td>Pushups</td><td>Points</td></tr>');
	for (var i = 60; i > 0; i--) {
		$(".table").append('<tr><td>' + i + '</td><td>' + PushupScore2Point(agegroupsum, i) + '</td></tr>');
	}
}

function populateRunningTable() {
	$(".table").empty();
	agegroupsum = getAgeGroup(parseInt($("#age-input").val()));
	$(".table").append('<tr><td>2.4Km Time</td><td>Points</td></tr>');
	for (var i = 510; i <= 1100; i += 10) {
		$(".table").append('<tr><td>' + secondsToTimeString(i) + '</td><td>' + RunningScore2Point(agegroupsum, i) + '</td></tr>');
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

function getAwardPoints(award) {
	if (award == awards.GOLDPLUS)
		return 85;
	else if (award == awards.GOLD)
		return 81;
	else if (award == awards.SILVER)
		return 71;
	else if (award == awards.PASSPLUS)
		return 61;
	else
		return 50;
}

function getNextAward(points) {
	var more = 0;
	var curAward = getAward(points);
	if ( curAward === awards.GOLDPLUS )
		return "";
	while ( curAward == getAward(points+more))
	{
		
		more++;		
	}
	console.log( "(" + more + " points to " + getAward(points+more) +")" );
	return "( " + more + " points to " + getAward(points+more) +" )";
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

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function toast(msg) {
	window.plugins.toast.show(msg, 'long', 'center');
}