document.querySelector("#__layout > main > ticker > div > div.line-2 > div");

// 動態條碼生成，包含造訪人數計算
function generateBarcode() {
  const barcodeElement = document.querySelector(".barcode");
  const barcodeTextElement = document.querySelector(".barcode-text");

  // 更新造訪人數
  const visits = parseInt(localStorage.getItem("visitCount") || "0", 10) + 1;
  localStorage.setItem("visitCount", visits);

  // 更新條碼文字
  const visitNumber = visits.toString().padStart(6, "0");
  barcodeTextElement.textContent = `Vis. ${visitNumber}`;

  // 清空條碼容器
  barcodeElement.innerHTML = "";

  // 固定條碼線條高度
  const barHeight = 100; // 統一的條碼高度

  // 動態生成條碼條紋
  for (let i = 0; i < 60; i++) {
    const bar = document.createElement("div");

    // 隨機寬度
    const barWidth = Math.random() * 3 + 1; // 線條寬度 (1~4px)

    bar.style.width = `${barWidth}px`;
    bar.style.height = `${barHeight}px`; // 固定高度
    bar.style.backgroundColor = "black";
    bar.style.margin = "0 1px"; // 間距
    barcodeElement.appendChild(bar);
  }
}

// 動態時間更新
function updateTime() {
  const timeElement = document.getElementById("time-display");

  setInterval(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
  }, 1000);
}

// 生成磁片下載功能
function downloadDiskImage() {
  const diskImage = document.getElementById("disk-image");
  const link = document.createElement("a");

  // 模擬磁片圖片 (可替換為真實圖片)
  diskImage.style.backgroundImage = 'url("disk-image-placeholder.png")';
  diskImage.style.width = "300px";
  diskImage.style.height = "300px";
  diskImage.style.borderRadius = "50%";

  link.href = "disk-image-placeholder.png"; // 下載的文件路徑
  link.download = "disk-image.png";
  link.click();
}

// 初始化功能
window.onload = function () {
  generateBarcode();
  updateTime();
};
