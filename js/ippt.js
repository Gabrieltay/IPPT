var awards = {
	FAIL : 0,
	PASS : 1,
	PASSPLUS : 2,
	SILVER : 3,
	GOLD : 4,
	GOLDPLUS : 5
};

var init = function() {
	//alert(PushupScore2Point(1, 60))
	//alert(RunningScore2Point(5,786));
	//alert(SitupScore2Point(3, 30));
	
	//alert(PushupPoint2Score(5, 18))
	//alert(SitupPoint2Score(5,13));
	//alert(RunningPoint2Score(5,20));
}

$(document).ready(init);

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

