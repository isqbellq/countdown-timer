	"use strict"

	let countdown;
	const timerDisplay = document.querySelector(".time-left");
	const endTime = document.querySelector(".end-time");
	const buttons = document.querySelectorAll("[data-seconds]");

	function timer(seconds) {
		clearInterval(countdown);

		const now = Date.now();
		const then = now + seconds * 1000;
		displayTimeLeft(seconds);
		displayEndTime(then);
		controls();

		countdown = setInterval(() => {
			const secondsLeft = Math.round((then - Date.now()) / 1000);

			if (secondsLeft < 0) {
				clearInterval(countdown);
				return;
			}

			displayTimeLeft(secondsLeft);
		}, 1000);
	}

	function displayTimeLeft(seconds) {
		const h = Math.floor(seconds / 3600);
		const m = Math.floor(seconds % 3600 / 60);
		const s = Math.floor(seconds % 3600 % 60);

		const text = document.querySelector(".text");
		text.textContent = "Time left:";

		const display = `${h < 10 ? "0" : ""}${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
		
		timerDisplay.textContent = display;
		document.title = display;
		
		if (h === 0 && m === 0 && s === 0) {
			timerDisplay.textContent = "Time's up!";
		} else if (h === 0 && m === 0 && s <= 10) {
			timerDisplay.style.color = "#e2062c";
		}  else {
			timerDisplay.style.color = "#000";
		}

	}

	function displayEndTime(timestamp) {
		const end = new Date(timestamp);
		const hours = end.getHours();
		const minutes = end.getMinutes();
		endTime.textContent = `Get back to work at ${hours}${hours < 10 ? "0" : ""}:${minutes < 10 ? "0" : ""}${minutes}.`;
	}

	function startTimer() {
		const seconds = parseInt(this.dataset.seconds);
		timer(seconds);
	}

	buttons.forEach(button => button.addEventListener("click", startTimer));

	document.custom.addEventListener("submit", function(e) {
		e.preventDefault();
		const mins = this.minutes.value;

	    // check if custom time is a number
		!isNaN(mins) && mins !== " " && timer(mins * 60);

		this.reset();
	});

	function controls() {
		// const pauseBut = document.querySelector(".pause-button");
		const stopBut = document.querySelector(".stop-button");

		stopBut.addEventListener("click", function(e) {
			e.preventDefault();
			timer(0);
			timerDisplay.textContent = "00:00:00";
			timerDisplay.style.color = "#000";			
			endTime.textContent = "";
		});
	}
