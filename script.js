// LISTA DE LAS 12 FOTOGRAFÍAS CONMEMORATIVAS DE TILVI
const photosData = [
  {
    src: "assets/images/photo-01.jpg",
    caption: "Tu mirada luminosa y esa sonrisa eterna que habita en nuestra alma"
  },
  {
    src: "assets/images/photo-02.jpg",
    caption: "Tus primeros pasos llenos de ternura, inocencia y dulzura"
  },
  {
    src: "assets/images/photo-03.jpg",
    caption: "Una vida guiada siempre por la fe, la pureza y la luz de Dios"
  },
  {
    src: "assets/images/photo-04.jpg",
    caption: "El ejemplo de un amor valiente, incondicional y lleno de esperanza"
  },
  {
    src: "assets/images/photo-05.jpg",
    caption: "La calidez de tus abrazos iluminando cada Navidad en familia"
  },
  {
    src: "assets/images/photo-06.jpg",
    caption: "Cómplice de risas, consejos sabios y cariño verdadero"
  },
  {
    src: "assets/images/photo-07.jpg",
    caption: "Tu presencia haciendo de cada reunión un recuerdo inolvidable"
  },
  {
    src: "assets/images/photo-08.jpg",
    caption: "El calor del amor más tierno que dejaste sembrado en nuestro pecho"
  },
  {
    src: "assets/images/photo-09.jpg",
    caption: "Celebrando la dicha inmensa de haber compartido la vida contigo"
  },
  {
    src: "assets/images/photo-10.jpg",
    caption: "Uniendo corazones y generaciones alrededor de nuestra familia"
  },
  {
    src: "assets/images/photo-11.jpg",
    caption: "Momentos compartidos que hoy atesoramos como un regalo inmenso"
  },
  {
    src: "assets/images/photo-12.jpg",
    caption: "Aquí abajo, tu memoria vive, nos une y florece todos los días"
  }
];

let currentPhotoIndex = 0;
let fadeInterval = null;

// ELEMENTOS DEL DOM
const envelopeScreen = document.getElementById("envelope-screen");
const envelopeTrigger = document.getElementById("envelope-trigger");
const waxSealBtn = document.getElementById("wax-seal-btn");
const audio = document.getElementById("memorial-audio");
const musicPill = document.getElementById("music-pill");
const musicStatusText = document.getElementById("music-status-text");
const vinylDisc = document.getElementById("vinyl-disc");
const toggleAudioBtn = document.getElementById("toggle-audio-btn");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const memorialVideo = document.getElementById("memorial-video");
const videoPlayOverlay = document.getElementById("video-play-overlay");
const videoSection = document.getElementById("video-section");
const lightboxModal = document.getElementById("lightbox-modal");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxIndex = document.getElementById("lightbox-index");
const sendLoveBtn = document.getElementById("send-love-btn");
const heartsCountEl = document.getElementById("hearts-count");

// APERTURA DEL SOBRE INTERACTIVO
function openEnvelope() {
  if (envelopeTrigger.classList.contains("opening")) return;
  envelopeTrigger.classList.add("opening");

  // Iniciar reproducción de "Cuando nos volvamos a encontrar"
  playAudio();

  // Transición suave hacia el homenaje
  setTimeout(() => {
    envelopeScreen.classList.add("opened");
    initParticles();
  }, 900);
}

envelopeTrigger.addEventListener("click", openEnvelope);
waxSealBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  openEnvelope();
});

// CONTROL DE AUDIO DE FONDO
function clearFade() {
  if (fadeInterval) {
    clearInterval(fadeInterval);
    fadeInterval = null;
  }
}

function playAudio() {
  if (!audio) return;
  clearFade();

  // Si el video está reproduciéndose, lo pausamos para no cruzar audios
  if (memorialVideo && !memorialVideo.paused) {
    memorialVideo.pause();
  }

  audio.volume = 1;
  audio.play().then(() => {
    vinylDisc.classList.add("playing");
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
    if (musicPill) musicPill.classList.remove("video-active");
    if (musicStatusText) musicStatusText.textContent = "Carlos Vives • Sonando";
  }).catch((err) => {
    console.log("Audio waiting for user gesture:", err);
  });
}

function pauseAudio(reasonText) {
  if (!audio) return;
  clearFade();
  audio.pause();
  audio.volume = 1;
  vinylDisc.classList.remove("playing");
  playIcon.classList.remove("hidden");
  pauseIcon.classList.add("hidden");
  if (musicStatusText) {
    musicStatusText.textContent = reasonText || "Carlos Vives • En pausa";
  }
}

function fadeOutAndStopAudio(reasonText) {
  if (!audio || audio.paused) {
    if (reasonText && musicStatusText) {
      musicStatusText.textContent = reasonText;
    }
    return;
  }
  clearFade();
  fadeInterval = setInterval(() => {
    if (audio.volume > 0.12) {
      audio.volume = Math.max(0, audio.volume - 0.12);
    } else {
      clearFade();
      audio.pause();
      audio.volume = 1;
      vinylDisc.classList.remove("playing");
      playIcon.classList.remove("hidden");
      pauseIcon.classList.add("hidden");
      if (musicPill) musicPill.classList.add("video-active");
      if (musicStatusText) {
        musicStatusText.textContent = reasonText || "Canción apagada por video";
      }
    }
  }, 50);
}

toggleAudioBtn.addEventListener("click", () => {
  if (audio.paused) {
    playAudio();
  } else {
    pauseAudio("Carlos Vives • En pausa");
  }
});

