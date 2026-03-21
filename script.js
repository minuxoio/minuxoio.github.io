window.onload = function () {
  // 1. 安全檢查：只有在 Floopy 頁面（找得到這些元素）才執行條碼和時間
  //if (document.querySelector(".barcode")) generateBarcode();
  if (document.getElementById("time-display")) updateTime();

  // 2. 獲取共用的控制按鈕
  const volumeIcon = document.getElementById("volume-icon");
  const backIcon = document.getElementById("back-icon");

  // 3. 【智能音樂控制】判斷當前頁面該用哪種音樂
  let bgm = document.getElementById("bgm"); // 先找 Boombox 的背景音樂
  let isMuted = false;

  if (!bgm) {
    // 動態生成音樂
    bgm = new Audio("audio/test.mp3");
    bgm.loop = true;

    // 設定 Floopy 頁面的專屬音量 (0.2 代表 20%)
    bgm.volume = 0.3;

    // Floopy 頁面需要用戶點擊畫面後才能開始播放
    document.addEventListener("click", function playAudioOnce() {
      bgm
        .play()
        .then(() => console.log("Floopy 音樂開始播放"))
        .catch((e) => console.error("音樂播放失敗:", e));
      document.removeEventListener("click", playAudioOnce);
    });
  }

  // 音量靜音按鈕邏輯 (共用)
  if (volumeIcon && bgm) {
    volumeIcon.addEventListener("click", () => {
      isMuted = !isMuted;
      bgm.muted = isMuted;
      volumeIcon.src = isMuted
        ? "images/icon_mute.svg"
        : "images/icon_volume.svg";
      console.log(isMuted ? "音樂已靜音" : "音樂恢復播放");
    });
  }

  // 返回按鈕邏輯 (共用)
  if (backIcon) {
    backIcon.addEventListener("click", () => {
      window.history.back();
    });
  }

  // 4. Floopy 頁面專屬：磁碟機與下載邏輯
  const floatingText = document.getElementById("floating-text");
  const diskImage = document.getElementById("disk-image");
  const downloadButton = document.getElementById("download-button");

  // 【修復】使用 querySelector 同時支援 class 或 id 的寫法
  const diskDrive =
    document.querySelector(".disk-drive") ||
    document.getElementById("disk-drive");

  if (diskDrive) {
    diskDrive.addEventListener("click", () => {
      console.log("磁碟機被點擊");

      // 隱藏浮動文字
      if (floatingText) {
        floatingText.style.animation = "none";
        floatingText.style.opacity = "0";
        floatingText.style.visibility = "hidden";
        floatingText.style.display = "none";
      }

      // 顯示磁碟與按鈕
      setTimeout(() => {
        if (diskImage) diskImage.classList.add("show");
        setTimeout(() => {
          if (downloadButton) downloadButton.classList.add("show");
        }, 1000);
      }, 1000);
    });
  }

  // 5. 3D Viewer 點擊邏輯
  const viewer = document.querySelector("spline-viewer");
  if (viewer) {
    viewer.addEventListener("pointerdown", () => {
      console.log("3D 模型被點擊");
      setTimeout(() => {
        showImages();
      }, 2397);
    });
  }
};

// ================= 以下保留你原本的 Function 不變 =================

// 動態條碼生成
function generateBarcode() {
  const barcodeElement = document.querySelector(".barcode");
  const barcodeTextElement = document.querySelector(".barcode-text");
  if (!barcodeElement || !barcodeTextElement) return;

  const visits = parseInt(localStorage.getItem("visitCount") || "0", 10) + 1;
  localStorage.setItem("visitCount", visits);
  barcodeTextElement.textContent = `Vis. ${visits.toString().padStart(6, "0")}`;
  barcodeElement.innerHTML = "";
  for (let i = 0; i < 60; i++) {
    const bar = document.createElement("div");
    bar.style.width = `${Math.random() * 3 + 1}px`;
    bar.style.height = "100px";
    bar.style.backgroundColor = "black";
    bar.style.margin = "0 1px";
    barcodeElement.appendChild(bar);
  }
}

// 動態時間更新
function updateTime() {
  const timeDisplay = document.getElementById("time-display");
  if (!timeDisplay) return;

  setInterval(() => {
    const now = new Date();
    timeDisplay.textContent = now.toTimeString().split(" ")[0];
  }, 1000);
}
updateTime();

// 顯示圖片和按鈕
function showImages() {
  const diskImage = document.getElementById("disk-image");
  const downloadButton = document.getElementById("download-button");
  const diskNumber =
    new URLSearchParams(window.location.search).get("disk") || "1";

  if (diskImage) {
    diskImage.style.backgroundImage = `url('./images/qr${diskNumber}.png')`;
    diskImage.classList.add("show");
  }
  if (downloadButton) downloadButton.classList.add("show");
}

// 下載磁碟圖片
function downloadDiskImage() {
  const diskNumber =
    new URLSearchParams(window.location.search).get("disk") || "1";
  const link = document.createElement("a");
  link.href = `./images/qr${diskNumber}.png`;
  link.download = `qr${diskNumber}.png`;
  link.click();
}
