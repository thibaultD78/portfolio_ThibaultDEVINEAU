function launchMatrixAnimation(callback) {
  const duration = 1000; // Temps exact en ms pour atteindre le bas
  const fps = 60;
  const intervalTime = 1000 / fps;
  
  const matrix = document.getElementById("matrix");
  matrix.style.display = 'block';
  matrix.style.opacity = '1';
  
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  matrix.innerHTML = '';
  matrix.appendChild(canvas);

  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const fontSize = 16;
  const columns = Math.floor(width / fontSize);
  
  // Vitesse : pixels par frame pour parcourir 'height' en 'duration'
  // Formule : (Hauteur / (Durée / Temps_par_Frame))
  const speedPerFrame = height / (duration / intervalTime);

  // Initialisation des gouttes avec un décalage aléatoire pour l'esthétique
  // mais une progression constante
  const drops = Array(columns).fill(0);

  function drawMatrix() {
    // Fond semi-transparent pour l'effet de traînée
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#0f0";
    ctx.font = `bold ${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = "01".charAt(Math.floor(Math.random() * 2));
      
      // On dessine le texte à la position actuelle (en pixels)
      ctx.fillText(text, i * fontSize, drops[i]);

      // On incrémente la position selon la vitesse calculée
      drops[i] += speedPerFrame;
    }
  }

  const interval = setInterval(drawMatrix, intervalTime);

  // Fermeture précise à la fin du délai
  setTimeout(() => {
    clearInterval(interval);
    matrix.style.transition = "opacity 0.2s ease";
    matrix.style.opacity = "0";
    
    setTimeout(() => {
      matrix.style.display = 'none';
      if (callback) callback();
    }, 200);
  }, duration + 200); // On laisse un petit bonus pour la traînée visuelle
}