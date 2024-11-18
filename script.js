document.addEventListener("DOMContentLoaded", () => {
    const usernameElement = document.getElementById("username");
    const userPointsElement = document.getElementById("user-points");
    const claimButton = document.getElementById("claim-button");
    const miningTimerElement = document.getElementById("mining-timer");

    // Kullanıcı bilgilerini Telegram Web App'den al
    const tg = window.Telegram.WebApp;
    const username = tg.initDataUnsafe.user?.username || "twManage";
    usernameElement.textContent = username;

    // Başlangıç değerleri
    let userPoints = 22196;
    let miningReward = 100;
    let miningInterval = 8 * 60 * 60 * 1000; // 8 saat

    // Kullanıcı puanlarını güncelle
    userPointsElement.textContent = `฿ ${userPoints.toLocaleString()}`;

    // Claim butonu işlevselliği
    claimButton.addEventListener("click", () => {
        userPoints += miningReward;
        userPointsElement.textContent = `฿ ${userPoints.toLocaleString()}`;
        claimButton.disabled = true; // Claim yapıldıktan sonra butonu devre dışı bırak
        startMiningCooldown(); // Yeni mining süresini başlat
    });

    // Mining cooldown başlat
    function startMiningCooldown() {
        const startTime = Date.now();
        const endTime = startTime + miningInterval;

        const timerInterval = setInterval(() => {
            const remainingTime = endTime - Date.now();

            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                claimButton.disabled = false; // Cooldown bittiğinde butonu aktif et
                miningTimerElement.textContent = "Mining complete! Claim your reward.";
            } else {
                const hours = Math.floor(remainingTime / (1000 * 60 * 60));
                const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
                miningTimerElement.textContent = `Mining in progress: ฿ 0.017 (${hours}:${minutes}:${seconds})`;
            }
        }, 1000);
    }

    // İlk başlatma
    startMiningCooldown();
});
