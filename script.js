// HTML elementlerini seçiyoruz
const gameContainer = document.getElementById('game-container');
const startButton = document.getElementById('start-button');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');

// Oyun değişkenleri
let score = 0;
let gameTime = 30;
let gameInterval;
let bubbleInterval;

// Oyunu başlatma fonksiyonu
function startGame() {
    score = 0;  // Puanı sıfırla
    gameTime = 30;  // Süreyi sıfırla
    startButton.style.display = 'none';  // Başlat düğmesini gizle
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${gameTime}`;

    // Zamanlayıcı başlat
    gameInterval = setInterval(updateTimer, 1000);
    bubbleInterval = setInterval(createBubble, 1000);
}

// Zamanlayıcıyı güncelleme fonksiyonu
function updateTimer() {
    gameTime--;  // Süreyi azalt
    timerDisplay.textContent = `Time: ${gameTime}`;

    // Süre bittiğinde oyunu bitir
    if (gameTime <= 0) {
        endGame();
    }
}

// Balon oluşturma fonksiyonu
function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    // Rastgele konum ayarla
    const x = Math.random() * (window.innerWidth - 50);
    const y = Math.random() * (window.innerHeight - 50);
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;

    // Balona tıklanınca puanı arttır ve balonu kaldır
    bubble.addEventListener('click', () => {
        score++;  // Puanı arttır
        scoreDisplay.textContent = `Score: ${score}`;
        bubble.remove();  // Balonu kaldır
    });

    // Balonu ekrana ekle
    gameContainer.appendChild(bubble);

    // Balonun otomatik olarak kaybolması (1.5 saniye sonra)
    setTimeout(() => bubble.remove(), 1500);
}

// Oyunu bitirme fonksiyonu
function endGame() {
    clearInterval(gameInterval);  // Zamanlayıcıları durdur
    clearInterval(bubbleInterval);
    alert(`Oyun Bitti! Toplam Puanınız: ${score}`);
    startButton.style.display = 'block';  // Başlat düğmesini göster
}

// Oyunu başlat
startButton.addEventListener('click', startGame);
