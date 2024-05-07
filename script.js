document.getElementById("open-modal-btn").addEventListener("click", function () {
	document.getElementById("my-modal").classList.add("open")
})

// Закрыть модальное окно
document.getElementById("close-my-modal-btn").addEventListener("click", function () {
	document.getElementById("my-modal").classList.remove("open")
})

// Закрыть модальное окно при нажатии на Esc
window.addEventListener('keydown', (e) => {
	if (e.key === "Escape") {
		document.getElementById("my-modal").classList.remove("open")
	}
});

// Закрыть модальное окно при клике вне его
document.querySelector("#my-modal .modal__box").addEventListener('click', event => {
	event._isClickWithInModal = true;
});
document.getElementById("my-modal").addEventListener('click', event => {
	if (event._isClickWithInModal) return;
	event.currentTarget.classList.remove('open');
});
function openModal() {
	document.getElementById("my-modal").classList.add("open")
}
let timeLeft = {
	hours: 1,
	minutes: 30,
	seconds: 0
};
//таймер
const timerElement = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');


function end() {
	let end_all = confirm("Вы хотите закончить?");
	if (end_all == true) {
		let end_all = confirm("Вы хотите провести заключительную разминку?")
		if (end_all == true) {
            openModal();
			
		} else {
			alert("Досвидание");
			location.reload();
		}
	}
}



timeLeft = {
	hours: 1,
	minutes: 30,
	seconds: 0
};
let interval;
let isPaused = false;

startButton.addEventListener('click', () => {

	if (interval) {
		clearInterval(interval);
		interval = null;
	}
	isPaused = false;
	interval = setInterval(() => {
		timeLeft.seconds--;
		if (timeLeft.seconds < 0) {
			timeLeft.seconds = 59;
			timeLeft.minutes--;
			if (timeLeft.minutes < 0) {
				timeLeft.minutes = 59;
				timeLeft.hours--;
			}
		}
		timerElement.textContent = formatTime(timeLeft);
		if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
			clearInterval(interval);
			timeLeft = {
				hours: 1,
				minutes: 30,
				seconds: 0
			};
			openModal();
		}
	}, 1000);
});

function formatTime(time) {

	return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
}

function pauseTimer() {
	isPaused = !isPaused;

	if (isPaused) {
		clearInterval(interval);
		timerElement.textContent = formatTime(timeLeft);
	} else {
		interval = setInterval(() => {
			timeLeft.seconds--;
			if (timeLeft.seconds < 0) {
				timeLeft.seconds = 59;
				timeLeft.minutes--;
				if (timeLeft.minutes < 0) {
					timeLeft.minutes = 59;
				}
			}
		}, 1000);
	}
}