/* FILE: assets/js/app.js */

// Global state
let currentSection = 0;
let currentTrackIndex = 0;
let currentTrack = null;
let audioElement = null;
const sections = ['section-home', 'section-gallery', 'section-letter', 'section-games', 'section-gifts', 'section-gift'];

// Preloader
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  
  // Show preloader for ~1 second
  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      preloader.style.display = 'none';
      document.body.classList.add('loaded');
    }, 500);
  }, 1000);
}

// Floating Compliments
function initFloatingCompliments() {
  const container = document.getElementById('floatingCompliments');
  if (!container) return;
  
  const compliments = ['Beautiful', 'My Person', 'Cutest', 'Pretty', 'Love', 'Adorable', 'Amazing', 'Special', 'Wonderful', 'Perfect'];
  
  function createCompliment() {
    const compliment = document.createElement('div');
    compliment.className = 'floating-compliment';
    compliment.textContent = compliments[Math.floor(Math.random() * compliments.length)];
    
    const startX = Math.random() * 100;
    const startY = 100 + Math.random() * 20;
    const duration = 15 + Math.random() * 10;
    const opacity = 0.15 + Math.random() * 0.1;
    const randomX = (Math.random() * 100 - 50);
    const randomRotate = (Math.random() * 20 - 10);
    
    compliment.style.cssText = `
      position: fixed;
      left: ${startX}%;
      top: ${startY}%;
      font-size: ${18 + Math.random() * 8}px;
      color: rgba(255, 182, 193, ${opacity});
      font-family: 'Dancing Script', cursive;
      font-weight: 500;
      pointer-events: none;
      z-index: 1;
      opacity: ${opacity};
      --random-x: ${randomX};
      --random-rotate: ${randomRotate};
      animation: floatCompliment ${duration}s linear infinite;
    `;
    
    container.appendChild(compliment);
    
    setTimeout(() => {
      compliment.remove();
    }, duration * 1000);
  }
  
  // Create compliments periodically
  setInterval(() => {
    if (Math.random() > 0.7) {
      createCompliment();
    }
  }, 3000);
  
  // Initial compliments
  for (let i = 0; i < 5; i++) {
    setTimeout(() => createCompliment(), i * 2000);
  }
}

// Smooth Page Transitions
function initPageTransitions() {
  // Fade in on load
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
  
  // Fade out on link clicks
  document.querySelectorAll('a, .btn-next, .cta-button').forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.href && !this.href.includes('#')) {
        e.preventDefault();
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '0';
        setTimeout(() => {
          window.location.href = this.href;
        }, 300);
      }
    });
  });
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // 🎂 BIRTHDAY LOCK FEATURE
  // ============================================
  // This will lock all pages except the countdown timer until the birthday date
  // Currently DISABLED for testing - uncomment the code below to enable
  // ============================================
  
  /*
  function checkBirthdayLock() {
    if (typeof CONFIG === 'undefined' || !CONFIG.birthdayISO) return false;
    
    const now = new Date();
    const birthday = new Date(CONFIG.birthdayISO);
    const diff = birthday - now;
    
    // If birthday hasn't arrived yet, lock the website
    if (diff > 0) {
      // Hide all sections except home
      document.querySelectorAll('.page-section').forEach((section, index) => {
        if (index !== 0) { // Keep home section (index 0) visible
          section.style.display = 'none';
        }
      });
      
      // Disable navigation buttons
      const nextButtons = document.querySelectorAll('.btn-next, .cta-button');
      nextButtons.forEach(btn => {
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.5';
        btn.title = 'Wait until your special day! 🎂';
      });
      
      // Show lock message
      const lockMessage = document.createElement('div');
      lockMessage.id = 'birthdayLockMessage';
      lockMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(107, 33, 168, 0.95);
        backdrop-filter: blur(20px);
        padding: 3rem;
        border-radius: 30px;
        text-align: center;
        z-index: 10000;
        border: 3px solid rgba(232, 121, 249, 0.5);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        color: white;
        max-width: 500px;
      `;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      lockMessage.innerHTML = `
        <h2 style="font-size: 2rem; margin-bottom: 1rem; font-family: 'Playfair Display', serif;">
          Waiting for Your Special Day!
        </h2>
        <div style="font-size: 1.5rem; margin: 1.5rem 0; padding: 1rem; background: rgba(232, 121, 249, 0.2); border-radius: 15px; font-weight: 600;">
          ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds
        </div>
        <p style="font-size: 1.2rem; line-height: 1.8;">
          The full website will unlock on your birthday! 💜
        </p>
      `;
      document.body.appendChild(lockMessage);
      
      return true; // Website is locked
    } else {
      // Birthday has arrived - unlock everything
      document.querySelectorAll('.page-section').forEach(section => {
        section.style.display = '';
      });
      
      const nextButtons = document.querySelectorAll('.btn-next, .cta-button');
      nextButtons.forEach(btn => {
        btn.style.pointerEvents = '';
        btn.style.opacity = '';
        btn.title = '';
      });
      
      const lockMessage = document.getElementById('birthdayLockMessage');
      if (lockMessage) {
        lockMessage.remove();
      }
      
      return false; // Website is unlocked
    }
  }
  
  // Check lock on page load
  if (checkBirthdayLock()) {
    // If locked, prevent initialization of other sections
    initCustomCursor();
    initModal();
    initMusicPlayer();
    initHomePage();
    updateProgress();
    return; // Don't initialize other sections
  }
  */
  
  // ============================================
  // NORMAL INITIALIZATION (Lock is disabled)
  // ============================================
  initPreloader();
  initFloatingCompliments();
  initPageTransitions();
  initCustomCursor();
  initNavigation();
  initModal();
  initMusicPlayer();
  initHomePage();
  initGallery();
  initLetter();
  initGames();
  initGift();
  initGiftBoxes();
  updateProgress();
});

// ============================================
// CUSTOM CURSOR
// ============================================
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const trail = document.querySelector('.cursor-trail');
  
  if (!cursor || !trail) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let trailX = 0;
  let trailY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Smooth cursor movement
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    trailX += (mouseX - trailX) * 0.05;
    trailY += (mouseY - trailY) * 0.05;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    trail.style.left = trailX + 'px';
    trail.style.top = trailY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // Hover effects - include music player elements
  const hoverElements = document.querySelectorAll('button, a, .gallery-item, .picker-heart, .memory-card, .quiz-option, .music-btn, .music-toggle, .music-playlist-mini-item, .floating-music-btn, #musicProgress, #musicVolume');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
  
  // Trail activation
  document.addEventListener('mousemove', () => {
    trail.classList.add('active');
    setTimeout(() => trail.classList.remove('active'), 300);
  });
}

// Navigation
function initNavigation() {
  showSection(0);
}

// ============================================
// 🎂 BIRTHDAY LOCK CHECK
// ============================================
// Set to true to enable lock, false to disable (for testing)
const BIRTHDAY_LOCK_ENABLED = false; // Change to true to enable lock

function isBirthdayLocked() {
  if (!BIRTHDAY_LOCK_ENABLED) return false;
  if (typeof CONFIG === 'undefined' || !CONFIG.birthdayISO) return false;
  
  const now = new Date();
  const birthday = new Date(CONFIG.birthdayISO);
  const diff = birthday - now;
  
  return diff > 0; // Locked if birthday hasn't arrived
}

function showSection(index) {
  if (index < 0 || index >= sections.length) return;
  
  // Check if website is locked (only allow home page - index 0)
  if (isBirthdayLocked() && index !== 0) {
    // Show lock message with countdown
    const now = new Date();
    const birthday = new Date(CONFIG.birthdayISO);
    const diff = birthday - now;
    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      showModal(
        'Waiting for Your Special Day!',
        `<div style="text-align: center;">
          <div style="font-size: 1.3rem; margin: 1.5rem 0; padding: 1rem; background: rgba(232, 121, 249, 0.2); border-radius: 15px; font-weight: 600;">
            ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds
          </div>
          <p>The full website will unlock on your birthday! 💜</p>
        </div>`,
        [{ text: 'OK', onclick: 'closeModal()' }]
      );
    }
    return; // Don't allow navigation
  }
  
  // Fade out current section
  const currentSectionEl = document.getElementById(sections[currentSection]);
  if (currentSectionEl) {
    currentSectionEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    currentSectionEl.style.opacity = '0';
    currentSectionEl.style.transform = 'translateY(-20px)';
  }
  
  setTimeout(() => {
    currentSection = index;
    
    document.querySelectorAll('.page-section').forEach(section => {
      section.classList.remove('active');
    });
    
    const newSectionEl = document.getElementById(sections[index]);
    if (newSectionEl) {
      newSectionEl.classList.add('active');
      newSectionEl.style.opacity = '0';
      newSectionEl.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        newSectionEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        newSectionEl.style.opacity = '1';
        newSectionEl.style.transform = 'translateY(0)';
        newSectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
    
    updateProgress();
    // Sound removed as requested
  }, 400);
}

function nextSection() {
  const next = (currentSection + 1) % sections.length;
  showSection(next);
}

