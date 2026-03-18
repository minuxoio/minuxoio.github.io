window.onload = function () {
  generateBarcode();
  updateTime();

  // 定義所有需要用到的 DOM 元素
  const floatingText = document.getElementById("floating-text");
  const diskImage = document.getElementById("disk-image");
  const downloadButton = document.getElementById("download-button");
  const diskDrive = document.getElementById("disk-drive");
  const volumeIcon = document.getElementById("volume-icon");
  const backIcon = document.getElementById("back-icon");

  let isMuted = false; // 音量靜音狀態
  const audio = new Audio("audio/test.mp3");
  audio.loop = true;

  // 用戶互動後播放音樂，確保瀏覽器允許
  document.addEventListener("click", function playAudioOnce() {
    audio
      .play()
      .then(() => {
        console.log("音樂開始播放");
      })
      .catch((error) => {
        console.error("音樂播放失敗:", error);
      });
    document.removeEventListener("click", playAudioOnce);
  });

  // 音量按鈕邏輯
  if (volumeIcon) {
    volumeIcon.addEventListener("click", () => {
      isMuted = !isMuted;
      audio.muted = isMuted;

      // 切換圖示
      volumeIcon.src = isMuted
        ? "images/icon_mute.svg"
        : "images/icon_volume.svg";
      console.log(isMuted ? "音樂已靜音" : "音樂恢復播放");
    });
  }

  // 返回按鈕邏輯
  if (backIcon) {
    backIcon.addEventListener("click", () => {
      console.log("返回上一頁");
      window.history.back();
    });
  }

  // 點擊磁碟機的事件
  if (diskDrive) {
    diskDrive.addEventListener("click", () => {
      console.log("磁碟機被點擊");

      // 浮動文字淡出
      if (floatingText) {
        floatingText.style.animation = "none";
        floatingText.style.opacity = "0";
        floatingText.style.visibility = "hidden";
        floatingText.style.display = "none";
      }

      // 顯示磁碟和下載按鈕
      setTimeout(() => {
        diskImage.classList.add("show");
        setTimeout(() => {
          downloadButton.classList.add("show");
          console.log("下載按鈕已顯示");
        }, 1000);
      }, 1000);
    });
  }

  // 3D Viewer 點擊邏輯
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

// 動態條碼生成
function generateBarcode() {
  const barcodeElement = document.querySelector(".barcode");
  const barcodeTextElement = document.querySelector(".barcode-text");
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
  setInterval(() => {
    const now = new Date();
    document.getElementById("time-display").textContent = now
      .toTimeString()
      .split(" ")[0];
  }, 1000);
}

// 顯示圖片和按鈕
function showImages() {
  const diskImage = document.getElementById("disk-image");
  const downloadButton = document.getElementById("download-button");
  const diskNumber =
    new URLSearchParams(window.location.search).get("disk") || "1";

  diskImage.style.backgroundImage = `url('./images/qr${diskNumber}.png')`;
  diskImage.classList.add("show");
  downloadButton.classList.add("show");
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