// CONTROL DEL VIDEO AL FINAL: APAGAR LA CANCIÓN CUANDO SALGA Y CUANDO LO REPRODUZCAN
if (memorialVideo) {
  // 1. Al tocar la capa de bienvenida del video: apagar canción inmediatamente y reproducir video con sonido
  if (videoPlayOverlay) {
    videoPlayOverlay.addEventListener("click", () => {
      pauseAudio("Canción apagada • Video activo");
      if (musicPill) musicPill.classList.add("video-active");
      videoPlayOverlay.classList.add("hidden-overlay");
      memorialVideo.muted = false;
      memorialVideo.volume = 1;
      memorialVideo.play().catch((err) => {
        console.log("Video play error:", err);
      });
    });
  }

  // 2. Si el usuario inicia el video desde los controles nativos, apagar la canción al instante
  memorialVideo.addEventListener("play", () => {
    pauseAudio("Canción apagada • Video activo");
    if (musicPill) musicPill.classList.add("video-active");
    if (videoPlayOverlay) {
      videoPlayOverlay.classList.add("hidden-overlay");
    }
  });

  memorialVideo.addEventListener("playing", () => {
    if (audio && !audio.paused) {
      pauseAudio("Canción apagada • Video activo");
    }
  });

  // 3. Cuando aparece la sección del video al último en pantalla, apagar suavemente la canción
  if ("IntersectionObserver" in window && videoSection) {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            if (audio && !audio.paused) {
              fadeOutAndStopAudio("Canción apagada • Sección de video");
            }
          }
        });
      },
      { threshold: [0.55] }
    );
    videoObserver.observe(videoSection);
  }
}

// LIGHTBOX MODAL PARA LAS 12 FOTOGRAFÍAS
function openLightbox(index) {
  currentPhotoIndex = index;
  updateLightboxContent();
  lightboxModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightboxModal.classList.remove("active");
  document.body.style.overflow = "";
}

function updateLightboxContent() {
  const photo = photosData[currentPhotoIndex];
  if (!photo) return;
  lightboxImg.src = photo.src;
  lightboxCaption.textContent = photo.caption;
  lightboxIndex.textContent = `Recuerdo ${currentPhotoIndex + 1} de ${photosData.length}`;
}

function nextPhoto() {
  currentPhotoIndex = (currentPhotoIndex + 1) % photosData.length;
  updateLightboxContent();
}

function prevPhoto() {
  currentPhotoIndex = (currentPhotoIndex - 1 + photosData.length) % photosData.length;
  updateLightboxContent();
}

// Eventos de teclado para Lightbox
window.addEventListener("keydown", (e) => {
  if (!lightboxModal.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextPhoto();
  if (e.key === "ArrowLeft") prevPhoto();
});

// Soporte táctil Swipe para móviles en Lightbox
let touchStartX = 0;
let touchEndX = 0;

lightboxModal.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightboxModal.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const swipeThreshold = 50;
  if (touchEndX < touchStartX - swipeThreshold) {
    nextPhoto();
  }
  if (touchEndX > touchStartX + swipeThreshold) {
    prevPhoto();
  }
}

// Clic fuera de la foto para cerrar
lightboxModal.addEventListener("click", (e) => {
  if (e.target === lightboxModal) closeLightbox();
});

// DETALLE INTERACTIVO: DESTELLOS Y CORAZONES AL CIELO
let loveCount = parseInt(localStorage.getItem("rym_d002_hearts") || "0", 10);
heartsCountEl.textContent = loveCount;

sendLoveBtn.addEventListener("click", () => {
  loveCount++;
  heartsCountEl.textContent = loveCount;
  localStorage.setItem("rym_d002_hearts", loveCount.toString());

  const rect = sendLoveBtn.getBoundingClientRect();
  for (let i = 0; i < 7; i++) {
    createFloatingHeart(rect.left + rect.width / 2 + (Math.random() * 70 - 35), rect.top);
  }
});

function createFloatingHeart(x, y) {
  const heart = document.createElement("div");
  heart.innerHTML = `<svg class="w-6 h-6 text-rose-deep fill-current drop-shadow-md" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
  heart.style.position = "fixed";
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "1000";
  heart.style.transition = "transform 1.9s ease-out, opacity 1.9s ease-out";
  heart.style.transform = `scale(${0.6 + Math.random() * 0.8}) rotate(${Math.random() * 40 - 20}deg)`;

  document.body.appendChild(heart);

  requestAnimationFrame(() => {
    heart.style.transform = `translate(${(Math.random() - 0.5) * 130}px, -${150 + Math.random() * 110}px) scale(1.3) rotate(${Math.random() * 60 - 30}deg)`;
    heart.style.opacity = "0";
  });

  setTimeout(() => {
    heart.remove();
  }, 2000);
}

// LIENZO DE PARTÍCULAS: PÉTALOS Y DESTELLOS DORADOS
function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const totalPetals = window.innerWidth < 768 ? 16 : 26;

  for (let i = 0; i < totalPetals; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 7 + 5.5,
      speedX: (Math.random() - 0.5) * 1.1,
      speedY: Math.random() * 1.1 + 0.7,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.025,
      oscillation: Math.random() * 0.02 + 0.01,
      color: Math.random() > 0.45 ? "rgba(245, 212, 133, 0.65)" : "rgba(230, 118, 150, 0.5)",
      type: Math.random() > 0.35 ? "petal" : "sparkle"
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.y += p.speedY;
      p.x += Math.sin(p.y * p.oscillation) * 0.8 + p.speedX;
      p.rotation += p.rotationSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;

      if (p.type === "petal") {
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 1.5, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