function updateProgress() {
  const progress = ((currentSection + 1) / sections.length) * 100;
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    progressBar.style.width = progress + '%';
  }
}

// Custom Modal System
function initModal() {
  const modal = document.getElementById('customModal');
  const closeBtn = document.querySelector('.modal-close');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function showModal(title, message, buttons = []) {
  const modal = document.getElementById('customModal');
  const modalBody = document.getElementById('modalBody');
  
  if (!modal || !modalBody) return;
  
  let html = `<h3>${title}</h3><p>${message}</p>`;
  
  if (buttons.length > 0) {
    html += '<div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center;">';
    buttons.forEach(btn => {
      html += `<button class="btn" onclick="${btn.onclick}">${btn.text}</button>`;
    });
    html += '</div>';
  } else {
    html += '<div style="margin-top: 1.5rem;"><button class="btn" onclick="closeModal()">OK</button></div>';
  }
  
  modalBody.innerHTML = html;
  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('customModal');
  if (modal) modal.classList.remove('active');
}

// Music Player - Available Everywhere
function initMusicPlayer() {
  if (typeof CONFIG === 'undefined' || !CONFIG.audioTracks || CONFIG.audioTracks.length === 0) {
    const musicPlayer = document.getElementById('musicPlayer');
    if (musicPlayer) musicPlayer.style.display = 'none';
    return;
  }
  
  audioElement = document.createElement('audio');
  audioElement.addEventListener('ended', () => {
    nextTrack();
  });
  
  // Handle audio errors (especially for 3rd track)
  audioElement.addEventListener('error', (e) => {
    console.log('Audio error:', e);
    // If current track fails, try next one
    if (currentTrackIndex < CONFIG.audioTracks.length - 1) {
      setTimeout(() => {
        nextTrack();
      }, 500);
    }
  });
  
  // Close player by default
  const musicPlayerBody = document.getElementById('musicPlayerBody');
  const musicToggle = document.getElementById('musicToggle');
  const musicPlayer = document.getElementById('musicPlayer');
  if (musicPlayerBody) {
    musicPlayerBody.classList.add('hidden');
  }
  if (musicToggle) {
    musicToggle.textContent = '+';
  }
  if (musicPlayer) {
    musicPlayer.classList.add('collapsed');
  }
  
  // Initialize playlist
  const playlistMini = document.getElementById('musicPlaylistMini');
  if (playlistMini) {
    CONFIG.audioTracks.forEach((track, index) => {
      const item = document.createElement('div');
      item.className = 'music-playlist-mini-item';
      item.textContent = track.title;
      item.addEventListener('click', () => {
        playTrackByIndex(index);
      });
      playlistMini.appendChild(item);
    });
  }
  
  // Volume control - Set default volume (no slider UI)
  if (audioElement) {
    audioElement.volume = 0.3; // 30% default volume
  }
  
  updateMusicPlayer();
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function toggleMusicPlayer() {
  const player = document.getElementById('musicPlayer');
  const body = document.getElementById('musicPlayerBody');
  const toggle = document.getElementById('musicToggle');
  
  if (player && body && toggle) {
    if (body.classList.contains('hidden')) {
      body.classList.remove('hidden');
      player.classList.remove('collapsed');
      toggle.textContent = '−';
    } else {
      body.classList.add('hidden');
      player.classList.add('collapsed');
      toggle.textContent = '+';
    }
  }
}

function togglePlayback() {
  if (!audioElement) {
    if (CONFIG.audioTracks && CONFIG.audioTracks.length > 0) {
      playTrackByIndex(0);
      return;
    }
    return;
  }
  
  const playBtn = document.getElementById('musicPlayBtn');
  
  // If no track is loaded, load the first one
  if (!currentTrack && CONFIG.audioTracks && CONFIG.audioTracks.length > 0) {
    playTrackByIndex(0);
    // After loading, play it
    setTimeout(() => {
      if (audioElement && audioElement.src) {
        audioElement.play().catch(err => {
          console.log('Playback error:', err);
        });
        if (playBtn) playBtn.textContent = '⏸';
        const floatingIcon = document.getElementById('floatingMusicIcon');
        if (floatingIcon) floatingIcon.textContent = '🎵';
      }
    }, 100);
    return;
  }
  
  if (audioElement.paused) {
    audioElement.play().catch(err => {
      console.log('Playback error:', err);
      // If error, try to reload the track
      if (currentTrack) {
        audioElement.src = currentTrack.src;
        audioElement.load();
        audioElement.play().catch(e => console.log('Retry playback error:', e));
      }
    });
    if (playBtn) playBtn.textContent = '⏸';
    // Update floating widget
    const floatingIcon = document.getElementById('floatingMusicIcon');
    if (floatingIcon) floatingIcon.textContent = '🎵';
  } else {
    audioElement.pause();
    if (playBtn) playBtn.textContent = '▶';
    // Update floating widget
    const floatingIcon = document.getElementById('floatingMusicIcon');
    if (floatingIcon) floatingIcon.textContent = '🎵';
  }
}

function playTrackByIndex(index) {
  if (!CONFIG.audioTracks || index < 0 || index >= CONFIG.audioTracks.length) return;
  
  currentTrackIndex = index;
  currentTrack = CONFIG.audioTracks[index];
  playTrack(currentTrack);
  
  // Update active item
  document.querySelectorAll('.music-playlist-mini-item').forEach((item, i) => {
    if (i === index) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

function playTrack(track) {
  if (!audioElement) return;
  
  audioElement.src = track.src;
  audioElement.load();
  
  // Don't auto-play - wait for user to click play button
  // audioElement.play(); // Removed auto-play
  
  const playBtn = document.getElementById('musicPlayBtn');
  if (playBtn) playBtn.textContent = '▶';
  
  // Reset progress bar
  const progressSlider = document.getElementById('musicProgress');
  const progressFilled = document.getElementById('musicProgressFilled');
  const progressDot = document.getElementById('musicProgressDot');
  const currentTimeDisplay = document.getElementById('musicCurrentTime');
  
  if (progressSlider) progressSlider.value = 0;
  if (progressFilled) progressFilled.style.width = '0%';
  if (progressDot) progressDot.style.left = '0%';
  if (currentTimeDisplay) currentTimeDisplay.textContent = '0:00';
  
  // Update floating widget
  const floatingIcon = document.getElementById('floatingMusicIcon');
  if (floatingIcon) floatingIcon.textContent = '🎵';
  
  updateMusicPlayer();
}

function nextTrack() {
  if (!CONFIG.audioTracks) return;
  const next = (currentTrackIndex + 1) % CONFIG.audioTracks.length;
  playTrackByIndex(next);
}

function previousTrack() {
  if (!CONFIG.audioTracks) return;
  const prev = currentTrackIndex === 0 ? CONFIG.audioTracks.length - 1 : currentTrackIndex - 1;
  playTrackByIndex(prev);
}

function updateMusicPlayer() {
  const trackTitle = document.getElementById('musicTrackTitle');
  if (trackTitle) {
    trackTitle.textContent = currentTrack ? currentTrack.title : 'No track selected';
  }
}

// Home Page - Cartoonish Birthday Theme
function initHomePage() {
  if (typeof CONFIG === 'undefined') return;
  
  const heroMainTitle = document.getElementById('heroMainTitle');
  if (heroMainTitle) {
    heroMainTitle.textContent = 'Happy Birthday!';
  }
  
  const heroName = document.getElementById('heroName');
  if (heroName && CONFIG.herName) {
    heroName.textContent = CONFIG.herName;
  }
  
  // Add name message if missing
  if (CONFIG.herName && CONFIG.messages && CONFIG.messages.length > 0) {
    const heroTextContainer = document.querySelector('.hero-text-container');
    if (heroTextContainer) {
      // Check if name message already exists
      let nameMessageExists = false;
      heroTextContainer.querySelectorAll('p').forEach(p => {
        if (p.textContent.includes(CONFIG.herName)) {
          nameMessageExists = true;
        }
      });
      
      if (!nameMessageExists && CONFIG.messages[0]) {
        const nameMessage = document.createElement('p');
        nameMessage.className = 'hero-name-message';
        nameMessage.style.cssText = 'font-size: 1.3rem; color: rgba(255, 255, 255, 0.95); text-shadow: 0 2px 15px rgba(0, 0, 0, 0.3); margin-bottom: 1rem; font-weight: 400; font-style: italic;';
        nameMessage.textContent = `${CONFIG.messages[0]} ${CONFIG.herName}`;
        const heroNameEl = document.getElementById('heroName');
        if (heroNameEl && heroNameEl.nextSibling) {
          heroNameEl.parentNode.insertBefore(nameMessage, heroNameEl.nextSibling);
        } else if (heroNameEl) {
          heroNameEl.parentNode.appendChild(nameMessage);
        }
      }
    }
  }
  
  const heroSubtitleText = document.getElementById('heroSubtitleText');
  if (heroSubtitleText && CONFIG.subtitle) {
    heroSubtitleText.textContent = CONFIG.subtitle;
  }
  
  // Set birthday doodle art background instead of nature pic
  const heroBackground = document.getElementById('heroBackground');
  if (heroBackground) {
    // Create birthday doodle pattern background
    heroBackground.style.background = `
      radial-gradient(circle at 20% 30%, rgba(255, 182, 193, 0.3) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(255, 192, 203, 0.25) 0%, transparent 45%),
      radial-gradient(circle at 50% 50%, rgba(255, 228, 225, 0.2) 0%, transparent 50%),
      linear-gradient(135deg, #ff9ec5 0%, #ffc0d9 25%, #ffe5f0 50%, #fff0f5 75%, #ffe8d6 100%)
    `;
    heroBackground.style.backgroundSize = 'cover';
    heroBackground.style.backgroundPosition = 'center';
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
  createFloatingElements();
  createSparkles();
  createHeroParticles();
  // Cake cutting feature removed entirely
  initAestheticEnhancements();
  initPageAnimations();
  initMusicFadeIn();
  initShootingStars();
  initBirthdayAnimations();
  initBirthdayLockMessage();
  fixFirstPageVisibility();
  initScrollReveal();
  initParallax();
}

// Scroll Reveal using Intersection Observer
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);
  
  // Observe gallery items and section content
  document.querySelectorAll('.gallery-item, .section-content > *').forEach(el => {
    observer.observe(el);
  });
}

// Subtle Parallax Effect
function initParallax() {
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-hearts, .floating-stars, .birthday-element');
    
    parallaxElements.forEach((el, index) => {
      const speed = 0.1 + (index % 3) * 0.05;
      const yPos = -(scrolled * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
}

function createHeroParticles() {
  const particlesContainer = document.getElementById('heroParticles');
  if (!particlesContainer) return;
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (10 + Math.random() * 10) + 's';
    particlesContainer.appendChild(particle);
  }
}

function updateCountdown() {
  if (typeof CONFIG === 'undefined' || !CONFIG.birthdayISO) return;
  
  const countdownEl = document.getElementById('countdownText');
  if (!countdownEl) return;
  
  const now = new Date();
  const birthday = new Date(CONFIG.birthdayISO);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const birthdayThisYear = new Date(now.getFullYear(), birthday.getMonth(), birthday.getDate());
  const birthdayNextYear = new Date(now.getFullYear() + 1, birthday.getMonth(), birthday.getDate());
  
  // Check if it's the birthday today
  if (today.getTime() === birthdayThisYear.getTime()) {
    // Countdown to midnight
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const diff = midnight - now;
    
    if (diff > 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      countdownEl.textContent = `Time left for your birthday today: ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
      countdownEl.style.fontSize = '1.3rem';
      countdownEl.style.fontWeight = '500';
    } else {
      // Past midnight, show next year
      const diffNext = birthdayNextYear - now;
      const days = Math.floor(diffNext / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffNext % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffNext % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffNext % (1000 * 60)) / 1000);
      countdownEl.textContent = `Time until your next birthday: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
      countdownEl.style.fontSize = '1.3rem';
      countdownEl.style.fontWeight = '500';
    }
    return;
  }
  
  // Check if birthday has passed this year
  if (now > birthdayThisYear) {
    // Show countdown to next year
    const diff = birthdayNextYear - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    countdownEl.textContent = `Time until your next birthday: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    countdownEl.style.fontSize = '1.3rem';
    countdownEl.style.fontWeight = '500';
    return;
  }
  
  // Before birthday - show countdown
  const diff = birthdayThisYear - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  countdownEl.textContent = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds until your special day!`;
  countdownEl.style.fontSize = '1.3rem';
  countdownEl.style.fontWeight = '500';
}

function createFloatingElements() {
  const heartsContainer = document.querySelector('.floating-hearts');
  const starsContainer = document.querySelector('.floating-stars');
  
  if (!heartsContainer || !starsContainer) return;
  
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.textContent = ['💜', '💖', '💕', '💗'][Math.floor(Math.random() * 4)];
      heart.style.position = 'absolute';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.top = '100%';
      heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
      heart.style.opacity = '0.4';
      heart.style.animation = `float-up ${15 + Math.random() * 10}s infinite linear`;
      heart.style.animationDelay = Math.random() * 5 + 's';
      heartsContainer.appendChild(heart);
    }, i * 500);
  }
}

function createSparkles() {
  const sparklesContainer = document.getElementById('sparkles');
  if (!sparklesContainer) return;
  
  for (let i = 0; i < 30; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 3 + 's';
    sparkle.style.animationDuration = (2 + Math.random() * 2) + 's';
    sparklesContainer.appendChild(sparkle);
  }
}

// Gallery - Vertical One by One
function initGallery() {
  if (typeof CONFIG === 'undefined' || !CONFIG.photos) return;
  
  const galleryContainer = document.getElementById('galleryContainer');
  if (!galleryContainer) return;
  
  CONFIG.photos.forEach((photoUrl, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    const img = document.createElement('img');
    img.src = photoUrl;
    img.alt = `Photo ${index + 1}`;
    img.loading = 'lazy';
    
    item.appendChild(img);
    item.addEventListener('click', () => openLightbox(index));
    galleryContainer.appendChild(item);
  });
  
  document.addEventListener('keydown', (e) => {
    const lightbox = document.querySelector('.lightbox.active');
    if (!lightbox) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

let currentLightboxIndex = 0;

function openLightbox(index) {
  if (typeof CONFIG === 'undefined' || !CONFIG.photos) return;
  
  currentLightboxIndex = index;
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;
  
  const img = lightbox.querySelector('img');
  if (img) {
    img.src = CONFIG.photos[index];
    img.alt = `Photo ${index + 1}`;
  }
  
  lightbox.classList.add('active');
  
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  
  if (closeBtn) closeBtn.onclick = closeLightbox;
  if (prevBtn) prevBtn.onclick = () => navigateLightbox(-1);
  if (nextBtn) nextBtn.onclick = () => navigateLightbox(1);
}

function closeLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) lightbox.classList.remove('active');
}

function navigateLightbox(direction) {
  if (typeof CONFIG === 'undefined' || !CONFIG.photos) return;
  
  currentLightboxIndex += direction;
  if (currentLightboxIndex < 0) currentLightboxIndex = CONFIG.photos.length - 1;
  if (currentLightboxIndex >= CONFIG.photos.length) currentLightboxIndex = 0;
  
  const img = document.querySelector('.lightbox img');
  if (img) {
    img.src = CONFIG.photos[currentLightboxIndex];
    img.alt = `Photo ${currentLightboxIndex + 1}`;
  }
}

// Letter Display
function initLetter() {
  if (typeof CONFIG === 'undefined' || !CONFIG.letterContent) return;
  
  const letterFolded = document.getElementById('letterFolded');
  const letterDisplay = document.getElementById('letterDisplay');
  
  if (letterFolded && letterDisplay) {
    letterDisplay.textContent = CONFIG.letterContent;
    
    letterFolded.addEventListener('click', () => {
      letterFolded.style.animation = 'letterUnfold 1s ease forwards';
      setTimeout(() => {
        letterFolded.style.display = 'none';
        letterDisplay.style.display = 'block';
        letterDisplay.style.animation = 'letterFadeIn 0.5s ease forwards';
      }, 1000);
    });
  }
}

// Gift Boxes Reveal
function initGiftBoxes() {
  const container = document.getElementById('giftBoxesContainer');
  if (!container) return;
  
  // Default gift boxes (can be customized in config)
  const gifts = CONFIG.giftBoxes || [
    { id: 1, message: 'You are amazing! 💜', image: null, audio: null },
    { id: 2, message: 'Thank you for being you! 💖', image: null, audio: null },
    { id: 3, message: 'I love you! 💕', image: null, audio: null },
    { id: 4, message: 'You make everything better! ✨', image: null, audio: null },
    { id: 5, message: 'Happy Birthday! 🎂', image: null, audio: null }
  ];
  
  gifts.forEach((gift, index) => {
    const giftBox = document.createElement('div');
    giftBox.className = 'gift-box-item';
    giftBox.innerHTML = `
      <div class="gift-box-wrapper" data-gift-id="${gift.id}">
        <div class="gift-box-top">🎁</div>
        <div class="gift-box-body"></div>
      </div>
      <div class="gift-reveal-content" style="display: none;">
        ${gift.image ? `<img src="${gift.image}" alt="Gift ${gift.id}" class="gift-image">` : ''}
        <p class="gift-message">${gift.message}</p>
        ${gift.audio ? `<button class="gift-audio-btn" onclick="playGiftAudio(${gift.id})">🎵 Play Audio</button>` : ''}
      </div>
    `;
    
    const wrapper = giftBox.querySelector('.gift-box-wrapper');
    const content = giftBox.querySelector('.gift-reveal-content');
    
    wrapper.addEventListener('click', () => {
      wrapper.style.animation = 'giftBoxOpen 0.8s ease forwards';
      setTimeout(() => {
        wrapper.style.display = 'none';
        content.style.display = 'block';
        content.style.animation = 'giftReveal 0.5s ease forwards';
      }, 800);
    });
    
    container.appendChild(giftBox);
  });
  
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.gift-box-item')) {
      document.querySelectorAll('.gift-reveal-content').forEach(content => {
        if (content.style.display === 'block') {
          const giftBox = content.closest('.gift-box-item');
          const wrapper = giftBox.querySelector('.gift-box-wrapper');
          content.style.display = 'none';
          wrapper.style.display = 'block';
          wrapper.style.animation = 'giftBoxClose 0.5s ease forwards';
        }
      });
    }
  });
}

function playGiftAudio(giftId) {
  // Audio playback logic - can be customized
  console.log('Playing audio for gift', giftId);
}

// Games
function initGames() {
  initMemoryGame();
  initQuiz();
  initDrawing();
  initSpinner();
  initPickAHeart();
}

// Memory Game
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let memoryMoves = 0;
let memoryStartTime = null;

function initMemoryGame() {
  resetMemoryGame();
}

function resetMemoryGame() {
  const grid = document.getElementById('memoryGrid');
  if (!grid) return;
  
  // Clear existing timer interval
  if (window.memoryTimerInterval) {
    clearInterval(window.memoryTimerInterval);
    window.memoryTimerInterval = null;
  }
  
  // Use matchGameImages if available, otherwise use photos
  const imageSource = (typeof CONFIG !== 'undefined' && CONFIG.matchGameImages && CONFIG.matchGameImages.length > 0) 
    ? CONFIG.matchGameImages 
    : (typeof CONFIG !== 'undefined' && CONFIG.photos ? CONFIG.photos : []);
  
  if (imageSource.length === 0) return;
  
  const photoCount = Math.min(6, imageSource.length);
  memoryCards = [];
  
  for (let i = 0; i < photoCount; i++) {
    memoryCards.push(imageSource[i]);
    memoryCards.push(imageSource[i]);
  }
  
  memoryCards.sort(() => Math.random() - 0.5);
  
  matchedPairs = 0;
  memoryMoves = 0;
  flippedCards = [];
  memoryStartTime = null; // Don't start timer until first card is clicked
  
  grid.innerHTML = '';
  
  memoryCards.forEach((photo, index) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.index = index;
    card.innerHTML = `<img src="${photo}" alt="Memory card">`;
    card.addEventListener('click', () => flipMemoryCard(index));
    grid.appendChild(card);
  });
  
  updateMemoryStats();
  
  // Start continuous timer update (only if not already running)
  if (!window.memoryTimerInterval) {
    window.memoryTimerInterval = setInterval(updateMemoryStats, 100); // Update every 100ms for smooth timer
  }
}

function flipMemoryCard(index) {
  const grid = document.getElementById('memoryGrid');
  if (!grid) return;
  
  const card = grid.children[index];
  if (!card || card.classList.contains('flipped') || card.classList.contains('matched')) return;
  if (flippedCards.length >= 2) return;
  
  // Start timer on first card click
  if (memoryStartTime === null) {
    memoryStartTime = Date.now();
  }
  
  card.classList.add('flipped');
  flippedCards.push({ index, card });
  
  if (flippedCards.length === 2) {
    memoryMoves++;
    const [first, second] = flippedCards;
    
    // Compare the image sources
    const firstImg = memoryCards[first.index];
    const secondImg = memoryCards[second.index];
    
    if (firstImg === secondImg) {
      setTimeout(() => {
        first.card.classList.add('matched');
        second.card.classList.add('matched');
        matchedPairs++;
        flippedCards = [];
        updateMemoryStats();
        
        if (matchedPairs === memoryCards.length / 2) {
          const time = Math.floor((Date.now() - memoryStartTime) / 1000);
          showModal(
            '🎉 Congratulations!',
            `You won in ${memoryMoves} moves and ${time} seconds!`,
            [{ text: 'Play Again', onclick: 'resetMemoryGame(); closeModal();' }]
          );
        }
      }, 500);
    } else {
      setTimeout(() => {
        first.card.classList.remove('flipped');
        second.card.classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
    updateMemoryStats();
  }
}

function updateMemoryStats() {
  const statsEl = document.getElementById('memoryStats');
  if (statsEl) {
    if (memoryStartTime) {
      const time = Math.floor((Date.now() - memoryStartTime) / 1000);
      statsEl.textContent = `Moves: ${memoryMoves} | Time: ${time}s | Matched: ${matchedPairs}/${memoryCards.length / 2}`;
    } else {
      statsEl.textContent = `Moves: ${memoryMoves} | Time: 0s | Matched: ${matchedPairs}/${memoryCards.length / 2}`;
    }
  }
}

// Quiz - Written Answers
let quizAnswers = {};

function initQuiz() {
  const quizContainer = document.getElementById('quizContainer');
  if (!quizContainer || typeof CONFIG === 'undefined' || !CONFIG.quiz) return;
  
  // Load saved answers
  const saved = localStorage.getItem('quizAnswers');
  if (saved) {
    try {
      quizAnswers = JSON.parse(saved);
    } catch (e) {
      quizAnswers = {};
    }
  }
  
  renderQuiz();
}

function renderQuiz() {
  const quizContainer = document.getElementById('quizContainer');
  if (!quizContainer || typeof CONFIG === 'undefined' || !CONFIG.quiz) return;
  
  let html = '';
  
  CONFIG.quiz.forEach((question, index) => {
    const savedAnswer = quizAnswers[`q${index}`] || '';
    html += `
      <div class="quiz-question-item" style="margin-bottom: 2rem; background: linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(232, 121, 249, 0.12) 50%, rgba(236, 72, 153, 0.15) 100%); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); padding: 2.5rem; border-radius: 25px; box-shadow: 0 10px 30px rgba(107, 33, 168, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3); border: 2px solid rgba(232, 121, 249, 0.3);">
        <h4 style="font-size: 1.4rem; margin-bottom: 1.2rem; color: #1e1b4b; font-weight: 600; text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5); font-family: 'Playfair Display', serif;">${index + 1}. ${question.q}</h4>
        <textarea 
          class="quiz-answer-input" 
          data-question="${index}"
          rows="5" 
          placeholder="Write your heartfelt answer here... 💜"
          style="width: 100%; padding: 1.2rem; border: 2px solid rgba(232, 121, 249, 0.4); border-radius: 15px; font-family: 'Inter', sans-serif; font-size: 1rem; resize: vertical; background: rgba(255, 255, 255, 0.95); color: #1e1b4b; box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05); transition: all 0.3s ease;"
          onfocus="this.style.borderColor='rgba(232, 121, 249, 0.7)'; this.style.boxShadow='inset 0 2px 8px rgba(168, 85, 247, 0.1), 0 0 15px rgba(232, 121, 249, 0.3)';"
          onblur="this.style.borderColor='rgba(232, 121, 249, 0.4)'; this.style.boxShadow='inset 0 2px 8px rgba(0, 0, 0, 0.05)';"
        >${savedAnswer}</textarea>
      </div>
    `;
  });
  
  html += `
    <div style="text-align: center; margin-top: 2rem;">
      <button class="btn" onclick="saveQuizAnswers()">Save Answers 💾</button>
      <button class="btn btn-secondary" onclick="viewQuizAnswers()">View All Answers</button>
    </div>
    <p style="text-align: center; margin-top: 1rem; color: #1e1b4b; font-size: 0.9rem; background: rgba(255, 255, 255, 0.3); padding: 0.8rem; border-radius: 10px;">
      💡 <strong>Tip:</strong> Take a screenshot of your drawing and share it with me! (Press Windows+Shift+S or Cmd+Shift+4)
    </p>
  `;
  
  quizContainer.innerHTML = html;
  
  // Auto-save on input
  quizContainer.querySelectorAll('.quiz-answer-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const questionIndex = e.target.dataset.question;
      quizAnswers[`q${questionIndex}`] = e.target.value;
      localStorage.setItem('quizAnswers', JSON.stringify(quizAnswers));
    });
  });
}

function saveQuizAnswers() {
  localStorage.setItem('quizAnswers', JSON.stringify(quizAnswers));
  showModal('💝 Answers Saved!', 'Your answers have been saved! You can view them anytime.');
}

function viewQuizAnswers() {
  if (typeof CONFIG === 'undefined' || !CONFIG.quiz) return;
  
  let html = '<h3 style="margin-bottom: 1.5rem;">Your Answers 💜</h3>';
  
  CONFIG.quiz.forEach((question, index) => {
    const answer = quizAnswers[`q${index}`] || 'Not answered yet';
    html += `
      <div class="quiz-answer-item">
        <h4>${index + 1}. ${question.q}</h4>
        <p>${answer}</p>
      </div>
    `;
  });
  
  html += '<div style="margin-top: 2rem;"><button class="btn" onclick="closeModal()">Close</button></div>';
  
  showModal('💝 Your Quiz Answers', html);
}

// Drawing Canvas with Eraser and Size Control - Fixed
function initDrawing() {
  const canvas = document.getElementById('drawingCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 400;
  
  let isDrawing = false;
  let currentColor = '#a855f7';
  let currentTool = 'draw';
  let brushSize = 4;
  let lastX = 0;
  let lastY = 0;
  let glowMode = false;
  
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  function getCanvasCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    
    // Clamp coordinates to canvas bounds
    x = Math.max(0, Math.min(x, canvas.width));
    y = Math.max(0, Math.min(y, canvas.height));
    
    return { x, y };
  }
  
  function updateCursor() {
    const size = currentTool === 'erase' ? brushSize * 1.5 : brushSize;
    const color = currentTool === 'erase' ? '#ffffff' : currentColor;
    const strokeColor = currentTool === 'erase' ? '#9333ea' : '#9333ea';
    const cursorSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size * 2}" height="${size * 2}"><circle cx="${size}" cy="${size}" r="${size - 2}" fill="${color}" stroke="${strokeColor}" stroke-width="2"/></svg>`;
    canvas.style.cursor = `url('data:image/svg+xml;utf8,${encodeURIComponent(cursorSvg)}') ${size} ${size}, crosshair`;
  }
  
  function setTool(tool) {
    currentTool = tool;
    if (tool === 'erase') {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = currentColor;
    }
    updateCursor();
  }
  
  // Helper function to start drawing
  function startDrawing(x, y) {
    isDrawing = true;
    lastX = x;
    lastY = y;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    // Draw initial point
    if (glowMode && currentTool === 'draw') {
      const glowSize = Math.max(3, brushSize * 0.8);
      ctx.shadowBlur = glowSize;
      ctx.shadowColor = currentColor;
      ctx.lineTo(lastX, lastY);
      ctx.stroke();
      ctx.shadowBlur = 0;
    } else {
      ctx.lineTo(lastX, lastY);
      ctx.stroke();
    }
  }
  
  // Helper function to draw
  function draw(x, y) {
    if (!isDrawing) return;
    
    if (glowMode && currentTool === 'draw') {
      // Apply glow effect - scale with brush size
      const glowSize = Math.max(3, brushSize * 0.8); // Minimum 3, scales with brush
      ctx.shadowBlur = glowSize;
      ctx.shadowColor = currentColor;
      ctx.lineTo(x, y);
      ctx.stroke();
      // Draw again with less glow for depth
      ctx.shadowBlur = glowSize * 0.5;
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.shadowBlur = 0;
    } else {
      ctx.shadowBlur = 0;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    
    lastX = x;
    lastY = y;
  }
  
  // Helper function to stop drawing
  function stopDrawing() {
    if (isDrawing) {
      ctx.closePath();
      isDrawing = false;
    }
  }
  
  // Mouse events
  canvas.addEventListener('mousedown', (e) => {
    e.preventDefault();
    const coords = getCanvasCoordinates(e);
    startDrawing(coords.x, coords.y);
  });
  
  canvas.addEventListener('mousemove', (e) => {
    e.preventDefault();
    const coords = getCanvasCoordinates(e);
    draw(coords.x, coords.y);
  });
  
  canvas.addEventListener('mouseup', (e) => {
    e.preventDefault();
    stopDrawing();
  });
  
  canvas.addEventListener('mouseleave', (e) => {
    // Don't stop drawing when mouse leaves - allow continuation when it comes back
    // Only stop if mouse is released outside
  });
  
  // Track if mouse is down globally
  let globalMouseDown = false;
  document.addEventListener('mousedown', () => {
    globalMouseDown = true;
  });
  document.addEventListener('mouseup', () => {
    globalMouseDown = false;
    if (isDrawing) {
      stopDrawing();
    }
  });
  
  // Resume drawing if mouse comes back while still holding
  canvas.addEventListener('mouseenter', (e) => {
    if (globalMouseDown && !isDrawing) {
      const coords = getCanvasCoordinates(e);
      startDrawing(coords.x, coords.y);
    }
  });
  
  // Touch events for mobile/tablet
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const coords = getCanvasCoordinates(touch);
    startDrawing(coords.x, coords.y);
  });
  
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const coords = getCanvasCoordinates(touch);
    draw(coords.x, coords.y);
  });
  
  canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    stopDrawing();
  });
  
  canvas.addEventListener('touchcancel', (e) => {
    e.preventDefault();
    stopDrawing();
  });
  
  // Tool selector
  const toolSelect = document.getElementById('canvasTool');
  if (toolSelect) {
    toolSelect.addEventListener('change', (e) => {
      setTool(e.target.value);
    });
  }
  
  // Brush size slider
  const brushSizeSlider = document.getElementById('brushSize');
  const brushSizeValue = document.getElementById('brushSizeValue');
  if (brushSizeSlider) {
    brushSizeSlider.addEventListener('input', (e) => {
      brushSize = parseInt(e.target.value);
      ctx.lineWidth = brushSize;
      if (brushSizeValue) brushSizeValue.textContent = brushSize + 'px';
      updateCursor();
    });
    ctx.lineWidth = brushSize;
  }
  
  // Color picker
  const colorPicker = document.getElementById('colorPicker');
  if (colorPicker) {
    colorPicker.value = currentColor;
    colorPicker.addEventListener('change', (e) => {
      currentColor = e.target.value;
      if (currentTool === 'draw') {
        ctx.strokeStyle = currentColor;
      }
      updateCursor();
    });
  }
  
  // Set initial values
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = brushSize;
  updateCursor();
  
  // Glow mode toggle
  const glowToggle = document.getElementById('glowModeToggle');
  if (glowToggle) {
    glowToggle.addEventListener('change', (e) => {
      glowMode = e.target.checked;
      // Update canvas style for visual feedback
      if (glowMode) {
        canvas.style.filter = 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))';
      } else {
        canvas.style.filter = 'none';
      }
    });
  }
  
  const clearBtn = document.querySelector('.clear-canvas');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  }
  
  const saveBtn = document.querySelector('.save-canvas');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = 'birthday-drawing.png';
      link.href = canvas.toDataURL();
      link.click();
      showModal('🎨 Drawing Saved!', 'Your drawing has been saved!');
    });
  }
}

