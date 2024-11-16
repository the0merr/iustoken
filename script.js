const gameContainer = document.getElementById('game-container');
const startButton = document.getElementById('start-button');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');

// Oyun değişkenleri
let score = parseInt(localStorage.getItem('totalScore')) || 0;
let gameTime = 30;
let cooldownTime = 3600; // 1 saat (3600 saniye)
let gameInterval;
let bubbleInterval;
let isCooldownActive = false;

// Toplam puanı ekranda göster
scoreDisplay.textContent = `Total Score: ${score}`;

// Soğuma süresi kontrolü ve başlatma
function checkCooldown() {
    const cooldownEndTime = parseInt(localStorage.getItem('cooldownEndTime')) || 0;
    const currentTime = Math.floor(Date.now() / 1000);

    // Eğer soğuma süresi dolmamışsa geri sayımı başlat
    if (cooldownEndTime > currentTime) {
        const remainingCooldown = cooldownEndTime - currentTime;
        startCooldown(remainingCooldown);
        return true;
    }
    return false;
}

// Oyunu başlatma fonksiyonu
function startGame() {
    if (checkCooldown()) {
        alert("Bekleme süresi devam ediyor. Lütfen bekleyin.");
        return; // Eğer soğuma süresi varsa oyunu başlatma
    }

    // Oyun başlangıcı
    score = parseInt(localStorage.getItem('totalScore')) || 0;
    gameTime = 30;
    startButton.style.display = 'none';
    scoreDisplay.textContent = `Total Score: ${score}`;
    timerDisplay.textContent = `Time: ${gameTime}`;

    // Zamanlayıcıları başlat
    gameInterval = setInterval(updateTimer, 1000);
    bubbleInterval = setInterval(createBubble, 1000);
}

// Zamanlayıcıyı güncelleme fonksiyonu
function updateTimer() {
    gameTime--;
    timerDisplay.textContent = `Time: ${gameTime}`;

    if (gameTime <= 0) {
        endGame();
    }
}

// Balon oluşturma fonksiyonu
function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    const x = Math.random() * (window.innerWidth - 50);
    const y = Math.random() * (window.innerHeight - 50);
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;

    bubble.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = `Total Score: ${score}`;
        bubble.remove();
    });

    gameContainer.appendChild(bubble);
    setTimeout(() => bubble.remove(), 1500);
}

// Oyunu bitirme ve soğuma süresini başlatma fonksiyonu
function endGame() {
    clearInterval(gameInterval);
    clearInterval(bubbleInterval);

    // Toplam puanı kaydet
    localStorage.setItem('totalScore', score);

    // Soğuma süresi ayarla
    const cooldownEndTime = Math.floor(Date.now() / 1000) + cooldownTime;
    localStorage.setItem('cooldownEndTime', cooldownEndTime);

    // Kullanıcıya oyun bitti mesajı göster
    alert(`Oyun Bitti! Toplam Puanınız: ${score}`);

    // Soğuma süresini başlat
    startCooldown(cooldownTime);
}

// Soğuma süresi başlatma fonksiyonu
function startCooldown(remainingTime) {
    isCooldownActive = true;
    startButton.style.display = 'none';
    timerDisplay.textContent = `Cooldown: ${remainingTime} saniye kaldı`;

    const cooldownInterval = setInterval(() => {
        remainingTime--;
        timerDisplay.textContent = `Cooldown: ${remainingTime} saniye kaldı`;

        if (remainingTime <= 0) {
            clearInterval(cooldownInterval);
            isCooldownActive = false;
            startButton.style.display = 'block';
            timerDisplay.textContent = 'Time: 30';
        }
    }, 1000);
}

// Sayfa yüklendiğinde kontrol yap
window.onload = () => {
    scoreDisplay.textContent = `Total Score: ${score}`;
    checkCooldown();
};

// Oyunu başlatma butonu
startButton.addEventListener('click', startGame);
