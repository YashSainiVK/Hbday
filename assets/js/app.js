// --- Preloader ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
});

// --- Navigation Active Links ---
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// --- Start Button ---
const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', () => {
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
});

// --- Background Canvas Stars (Additional JS for smooth animation) ---
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < 80; i++) {
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
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animateStars);
}

animateStars();
// --- Shooting Stars ---
function shootingStar() {
    const startX = Math.random() * canvas.width;
    const startY = Math.random() * canvas.height / 2;
    const length = Math.random() * 150 + 50;
    const speed = Math.random() * 5 + 5;

    let progress = 0;

    function animate() {
        ctx.strokeStyle = 'white';
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
    if (Math.random() < 0.01) shootingStar(); // rare shooting star
}, 100);

// --- Floating Hearts ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

setInterval(createHeart, 500);
// --- Games ---
// Simple Catch the Hearts Game
function startGame(game) {
    if (game === 'catchHearts') {
        alert("Catch the Hearts game coming soon! ❤️");
    } else if (game === 'birthdayQuiz') {
        alert("Birthday Quiz game coming soon! 🎉");
    }
}

// --- Audio Control ---
const bgMusic = document.getElementById('bg-music');
bgMusic.volume = 0.5;
bgMusic.loop = true;

// Play music automatically when user clicks anywhere (required by browsers)
document.body.addEventListener('click', () => {
    if (bgMusic.paused) bgMusic.play();
});

// --- Window Resize Canvas ---
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
