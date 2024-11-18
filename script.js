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
    let userPoints = 0;
    let miningReward = 100;
    let miningInterval = 8 * 60 * 60 * 1000; // 8 saat

    // Kullanıcı puanlarını güncelle
    userPointsElement.textContent = `฿ ${userPoints}`;

    // Mining cooldown başlat
    function startMiningCooldown() {
        const startTime = Date.now();
        const endTime = startTime + miningInterval;

        claimButton.disabled = true;

        const timerInterval = setInterval(() => {
            const remainingTime = endTime - Date.now();

            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                claimButton.disabled = false;
                claimButton.textContent = `Claim ฿ ${miningReward}`;
                miningTimerElement.textContent = "Mining complete! Claim your reward.";
            } else {
                const hours = Math.floor(remainingTime / (1000 * 60 * 60));
                const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
                miningTimerElement.textContent = `Next mining available in: ${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
            }
        }, 1000);
    }

    // Claim butonu işlevselliği
    claimButton.addEventListener("click", () => {
        userPoints += miningReward;
        userPointsElement.textContent = `฿ ${userPoints}`;
        claimButton.disabled = true;
        claimButton.textContent = "Claim ฿ 0";
        startMiningCooldown();
    });

    // İlk başlatma
    startMiningCooldown();
});
