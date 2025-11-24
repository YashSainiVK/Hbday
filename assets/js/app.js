/* ========================
   EXISTING JS CODE
   ======================== */
/* All your original code remains intact above this line */

/* ========================
   NEW FEATURES ADDED
   ======================== */

// --- Background Canvas & Stars ---
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < CONFIG.canvas.starCount; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height / 2,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2
    });
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
        ctx.fillStyle = CONFIG.canvas.starColor || 'white';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animateStars);
}

animateStars();

// --- Shooting Stars (slower & rarer) ---
function shootingStar() {
    const startX = Math.random() * canvas.width;
    const startY = Math.random() * canvas.height / 2;
    const length = Math.random() * (CONFIG.canvas.shootingStarMaxLength - CONFIG.canvas.shootingStarMinLength) + CONFIG.canvas.shootingStarMinLength;
    const speed = Math.random() * (CONFIG.canvas.shootingStarMaxSpeed - CONFIG.canvas.shootingStarMinSpeed) + CONFIG.canvas.shootingStarMinSpeed;

    let progress = 0;

    function animate() {
        ctx.strokeStyle = CONFIG.canvas.starColor || 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + progress, startY + progress / 2);
        ctx.stroke();
        progress += speed;
        if (progress < length) requestAnimationFrame(animate);
    }

    animate();
}

setInterval(() => {
    if (Math.random() < CONFIG.canvas.shootingStarChance) shootingStar();
}, 100);

// --- Floating Hearts ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.animationDuration = (Math.random() * (CONFIG.heart.floatDurationMax - CONFIG.heart.floatDurationMin) + CONFIG.heart.floatDurationMin) + 's';
    document.getElementById('hearts-container').appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

setInterval(createHeart, CONFIG.heart.spawnInterval);

// --- Music Button Fix ---
const bgMusic = document.getElementById('bg-music');
bgMusic.volume = CONFIG.audio.defaultVolume || 0.5;
bgMusic.loop = CONFIG.audio.loop !== false;

// Play music automatically on first user interaction
document.body.addEventListener('click', () => {
    if (bgMusic.paused) bgMusic.play().catch(() => {});
});

// --- Responsive Canvas ---
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
