document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // 1. 播放器 Hover 與平移效果 (保留你的原版設計)
  // ==========================================
  const playerItems = document.querySelectorAll(".player-item");
  let activeIndex = 0; // 預設第一個圖片索引 (player1)

  // 更新播放器位置並放大 active 項目
  function updatePlayerPositions(activeIndex) {
    playerItems.forEach((item, index) => {
      const offset = index - activeIndex; // 計算偏移量

      // 設置樣式: 平移、放大、透明度等
      item.style.transition = "transform 0.5s ease, opacity 0.3s ease";
      item.style.transform = `translateX(${offset * 160}px) scale(${
        index === activeIndex ? 1.5 : 1
      })`;
      item.style.zIndex = index === activeIndex ? 10 : 1;
      item.style.opacity = index === activeIndex ? 1 : 0.6;
    });
  }

  // 初始化播放器位置
  if (playerItems.length > 0) {
    updatePlayerPositions(activeIndex);
  }

  // 綁定滑鼠與點擊事件
  playerItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      updatePlayerPositions(index);
    });

    item.addEventListener("mouseleave", () => {
      // 滑鼠離開時，將最後放大的項目保持為 active
      activeIndex = index;
      updatePlayerPositions(activeIndex);
    });

    // 👉 點擊事件：觸發 Loading 動畫後跳轉 (已修復時間)
    item.addEventListener("click", () => {
      const pageUrl = item.getAttribute("data-href");
      const loadingScreen = document.getElementById("loading");

      if (loadingScreen && pageUrl) {
        loadingScreen.style.display = "flex"; // 顯示 Loading 畫面

        // 等待 1 秒，讓打字動畫播完再跳轉
        setTimeout(() => {
          window.location.href = pageUrl;
        }, 1000);
      } else if (pageUrl) {
        window.location.href = pageUrl; // 如果沒有 loading 元素，直接跳轉
      }
    });
  });

  // ==========================================
  // 2. 背景音樂與音量鍵控制邏輯
  // ==========================================
  const bgm = document.getElementById("bgm");
  const rightVol = document.querySelector(".right-vol");
  const volumeIcon = document.querySelector(".volume_icon");

  if (bgm) {
    // 設定初始音量 (替代你原本寫錯的 myAudio)
    bgm.volume = 0.3;

    // 讀取上一頁儲存的播放時間，讓音樂無縫接軌
    const savedTime = localStorage.getItem("bgmTime");
    if (savedTime) {
      bgm.currentTime = parseFloat(savedTime);
    }

    // 定時儲存當前播放時間
    setInterval(() => {
      localStorage.setItem("bgmTime", bgm.currentTime);
    }, 1000);

    // 點擊整個網頁播放音樂 (只觸發一次，避免重複執行)
    document.body.addEventListener(
      "click",
      function initAudio() {
        if (bgm.paused) {
          bgm.play().catch((err) => console.log("等待互動"));
        }
        document.body.removeEventListener("click", initAudio);
      },
      { once: true },
    );
  }

  // 右上角音量按鈕：點擊切換靜音與圖示
  if (rightVol && bgm && volumeIcon) {
    rightVol.addEventListener("click", () => {
      bgm.muted = !bgm.muted;
      volumeIcon.src = bgm.muted
        ? "images/icon_mute.svg"
        : "images/icon_volume.svg";
    });
  }
});
