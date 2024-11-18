const tg = window.Telegram.WebApp;

// Kullanıcı verilerini Telegram'dan al
tg.ready(() => {
  const user = tg.initDataUnsafe.user;

  // Kullanıcı bilgilerini sayfada göster
  document.getElementById("username").textContent = user.username || "Unknown";
  document.getElementById("user-photo").src = user.photo_url || "default-avatar.png";

  // Token bilgilerini backend'den çek
  fetch(`/api/user-data?user_id=${user.id}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("total-tokens").textContent = `₿ ${data.total_tokens}`;
      initClaimButton(data);
    });
});

// Claim butonu işlemleri
function initClaimButton(data) {
  const claimButton = document.getElementById("claim-button");
  const countdownTimer = document.getElementById("countdown-timer");

  if (data.is_farming) {
    // Geri sayımı başlat
    startCountdown(data.remaining_time);
  } else {
    // Claim yapılabilir
    claimButton.disabled = false;
    claimButton.addEventListener("click", () => {
      fetch(`/api/claim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: tg.initDataUnsafe.user.id }),
      })
        .then((response) => response.json())
        .then((result) => {
          document.getElementById("total-tokens").textContent = `₿ ${result.total_tokens}`;
          startCountdown(8 * 60 * 60); // 8 saatlik kazım başlat
        });
    });
  }
}

// Geri sayımı başlat
function startCountdown(seconds) {
  const countdownTimer = document.getElementById("countdown-timer");
  countdownTimer.style.display = "block";
  let timeLeft = seconds;

  const interval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(interval);
      countdownTimer.style.display = "none";
      document.getElementById("claim-button").disabled = false;
    } else {
      timeLeft--;
      const hours = Math.floor(timeLeft / 3600);
      const minutes = Math.floor((timeLeft % 3600) / 60);
      const seconds = timeLeft % 60;
      countdownTimer.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
  }, 1000);
}