// Dice Game - Replaces Spinner
function initSpinner() {
  const dice = document.getElementById('dice');
  const diceBtn = document.getElementById('diceBtn');
  const diceResult = document.getElementById('diceResult');
  
  if (!dice || !diceBtn) return;
  
  // Get outcomes from config or use defaults
  const outcomes = (typeof CONFIG !== 'undefined' && CONFIG.diceOutcomes && CONFIG.diceOutcomes.length === 6)
    ? CONFIG.diceOutcomes
    : ["Movie Night 🎬", "Picnic Date 🧺", "Candlelight Dinner 🕯️", "Spa Day 💆", "Adventure Day 🗺️", "Dance Party 💃"];
  
  let isRolling = false;
  
  // Create dice faces
  const diceFace = dice.querySelector('.dice-face');
  const diceDots = [
    [[0.5, 0.5]], // 1
    [[0.3, 0.3], [0.7, 0.7]], // 2
    [[0.3, 0.3], [0.5, 0.5], [0.7, 0.7]], // 3
    [[0.3, 0.3], [0.3, 0.7], [0.7, 0.3], [0.7, 0.7]], // 4
    [[0.3, 0.3], [0.3, 0.7], [0.5, 0.5], [0.7, 0.3], [0.7, 0.7]], // 5
    [[0.3, 0.3], [0.3, 0.5], [0.3, 0.7], [0.7, 0.3], [0.7, 0.5], [0.7, 0.7]] // 6
  ];
  
  function showDiceFace(number) {
    if (!diceFace) return;
    diceFace.innerHTML = '';
    const dots = diceDots[number - 1];
    dots.forEach(([x, y]) => {
      const dot = document.createElement('div');
      dot.className = 'dice-dot';
      dot.style.position = 'absolute';
      dot.style.left = (x * 100) + '%';
      dot.style.top = (y * 100) + '%';
      dot.style.transform = 'translate(-50%, -50%)';
      diceFace.appendChild(dot);
    });
  }
  
  let hasPlayedOnce = false;
  let outcomesButton = null;
  
  // Create outcomes button (initially disabled)
  const outcomesBtnContainer = document.createElement('div');
  outcomesBtnContainer.style.cssText = 'margin-top: 1.5rem; text-align: center;';
  outcomesButton = document.createElement('button');
  outcomesButton.className = 'btn btn-secondary';
  outcomesButton.textContent = 'See What You Could Have Got 🎁';
  outcomesButton.disabled = true;
  outcomesButton.style.opacity = '0.5';
  outcomesButton.style.cursor = 'not-allowed';
  outcomesButton.addEventListener('click', () => {
    let outcomesHtml = '<h3 style="margin-bottom: 1rem;">All Possible Outcomes 🎲</h3><ul style="text-align: left; list-style: none; padding: 0;">';
    outcomes.forEach((outcome, index) => {
      outcomesHtml += `<li style="padding: 0.5rem; margin: 0.5rem 0; background: rgba(168, 85, 247, 0.1); border-radius: 10px; border-left: 4px solid var(--purple-primary);">${index + 1}. ${outcome}</li>`;
    });
    outcomesHtml += '</ul><p style="margin-top: 1rem; font-size: 0.9rem; color: rgba(0,0,0,0.6);">Each outcome has an equal 1 in 6 chance! 🎯</p>';
    showModal('All Possible Outcomes 🎲', outcomesHtml);
  });
  outcomesBtnContainer.appendChild(outcomesButton);
  diceBtn.parentNode.appendChild(outcomesBtnContainer);
  
  diceBtn.addEventListener('click', () => {
    if (isRolling) return;
    
    isRolling = true;
    diceBtn.disabled = true;
    diceBtn.textContent = 'Rolling...';
    if (diceResult) diceResult.textContent = '';
    
    dice.classList.add('rolling');
    
    // Random roll animation
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      // Use crypto.getRandomValues for better randomness
      const array = new Uint32Array(1);
      crypto.getRandomValues(array);
      const randomNum = (array[0] % 6) + 1;
      showDiceFace(randomNum);
      rollCount++;
      
      if (rollCount > 10) {
        clearInterval(rollInterval);
        
        setTimeout(() => {
          // Use crypto.getRandomValues for truly random final number
          const finalArray = new Uint32Array(1);
          crypto.getRandomValues(finalArray);
          const finalNumber = (finalArray[0] % 6) + 1;
          showDiceFace(finalNumber);
          dice.classList.remove('rolling');
          
          const prize = outcomes[finalNumber - 1];
          
          if (diceResult) {
            diceResult.innerHTML = `🎉 <strong>You won: ${prize}</strong> 🎉`;
            diceResult.style.animation = 'pulse 0.5s ease';
          }
          
          showModal('🎲 Dice Result!', `Congratulations! You rolled ${finalNumber} and won: ${prize}`, [
            { text: 'Roll Again', onclick: `initSpinner(); closeModal();` }
          ]);
          
          // Enable outcomes button after first play (unlock it)
          if (!hasPlayedOnce) {
            hasPlayedOnce = true;
            if (outcomesButton) {
              outcomesButton.disabled = false;
              outcomesButton.style.opacity = '1';
              outcomesButton.style.cursor = 'pointer';
              outcomesButton.style.pointerEvents = 'auto';
            }
          }
          
          isRolling = false;
          diceBtn.disabled = false;
          diceBtn.textContent = 'Roll the Dice! 🎲';
        }, 500);
      }
    }, 100);
  });
  
  // Show initial face
  showDiceFace(1);
}

