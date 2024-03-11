var form = document.querySelector("form");
var phoneDetails = document.querySelector(".phone-details");
var canvas = document.querySelector(".canvas");

var time = phoneDetails.querySelector(".time");
var batteryPercent = phoneDetails.querySelector(".battery-percent");
var batteryBar = phoneDetails.querySelector(".battery");
var networkGen = phoneDetails.querySelector("sup");

function getCurrentTime() {
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	hours = hours < 10 ? "0" + hours : hours;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	time.textContent = `${hours}:${minutes}`;
}

navigator.getBattery().then(battery => {
	var batteryPercentage = battery.level * 100;
	batteryPercent.textContent = `${batteryPercentage}%`;

	if (batteryPercentage >= 75) {
		batteryBar.classList.add("fa-battery-full");
	} else if (batteryPercentage >= 50 && batteryPercentage < 75) {
		batteryBar.classList.add("fa-battery-three-quarters");
	} else if (batteryPercentage >= 25 && batteryPercentage < 50) {
		batteryBar.classList.add("fa-battery-half");
	} else if (batteryPercentage >= 1 && batteryPercentage < 25) {
		batteryBar.classList.add("fa-battery-quarter");
	} else {
		batteryBar.classList.add("fa-battery-empty");
	}
});

if (navigator.connection) {
	networkGen.textContent = navigator.connection.effectiveType;
}

getCurrentTime();

var question = form.querySelector("#question");
var answer = form.querySelector("#answer");
var searchSuggest1 = form.querySelector("#searchSuggest1");
var searchSuggest2 = form.querySelector("#searchSuggest2");
var searchSuggest3 = form.querySelector("#searchSuggest3");
var updateBtn = form.querySelector("button");

var questionText = canvas.querySelector(".searchCont");
var answerText = canvas.querySelector(".search-res p");
var sugBody1 = canvas.querySelector(".sug-body-1 p");
var sugBody2 = canvas.querySelector(".sug-body-2 p");
var sugBody3 = canvas.querySelector(".sug-body-3 p");

updateBtn.addEventListener("click", event => {
	event.preventDefault();
	questionText.textContent = question.value;
	answerText.textContent = `${question.value} ${answer.value}`;
	sugBody1.textContent = searchSuggest1.value;
	sugBody2.textContent = searchSuggest2.value;
	sugBody3.textContent = searchSuggest3.value;
});

var downloadBtn = document.querySelector(".download");

downloadBtn.addEventListener("click", function () {
	html2canvas(canvas).then(function (canv) {
		const dataURL = canv.toDataURL("image/png");
		console.log(dataURL)
		downloadjs(dataURL, "myImage.png", "image/png");
	});
});
