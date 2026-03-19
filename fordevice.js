// 使用 DOMContentLoaded，確保 HTML 載入完畢後才綁定按鈕，不怕 3D 模型載入太慢
document.addEventListener("DOMContentLoaded", function () {
  // 1. 抓取這頁專屬的元素
  const volumeIcon = document.getElementById("volume-icon");
  const backIcon = document.getElementById("back-icon");
  const bgm = document.getElementById("bgm"); // 直接抓 HTML 裡的音樂

  let isMuted = false;

  // 2. 音量按鈕邏輯
  if (volumeIcon && bgm) {
    volumeIcon.addEventListener("click", () => {
      isMuted = !isMuted;
      bgm.muted = isMuted;

      // 切換圖示
      volumeIcon.src = isMuted
        ? "images/icon_mute.svg"
        : "images/icon_volume.svg";

      console.log(isMuted ? "音樂已靜音" : "音樂恢復播放");
    });
  }

  // 3. 返回按鈕邏輯
  if (backIcon) {
    backIcon.addEventListener("click", () => {
      console.log("準備返回上一頁");
      window.history.back();
    });
  }
});
