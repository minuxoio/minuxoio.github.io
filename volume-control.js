document.addEventListener("DOMContentLoaded", () => {
  const bgm = document.getElementById("bgm");
  const volumeIcon = document.getElementById("volume-icon");

  let isMuted = false; // 初始化靜音狀態

  // 確保背景音樂自動播放
  bgm.play().catch((error) => {
    console.error("音樂播放被阻止，點擊圖示以播放：", error);
  });

  // 音量圖示點擊事件
  volumeIcon.addEventListener("click", () => {
    isMuted = !isMuted; // 切換靜音狀態
    bgm.muted = isMuted;

    // 切換音量圖示
    volumeIcon.src = isMuted
      ? "images/icon_mute.svg" // 靜音圖示
      : "images/icon_volume.svg"; // 音量圖示

    console.log(isMuted ? "音樂已靜音" : "音樂正在播放");
  });

  // 檢查音樂播放狀態
  bgm.addEventListener("play", () => {
    console.log("背景音樂已播放");
  });

  bgm.addEventListener("pause", () => {
    console.log("背景音樂已暫停");
  });
});
