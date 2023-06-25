const keys = ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ş", "o", "p", "w", "e", "t", "y", "u", ";"];

function handleKeyDown(event) {
    const key = event.key.toLowerCase();
    const audioKey = (key === ';') ? 'ş' : key;
    const keyElement = document.getElementById(`key${key.toUpperCase()}`);

    if (keys.includes(key)) {

        const audio = new Audio(`audio/${audioKey}.wav`);
        audio.play();

        keyElement.classList.add('flash');
        setTimeout(() => {
            keyElement.classList.remove('flash');
        }, 200);
    }
}

function showKeysByKeyboardLanguage() {
    const turkishKeys = document.getElementsByClassName("turkish");
    const englishKeys = document.getElementsByClassName("english");

    const isTurkishKeyboard = navigator.language && navigator.language.toLowerCase().startsWith("tr");

    for (let i = 0; i < turkishKeys.length; i++) {
        turkishKeys[i].style.display = isTurkishKeyboard ? "inline-block" : "none";
    }

    for (let i = 0; i < englishKeys.length; i++) {
        englishKeys[i].style.display = isTurkishKeyboard ? "none" : "inline-block";
    }
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener("DOMContentLoaded", showKeysByKeyboardLanguage);
window.addEventListener("languagechange", showKeysByKeyboardLanguage);

const videoContainer = document.getElementById('videoContainer');
const video = document.createElement('video');
video.src = 'lamborghini.mp4';
video.autoplay = true;
video.loop = true;
video.muted = true;
videoContainer.appendChild(video);