// Pick a Heart Game
function initPickAHeart() {
  const picker = document.getElementById('heartPicker');
  const result = document.getElementById('pickerResult');
  
  if (!picker || !result) return;
  
  const messages = typeof CONFIG !== 'undefined' && CONFIG.heartMessages && CONFIG.heartMessages.length >= 9
    ? CONFIG.heartMessages
    : [
        "You are amazing! 💖",
        "You light up my world! 💕",
        "I love you! 💗",
        "You are perfect! 💓",
        "You make me happy! 💝",
        "You are beautiful! 💖",
        "You are special! 💕",
        "You are loved! 💗",
        "You are wonderful! 💓"
      ];
  
  const hearts = ['💖', '💕', '💗', '💓', '💝', '💜', '💛', '💚', '💙'];
  
  // Create 9 hearts
  for (let i = 0; i < 9; i++) {
    const heart = document.createElement('div');
    heart.className = 'picker-heart';
    heart.textContent = hearts[i];
    heart.dataset.index = i;
    
    heart.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Don't remove special heart selection
      document.querySelectorAll('.picker-heart').forEach(h => h.classList.remove('selected'));
      
      // Select this heart (minimal animation like special heart)
      this.classList.add('selected');
      
      // Show message
      const message = messages[i] || messages[Math.floor(Math.random() * messages.length)];
      result.innerHTML = `<div style="background: rgba(255, 255, 255, 0.95); padding: 1rem; border-radius: 15px; border: 2px solid rgba(232, 121, 249, 0.5); box-shadow: 0 4px 15px rgba(0,0,0,0.2);"><strong style="color: #1e1b4b;">${message}</strong></div>`;
      result.style.animation = 'pulse 0.5s ease';
      
      // Simple ripple effect (minimal like special heart)
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (rect.width / 2 - size / 2) + 'px';
      ripple.style.top = (rect.height / 2 - size / 2) + 'px';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 400);
    });
    
    picker.appendChild(heart);
  }
  
  // Add special heart (now in game title)
  const specialHeart = document.getElementById('specialHeart');
  if (specialHeart && result) {
    const specialMessages = [
      "You are my everything! 💖",
      "My heart belongs to you! 💕",
      "Forever and always! 💗",
      "You complete me! 💓",
      "My one and only! 💝",
      "You make my world beautiful! ✨",
      "Every moment with you is special! 🌟",
      "You are my sunshine! ☀️",
      "I love you more than words can say! 💜",
      "You are perfect in every way! 💖"
    ];
    
    let usedMessages = [];
    let clickCount = 0;
    let tipShown = false;
    
    specialHeart.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      clickCount++;
      
      // Show tip after first click
      if (clickCount === 1 && !tipShown) {
        tipShown = true;
        const tip = document.createElement('div');
        tip.className = 'special-heart-tip';
        tip.style.cssText = 'position: absolute; top: -40px; right: 0; background: rgba(168, 85, 247, 0.9); color: white; padding: 0.5rem 1rem; border-radius: 10px; font-size: 0.85rem; white-space: nowrap; z-index: 100; box-shadow: 0 4px 15px rgba(0,0,0,0.3);';
        tip.textContent = '💡 Click multiple times for more messages!';
        specialHeart.parentElement.appendChild(tip);
        setTimeout(() => tip.remove(), 5000);
      }
      
      // Get unused message or reset if all used
      if (usedMessages.length >= specialMessages.length) {
        usedMessages = [];
      }
      
      let availableMessages = specialMessages.filter(msg => !usedMessages.includes(msg));
      if (availableMessages.length === 0) {
        availableMessages = specialMessages;
        usedMessages = [];
      }
      
      const randomIndex = Math.floor(Math.random() * availableMessages.length);
      const specialMessage = availableMessages[randomIndex];
      usedMessages.push(specialMessage);
      
      // Don't remove selection when clicking special heart - it stays visible
      // Show message in result box
      result.innerHTML = `<div style="background: rgba(255, 255, 255, 0.95); padding: 1rem; border-radius: 15px; border: 2px solid rgba(232, 121, 249, 0.5); box-shadow: 0 4px 15px rgba(0,0,0,0.2);"><strong style="color: #ec4899; font-size: 1.3rem; text-shadow: none;">✨ ${specialMessage} ✨</strong></div>`;
      result.style.animation = 'pulse 0.5s ease';
      
      // Simple ripple effect (minimal)
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (rect.width / 2 - size / 2) + 'px';
      ripple.style.top = (rect.height / 2 - size / 2) + 'px';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 400);
    });
  }
}

