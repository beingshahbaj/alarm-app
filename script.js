const activeTimersContainer = document.getElementById('activeTimers');
const notime = document.getElementById("notime");


setInterval(() => {
    
    if (activeTimersContainer.children.length > 1) {
        notime.classList.add("remove")
    } else if(activeTimersContainer.children.length <1) {
        notime.classList.remove("remove")
        
   }
},100)

function startNewTimer() {
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');

    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert('Please enter a valid time.');
        return;
    }

    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    const timerElement = document.createElement('div');
    const left = document.createElement("h3");
    left.textContent = "left Time";
    timerElement.appendChild(left)
    timerElement.classList.add ("timer-input-section");
    timerElement.classList.add("timer");
    


    const timerId = setInterval(() => {
        totalSeconds--;
        
        if (totalSeconds <= 0) {
            clearInterval(timerId);
            handleTimerEnd(timerElement , div , left , stopButton);
        }
        
        updateTimerDisplay(div, totalSeconds);
    }, 1000);

   

    const stopButton = document.createElement('button');
    stopButton.textContent = 'stop';
    stopButton.onclick = () => {
        clearInterval(timerId);
        timerElement.remove();


    };

    const div = document.createElement("h2");
    div.className = "time"
    div.appendChild(document.createTextNode(formatTime(totalSeconds)));
    timerElement.appendChild(div);
    timerElement.appendChild(stopButton);

    activeTimersContainer.appendChild(timerElement);

    hoursInput.value = "";
    minutesInput.value = "";
    secondsInput.value = "";


}

function updateTimerDisplay(div, totalSeconds) {
    div.textContent = formatTime(totalSeconds);
}

function handleTimerEnd(timerElement, div, left ,stopButton) {
    const h2 = document.createElement("h3");
    h2.className = "fontcolor"
    h2.textContent = "Timer Is Up !"
    timerElement.insertBefore(h2, stopButton)
    timerElement.classList.add("color")
    stopButton.textContent = "delete"
    stopButton.style.backgroundColor = "#34344a"
    stopButton.style.color = "white"
    div.remove();
    left.remove();
    
    playAudioAlert(); 
}

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function playAudioAlert() {
    const audio = document.getElementById("audio");
    audio.play();
};