// === MATRIX ANIMATION MODULE ===
function launchMatrixAnimation(callback, duration = 2200) {
  const matrix = document.getElementById("matrix");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  matrix.appendChild(canvas);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = "01";
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0f0";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  const interval = setInterval(drawMatrix, 50);

  setTimeout(() => {
    clearInterval(interval);
    matrix.style.display = 'none';
    if (callback) callback();
  }, duration);
}
