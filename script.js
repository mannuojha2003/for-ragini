/* ===========================================
   JAVASCRIPT — Romantic Website for Ragini
=========================================== */

// ─── PARTICLE SYSTEM ───────────────────────────────────────────────
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let W, H;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x    = Math.random() * W;
    this.y    = Math.random() * H;
    this.r    = Math.random() * 2 + 0.5;
    this.dx   = (Math.random() - 0.5) * 0.4;
    this.dy   = (Math.random() - 0.5) * 0.4;
    this.life = Math.random();
    this.maxLife = Math.random() * 0.5 + 0.3;
    const hue = Math.random() < 0.5
      ? `hsl(${330 + Math.random()*40}, 80%, ${60 + Math.random()*30}%)`
      : `hsl(${270 + Math.random()*30}, 70%, ${60 + Math.random()*30}%)`;
    this.color = hue;
  }
  update() {
    this.x    += this.dx;
    this.y    += this.dy;
    this.life += 0.002;
    if (this.life > this.maxLife) this.reset();
  }
  draw() {
    const alpha = Math.sin((this.life / this.maxLife) * Math.PI) * 0.6;
    ctx.globalAlpha = alpha;
    ctx.fillStyle   = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animateParticles);
}
animateParticles();


// ─── FLOATING HEARTS ───────────────────────────────────────────────
const heartsContainer = document.getElementById('heartsContainer');
const heartEmojis = ['💖','💕','💗','💓','💞','🌹','✨'];

function spawnHeart() {
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left     = Math.random() * 100 + 'vw';
  heart.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
  const dur  = Math.random() * 8 + 6;
  const delay = Math.random() * 5;
  heart.style.animationDuration = dur + 's';
  heart.style.animationDelay   = delay + 's';
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), (dur + delay) * 1000);
}

setInterval(spawnHeart, 1200);
for (let i = 0; i < 8; i++) setTimeout(spawnHeart, i * 400);


// ─── FALLING PETALS ────────────────────────────────────────────────
const petalsContainer = document.getElementById('petalsContainer');

function spawnPetal() {
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.style.left = Math.random() * 100 + 'vw';
  const dur   = Math.random() * 6 + 6;
  const delay = Math.random() * 4;
  const hue   = Math.random() < 0.5 ? '#ffb6c1' : '#ff6b9d';
  petal.style.background  = `radial-gradient(ellipse at top, ${hue}, #c2185b)`;
  petal.style.animationDuration = dur + 's';
  petal.style.animationDelay   = delay + 's';
  petal.style.transform  = `rotate(${Math.random()*360}deg)`;
  petalsContainer.appendChild(petal);
  setTimeout(() => petal.remove(), (dur + delay) * 1000);
}

setInterval(spawnPetal, 800);
for (let i = 0; i < 12; i++) setTimeout(spawnPetal, i * 300);


// ─── PAGE NAVIGATION ───────────────────────────────────────────────
let currentPage = 1;

function goToPage(n) {
  const prev = document.getElementById('page' + currentPage);
  const next = document.getElementById('page' + n);
  if (!next) return;

  prev.classList.remove('active');
  setTimeout(() => {
    next.classList.add('active');
    currentPage = n;
  }, 400);
}

// Envelope click → Page 2
const envelopeWrapper = document.getElementById('envelopeWrapper');
envelopeWrapper.addEventListener('click', () => {
  envelopeWrapper.style.transform = 'scale(1.15) rotate(5deg)';
  envelopeWrapper.style.transition = 'transform 0.3s ease';
  setTimeout(() => goToPage(2), 350);
});


// ─── NO BUTTON RUNAWAY ─────────────────────────────────────────────
const btnNo   = document.getElementById('btnNo');
const btnGroup = document.getElementById('btnGroup');
const noHint   = document.getElementById('noHint');
let noClicks   = 0;

const funnyMessages = [
  "Nope, I won't let you say no 😂",
  "The button is on vacation 🏖️",
  "Error 404: No not found 🚫",
  "Nice try though! 😏",
  "Still won't work 😈",
  "Your destiny is YES 💫",
  "Come on... just say yes! 🥺",
];

function runAway(btn) {
  noClicks++;
  noHint.textContent = funnyMessages[Math.min(noClicks - 1, funnyMessages.length - 1)];
  noHint.style.opacity = '1';
  noHint.style.color   = '#ff9ac1';

  const btnRect   = btn.getBoundingClientRect();
  const groupRect = btnGroup.getBoundingClientRect();

  const maxX = window.innerWidth  - btnRect.width  - 20;
  const maxY = window.innerHeight - btnRect.height - 20;

  let randomX, randomY;
  // Keep away from the YES button area
  do {
    randomX = Math.random() * maxX;
    randomY = Math.random() * maxY;
  } while (
    Math.abs(randomX - groupRect.left)   < 140 &&
    Math.abs(randomY - groupRect.top)    < 80
  );

  btn.style.position = 'fixed';
  btn.style.left     = randomX + 'px';
  btn.style.top      = randomY + 'px';
  btn.style.transition = 'left 0.2s ease, top 0.2s ease';
  btn.style.zIndex   = '999';
}


// ─── YES BUTTON ────────────────────────────────────────────────────
function sayYes() {
  // Burst of hearts
  for (let i = 0; i < 20; i++) {
    setTimeout(spawnHeart, i * 80);
    setTimeout(spawnPetal, i * 60);
  }

  // Move no button off screen
  if (btnNo) {
    btnNo.style.position  = 'fixed';
    btnNo.style.left      = '-200px';
    btnNo.style.top       = '-200px';
    btnNo.style.opacity   = '0';
  }

  goToPage(4);
  launchConfetti();
}


// ─── CONFETTI ──────────────────────────────────────────────────────
function launchConfetti() {
  const colors  = ['#e91e63','#ff6b9d','#ffd700','#9b59b6','#ffb6c1','#fff'];
  const shapes  = ['●','♥','✦','★','♦'];
  const confetti = document.getElementById('heartsContainer'); // reuse

  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const piece = document.createElement('div');
      piece.style.cssText = `
        position: fixed;
        left: ${Math.random()*100}vw;
        top: -20px;
        color: ${colors[Math.floor(Math.random()*colors.length)]};
        font-size: ${Math.random()*1.2 + 0.6}rem;
        animation: fallDown ${Math.random()*4+3}s linear forwards;
        pointer-events: none;
        z-index: 999;
      `;
      piece.textContent = shapes[Math.floor(Math.random()*shapes.length)];
      confetti.appendChild(piece);
      setTimeout(() => piece.remove(), 7000);
    }, i * 60);
  }
}


// ─── TOUCH / MOBILE NO BUTTON FIX ─────────────────────────────────
if (btnNo) {
  btnNo.addEventListener('click', function(e) {
    // On tap, also run away
    runAway(this);
    e.preventDefault();
  });
}

// ─── KEYBOARD SHORTCUT ─────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    if (currentPage === 1) envelopeWrapper.click();
    else if (currentPage === 2) goToPage(3);
    else if (currentPage === 3) sayYes();
  }
  if (e.key === 'ArrowRight') {
    if (currentPage < 3) goToPage(currentPage + 1);
  }
});