// Gift
function initGift() {
  const giftBox = document.getElementById('giftBox');
  const giftContent = document.getElementById('giftContent');
  const giftMessages = document.getElementById('giftMessages');
  const giftVideos = document.getElementById('giftVideos');
  
  if (!giftBox) return;
  
  let clickCount = 0;
  const requiredClicks = 3;
  
  giftBox.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount < requiredClicks) {
      // Show progress
      const progress = Math.floor((clickCount / requiredClicks) * 100);
      giftBox.style.opacity = '0.8';
      giftBox.style.transform = `scale(${0.95 + (clickCount * 0.02)})`;
      setTimeout(() => {
        giftBox.style.opacity = '1';
        giftBox.style.transform = 'scale(1)';
      }, 200);
      return;
    }
    
    giftBox.classList.add('opened');
    
    // Keep gradient background instead of white
    giftBox.style.background = 'var(--gradient-purple)';
    giftBox.style.color = 'white';
    
    if (giftContent) {
      giftContent.classList.add('revealed');
      const beautifulMessage = `
        <div style="text-align: center; padding: 2rem;">
          <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem; font-family: 'Playfair Display', serif; color: white; text-shadow: 0 2px 20px rgba(0,0,0,0.3);">
            ✨ Your Special Surprise ✨
          </h2>
          <p style="font-size: 1.3rem; line-height: 1.8; color: rgba(255,255,255,0.95); margin-bottom: 2rem;">
            This gift was made with all my love, just for you. Every moment we share is precious, and I wanted to create something special to celebrate you. 💜
          </p>
      `;
      
      if (typeof CONFIG !== 'undefined' && CONFIG.giftHtml) {
        giftContent.innerHTML = beautifulMessage + CONFIG.giftHtml + '</div>';
      } else {
        giftContent.innerHTML = beautifulMessage + '<p style="font-size: 1.1rem;">Check below for your special messages and videos!</p></div>';
      }
    }
    
    // Show messages
    if (giftMessages && typeof CONFIG !== 'undefined' && CONFIG.giftMessages) {
      giftMessages.style.display = 'block';
      giftMessages.innerHTML = '';
      CONFIG.giftMessages.forEach((msg, index) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'gift-message-item';
        msgDiv.innerHTML = `
          <h3>${msg.title || `Message ${index + 1}`}</h3>
          <p>${msg.content}</p>
        `;
        giftMessages.appendChild(msgDiv);
      });
    }
    
    // Show videos
    if (giftVideos && typeof CONFIG !== 'undefined' && CONFIG.giftVideos) {
      giftVideos.style.display = 'block';
      giftVideos.innerHTML = '';
      CONFIG.giftVideos.forEach((video, index) => {
        const videoDiv = document.createElement('div');
        videoDiv.className = 'gift-video-item';
        videoDiv.innerHTML = `
          <h3>${video.title || `Video ${index + 1}`}</h3>
          ${video.type === 'youtube' ? 
            `<iframe width="560" height="315" src="${video.url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` :
            `<video controls style="width: 100%;"><source src="${video.url}" type="video/${video.type || 'mp4'}"></video>`
          }
        `;
        giftVideos.appendChild(videoDiv);
      });
    }
    
    // Confetti
    for (let i = 0; i < 80; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        const colors = ['#c084fc', '#f472b6', '#fb7185', '#a78bfa'];
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
      }, i * 30);
    }
    
    showModal('🎁 Gift Opened!', 'Your gift has been revealed! Check it out below!');
  });
  
  giftBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      giftBox.click();
    }
  });
}

// Cake Cutting Feature - OLD (replaced below)
function initCakeCutting_OLD() {
  const cake = document.getElementById('birthdayCake');
  const cakeContainer = document.getElementById('cakeContainer');
  const cutLine = document.getElementById('cakeCutLine');
  const sliceLeft = document.getElementById('cakeSliceLeft');
  const sliceRight = document.getElementById('cakeSliceRight');
  
  if (!cake || !cakeContainer) return;
  
  let isCut = false;
  window.cakeCut = false; // Global flag to track if cake is cut
  
  cake.addEventListener('click', (e) => {
    if (isCut) return;
    
    isCut = true;
    window.cakeCut = true; // Set global flag
    const rect = cake.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const cutPosition = (clickX / rect.width) * 100;
    
    // Show cut line
    if (cutLine) {
      cutLine.style.left = cutPosition + '%';
      cutLine.style.opacity = '1';
    }
    
    // Animate cake slices smoothly
    setTimeout(() => {
      // Hide cut line
      if (cutLine) {
        cutLine.style.opacity = '0';
      }
      
      // Create smooth slice animation
      if (sliceLeft) {
        sliceLeft.style.width = cutPosition + '%';
        sliceLeft.style.opacity = '1';
        sliceLeft.style.transform = 'translateX(-15px) rotate(-3deg)';
        sliceLeft.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      }
      if (sliceRight) {
        sliceRight.style.width = (100 - cutPosition) + '%';
        sliceRight.style.opacity = '1';
        sliceRight.style.transform = 'translateX(15px) rotate(3deg)';
        sliceRight.style.left = cutPosition + '%';
        sliceRight.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      }
      
      // Fade out original cake smoothly
      cake.style.transition = 'opacity 0.5s ease';
      cake.style.opacity = '0';
      
      // Confetti effect
      createCakeConfetti();
      
      // Enable the CTA button
      const ctaButton = document.getElementById('ctaButton');
      if (ctaButton) {
        ctaButton.style.opacity = '1';
        ctaButton.style.pointerEvents = 'auto';
        ctaButton.style.cursor = 'pointer';
        ctaButton.title = '';
      }
      
      // Update instruction
      const instruction = document.querySelector('.cake-instruction');
      if (instruction) {
        instruction.textContent = '🎂 Cake cut! Now you can continue your journey! 💜';
        instruction.style.color = '#10b981';
        instruction.style.fontWeight = '600';
      }
    }, 300);
  });
  
  // Initially disable CTA button (but make it visible and clickable to show message)
  const ctaButton = document.getElementById('ctaButton');
  if (ctaButton) {
    // Keep button clickable but show it's disabled
    ctaButton.style.opacity = '0.7';
    ctaButton.style.pointerEvents = 'auto'; // Allow clicks to show message
    ctaButton.style.cursor = 'pointer';
    ctaButton.title = 'Cut the cake first! 🎂';
  }
}

// Cake cutting feature removed entirely - navigation works normally

// Aesthetic Enhancements
function initAestheticEnhancements() {
  createMicroParticles();
  createSnowfall();
  initCursorTrail();
  initNameHeartbeat();
  initBackgroundGradient();
  initTypingEffect();
}

function createMicroParticles() {
  const container = document.getElementById('microParticles');
  if (!container) return;
  
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.className = 'micro-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    container.appendChild(particle);
  }
}

function createSnowfall() {
  const container = document.getElementById('snowfallOverlay');
  if (!container) return;
  
  for (let i = 0; i < 30; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'snowflake';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 3 + 's';
    sparkle.style.animationDuration = (10 + Math.random() * 10) + 's';
    container.appendChild(sparkle);
  }
}

function initCursorTrail() {
  const trail = document.querySelector('.cursor-trail');
  if (!trail) return;
  
  let trailElements = [];
  const maxTrailLength = 5;
  
  document.addEventListener('mousemove', (e) => {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail-dot';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    document.body.appendChild(dot);
    
    trailElements.push(dot);
    
    if (trailElements.length > maxTrailLength) {
      const oldDot = trailElements.shift();
      oldDot.remove();
    }
    
    setTimeout(() => {
      dot.style.opacity = '0';
      setTimeout(() => dot.remove(), 300);
    }, 100);
  });
}

function initNameHeartbeat() {
  const heroName = document.getElementById('heroName');
  if (!heroName) return;
  
  setInterval(() => {
    heroName.style.animation = 'heartbeatGlow 0.6s ease';
    setTimeout(() => {
      heroName.style.animation = '';
    }, 600);
  }, 3000);
}

function initBackgroundGradient() {
  const overlay = document.querySelector('.pink-glow-overlay');
  if (!overlay) return;
  
  let hue = 0;
  setInterval(() => {
    hue = (hue + 1) % 360;
    overlay.style.background = `radial-gradient(circle at 50% 50%, 
      hsla(${hue}, 70%, 80%, 0.15) 0%, 
      hsla(${(hue + 60) % 360}, 60%, 70%, 0.1) 50%, 
      transparent 100%)`;
  }, 100);
}

function initTypingEffect() {
  const subtitle = document.getElementById('heroSubtitleText');
  if (!subtitle) return;
  
  const originalText = subtitle.textContent;
  const additionalText = "Because you deserve something special.";
  
  setTimeout(() => {
    const typingContainer = document.createElement('div');
    typingContainer.className = 'typing-effect';
    typingContainer.textContent = '';
    subtitle.parentNode.insertBefore(typingContainer, subtitle.nextSibling);
    
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < additionalText.length) {
        typingContainer.textContent += additionalText[index];
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
  }, 7000);
}

// Page Transition Animations
function initPageAnimations() {
  const sections = document.querySelectorAll('.page-section');
  sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
  });
}

// Music Fade-in - DISABLED (no auto-play)
let musicStarted = false;
function initMusicFadeIn() {
  // Music will not play automatically - user must click play button
  // Removed auto-play functionality
}

// Floating Music Widget
function toggleFloatingMusic() {
  const player = document.getElementById('musicPlayer');
  if (player) {
    player.style.display = player.style.display === 'none' ? 'block' : 'none';
  }
}

// Sound Effects
function playSoundEffect(type) {
  // Create audio context for sound effects
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  if (type === 'pop') {
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } else if (type === 'chime') {
    oscillator.frequency.value = 1000;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  }
}

// CTA Button with vibration feedback
function handleCtaClick() {
  // Direct navigation - cake feature removed
  // Mobile vibration feedback
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
  nextSection();
}

// Shooting Stars Animation
// Shooting Stars Animation - Rare, Slow, Elegant (Using 💫 and ✨)
function initShootingStars() {
  const container = document.getElementById('shootingStars');
  if (!container) return;
  
  let isStarActive = false; // Ensure only one star at a time
  const starEmojis = ['💫', '✨']; // Use both emojis
  
  function createShootingStar() {
    if (isStarActive) return; // Skip if star is already active
    isStarActive = true;
    
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.textContent = starEmojis[Math.floor(Math.random() * starEmojis.length)]; // Random emoji
    
    // Random direction (top-left to bottom-right or reverse)
    const direction = Math.random() > 0.5 ? 1 : -1;
    const startX = direction > 0 ? -60 : window.innerWidth + 60;
    const startY = Math.random() * (window.innerHeight * 0.2); // Top 20% of screen
    const duration = 3 + Math.random() * 2; // 3-5 seconds (slower, more elegant)
    const size = 30 + Math.random() * 10; // Slightly smaller for subtlety
    
    star.style.cssText = `
      position: fixed;
      left: ${startX}px;
      top: ${startY}px;
      font-size: ${size}px;
      pointer-events: none;
      z-index: 5;
      will-change: transform, opacity;
      filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4));
      opacity: 0.7;
    `;
    
    // Set animation direction (slower, smoother, more elegant)
    if (direction > 0) {
      star.style.animation = `shootingStarDiagonal ${duration}s ease-out forwards`;
    } else {
      star.style.animation = `shootingStarDiagonalReverse ${duration}s ease-out forwards`;
    }
    
    container.appendChild(star);
    
    // Mark as inactive after animation completes
    setTimeout(() => {
      star.remove();
      isStarActive = false;
    }, (duration + 0.5) * 1000);
  }
  
  // Create shooting stars every 15-25 seconds (very rare)
  function scheduleNextStar() {
    const delay = 15000 + Math.random() * 10000; // 15-25 seconds
    setTimeout(() => {
      createShootingStar();
      scheduleNextStar();
    }, delay);
  }
  
  // Start scheduling (no initial star, wait for first scheduled one)
  scheduleNextStar();
}

// Birthday Animations (Random, Less Frequent, Amazing)
function initBirthdayAnimations() {
  const container = document.getElementById('birthdayAnimations');
  if (!container) return;
  
  const birthdayEmojis = ['🎂', '🎈', '🎁', '🎊', '🎉', '💖', '💕', '💗', '✨', '🌟'];
  
  function createBirthdayAnimation() {
    const anim = document.createElement('div');
    anim.className = 'birthday-animation';
    const emoji = birthdayEmojis[Math.floor(Math.random() * birthdayEmojis.length)];
    anim.textContent = emoji;
    
    const startX = Math.random() * 100;
    const size = 30 + Math.random() * 40;
    const duration = 3 + Math.random() * 2;
    
    anim.style.left = startX + '%';
    anim.style.fontSize = size + 'px';
    anim.style.animationDuration = duration + 's';
    
    container.appendChild(anim);
    
    setTimeout(() => {
      anim.remove();
    }, duration * 1000);
  }
  
  // Create birthday animations less frequently (15% chance every 5 seconds)
  setInterval(() => {
    if (Math.random() > 0.85) {
      createBirthdayAnimation();
    }
  }, 5000);
}

// Birthday Lock Message on First Page
function initBirthdayLockMessage() {
  if (!BIRTHDAY_LOCK_ENABLED) return;
  if (typeof CONFIG === 'undefined' || !CONFIG.birthdayISO) return;
  
  const now = new Date();
  const birthday = new Date(CONFIG.birthdayISO);
  const diff = birthday - now;
  
  if (diff > 0) {
    const lockMessage = document.getElementById('birthdayLockMessage');
    if (lockMessage) {
      lockMessage.style.display = 'block';
      lockMessage.innerHTML = `
        <div class="lock-message-content">
          <h2>🎂 Waiting for Your Special Day! 🎂</h2>
          <p>The full website will unlock on your birthday! Check the countdown timer above. 💜</p>
        </div>
      `;
    }
  }
}

// Fix First Page Visibility
function fixFirstPageVisibility() {
  const heroContent = document.querySelector('.hero-content');
  const heroTextContainer = document.querySelector('.hero-text-container');
  
  if (heroContent) {
    heroContent.style.position = 'relative';
    heroContent.style.zIndex = '10';
    heroContent.style.padding = '2rem';
  }
  
  if (heroTextContainer) {
    heroTextContainer.style.position = 'relative';
    heroTextContainer.style.zIndex = '11';
    heroTextContainer.style.background = 'rgba(255, 255, 255, 0.05)';
    heroTextContainer.style.backdropFilter = 'blur(10px)';
    heroTextContainer.style.borderRadius = '30px';
    heroTextContainer.style.padding = '2rem';
  }
  
  // Fix background - use gradient instead of image if not good
  const heroBackground = document.getElementById('heroBackground');
  if (heroBackground && CONFIG.photos && CONFIG.photos.length > 0) {
    // Keep the image but improve overlay
    heroBackground.style.backgroundImage = `linear-gradient(135deg, rgba(255, 182, 193, 0.3) 0%, rgba(255, 192, 203, 0.2) 50%, rgba(255, 228, 225, 0.3) 100%), url(${CONFIG.photos[0]})`;
    heroBackground.style.backgroundBlendMode = 'overlay';
    heroBackground.style.filter = 'brightness(0.6) saturate(1.2)';
  }
}

// Make functions globally accessible
window.nextSection = nextSection;
window.closeModal = closeModal;
window.resetMemoryGame = resetMemoryGame;
window.saveQuizAnswers = saveQuizAnswers;
window.viewQuizAnswers = viewQuizAnswers;
window.toggleMusicPlayer = toggleMusicPlayer;
window.togglePlayback = togglePlayback;
window.nextTrack = nextTrack;
window.previousTrack = previousTrack;
window.toggleFloatingMusic = toggleFloatingMusic;
window.handleCtaClick = handleCtaClick;
window.toggleFinalLetter = toggleFinalLetter;

// Final Letter Toggle - Requires 5 clicks for special surprise (Upgraded)
let finalLetterClickCount = 0;
let finalLetterRevealed = false;
const clickMessages = [
  "Hehe… again 😄",
  "Almost there…",
  "Keep clicking!",
  "One more maybe 👀",
  "You're so close!"
];
const clickAnimations = ['shake', 'jump', 'glow', 'hearts', 'sparkles'];

function toggleFinalLetter() {
  const content = document.getElementById('finalLetterContent');
  const btn = document.getElementById('finalLetterBtn');
  const messageContainer = document.getElementById('finalLetterMessage');
  
  if (!content || !btn) return;
  
  // Count clicks
  finalLetterClickCount++;
  
  // Require 5 clicks before revealing
  if (finalLetterClickCount < 5) {
    // Show random animation
    const animType = clickAnimations[Math.floor(Math.random() * clickAnimations.length)];
    applyClickAnimation(btn, animType);
    
    // Show message
    const message = clickMessages[finalLetterClickCount - 1] || clickMessages[Math.floor(Math.random() * clickMessages.length)];
    showClickMessage(message, btn);
    
    return;
  }
  
  // After 5th click, reveal content
  if (!finalLetterRevealed) {
    finalLetterRevealed = true;
    
    // Play pop animation
    btn.style.animation = 'finalButtonPop 0.5s ease';
    
    // Hide button smoothly
    setTimeout(() => {
      btn.style.opacity = '0';
      btn.style.transform = 'scale(0)';
      btn.style.pointerEvents = 'none';
      btn.style.transition = 'all 0.5s ease';
    }, 500);
    
    // Reveal content
    setTimeout(() => {
      content.classList.add('active');
      content.style.animation = 'fadeInUp 0.6s ease';
    }, 800);
    
    // Remove message if exists
    if (messageContainer) {
      messageContainer.remove();
    }
  }
}

function applyClickAnimation(btn, type) {
  switch(type) {
    case 'shake':
      btn.style.animation = 'buttonShake 0.4s ease';
      break;
    case 'jump':
      btn.style.animation = 'buttonJump 0.4s ease';
      break;
    case 'glow':
      btn.style.animation = 'buttonGlow 0.6s ease';
      break;
    case 'hearts':
      createHeartsAround(btn);
      break;
    case 'sparkles':
      createSparklesAround(btn);
      break;
  }
  
  setTimeout(() => {
    btn.style.animation = '';
  }, 600);
}

function showClickMessage(message, btn) {
  let messageContainer = document.getElementById('finalLetterMessage');
  if (!messageContainer) {
    messageContainer = document.createElement('div');
    messageContainer.id = 'finalLetterMessage';
    messageContainer.style.cssText = `
      position: fixed;
      bottom: 8rem;
      right: 2rem;
      background: rgba(168, 85, 247, 0.95);
      color: white;
      padding: 0.8rem 1.5rem;
      border-radius: 15px;
      font-size: 1rem;
      z-index: 1003;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      animation: messageFadeIn 0.3s ease;
    `;
    document.body.appendChild(messageContainer);
  }
  
  messageContainer.textContent = message;
  messageContainer.style.animation = 'messageFadeIn 0.3s ease';
}

function createHeartsAround(btn) {
  const rect = btn.getBoundingClientRect();
  const hearts = ['💖', '💕', '💗', '💓', '💝'];
  
  for (let i = 0; i < 5; i++) {
    const heart = document.createElement('div');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top + rect.height / 2}px;
      font-size: 1.5rem;
      pointer-events: none;
      z-index: 1004;
      animation: heartPop 0.8s ease forwards;
    `;
    heart.style.setProperty('--random-x', (Math.random() * 100 - 50) + 'px');
    heart.style.setProperty('--random-y', (Math.random() * 100 - 50) + 'px');
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 800);
  }
}

function createSparklesAround(btn) {
  const rect = btn.getBoundingClientRect();
  
  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top + rect.height / 2}px;
      font-size: 1rem;
      pointer-events: none;
      z-index: 1004;
      animation: sparklePop 0.6s ease forwards;
    `;
    sparkle.style.setProperty('--random-x', (Math.random() * 80 - 40) + 'px');
    sparkle.style.setProperty('--random-y', (Math.random() * 80 - 40) + 'px');
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 600);
  }
}
