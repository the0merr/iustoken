document.addEventListener("DOMContentLoaded", () => {
    const usernameElement = document.getElementById("username");
    const userPointsElement = document.getElementById("user-points");
    const claimButton = document.getElementById("claim-button");
    const miningTimerElement = document.getElementById("mining-timer");

    // Kullanıcı bilgilerini Telegram Web App'den al
    const tg = window.Telegram.WebApp;
    const username = tg.initDataUnsafe?.user?.username || "unknown";
    usernameElement.textContent = username;

    // Başlangıç değerleri
    let userPoints = 0; // Başlangıç puanı
    let miningReward = 100; // Mining ödülü
    let miningCooldown = 8 * 60 * 60 * 1000; // 8 saatlik süre (milisaniye)
    let cooldownEndTime = null; // Soğuma süresi bitiş zamanı

    // Claim butonunu ve zamanlayıcıyı sıfırla
    function resetClaimButton() {
        claimButton.disabled = false;
        claimButton.textContent = `Claim ฿ ${miningReward}`;
        miningTimerElement.textContent = "Mining complete! Claim your reward.";
    }

    // Claim butonuna tıklama işlemi
    claimButton.addEventListener("click", () => {
        if (cooldownEndTime && Date.now() < cooldownEndTime) {
            alert("Mining devam ediyor! Claim yapabilmek için bekleyin.");
            return;
        }

        // Puanı artır ve güncelle
        userPoints += miningReward;
        userPointsElement.textContent = `฿ ${userPoints}`;
        claimButton.disabled = true;
        claimButton.textContent = "Mining in progress...";
        startMiningCooldown();
    });

    // Mining cooldown işlemini başlat
    function startMiningCooldown() {
        cooldownEndTime = Date.now() + miningCooldown;

        const timerInterval = setInterval(() => {
            const remainingTime = cooldownEndTime - Date.now();

            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                resetClaimButton();
            } else {
                const hours = Math.floor(remainingTime / (1000 * 60 * 60));
                const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
                miningTimerElement.textContent = `Next mining available in: ${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
            }
        }, 1000);
    }

    // İlk başlatma: Claim butonu soğuma süresiyle devreye girsin
    if (!cooldownEndTime || Date.now() >= cooldownEndTime) {
        resetClaimButton();
    } else {
        startMiningCooldown();
    }
});
