const keys = ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ş", "o", "p", "w", "e", "t", "y", "u", ";"];
let keyPlaying = {}; // Basılı tutulan tuşları depolamak için bir nesne

function handleKeyDown(event) {
    const key = event.key.toLowerCase();
    const audioKey = (key === ';') ? 'ş' : key;
    const keyElement = document.getElementById(`key${key.toUpperCase()}`);

    if (keys.includes(key)) {
        if (keyPlaying[audioKey]) return; // Eğer tuş zaten basılı tutuluyorsa, tekrar çalmayı engelle

        const audio = new Audio(`audio/${audioKey}.wav`);
        audio.play();

        keyPlaying[audioKey] = true; // Basılı tutulan tuşu işaretlemek için nesneye ekle

        keyElement.classList.add('flash');
        setTimeout(() => {
            keyElement.classList.remove('flash');
        }, 200);
    }
}

function handleKeyUp(event) {
    const key = event.key.toLowerCase();
    const audioKey = (key === ';') ? 'ş' : key;

    if (keys.includes(key)) {
        keyPlaying[audioKey] = false; // Basılı tutulan tuşun işaretini kaldır
    }
}

function playSound(key) {
    if (keys.includes(key)) {
        if (keyPlaying[key]) return;

        const audio = new Audio(`audio/${key}.wav`);
        audio.play();

        keyPlaying[key] = true;

        audio.addEventListener('ended', () => {
            delete keyPlaying[key];
        });
    }
}

function handleMouseDown(event) {
    const key = event.target.textContent.toLowerCase();
    playSound(key);

    event.target.classList.add('flash');
    setTimeout(() => {
        event.target.classList.remove('flash');
    }, 200);
}

function handleMouseUp(event) {
    const key = event.target.textContent.toLowerCase();

    event.target.classList.remove('flash');
    delete keyPlaying[key];
}

window.addEventListener('mousedown', handleMouseDown);
window.addEventListener('mouseup', handleMouseUp);

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
document.addEventListener('keyup', handleKeyUp);
const keysContainer = document.querySelector('.container');
keysContainer.addEventListener('mousedown', handleMouseDown);
keysContainer.addEventListener('mouseup', handleMouseUp);

document.addEventListener("DOMContentLoaded", showKeysByKeyboardLanguage);
window.addEventListener("languagechange", showKeysByKeyboardLanguage);



