document.addEventListener('DOMContentLoaded', () => {
    const typingSpan = document.getElementById('hero-typing-word');
    const heroBackground = document.getElementById('hero-background');
    const heroDotsWrapper = document.querySelector('.hero-dots-wrapper');
    let progressDots = [];

    // Require only the core elements; progress dots are optional (we no longer show a progress bar)
    if (!typingSpan || !heroBackground) {
        return;
    }

    // Default hero background images (reuse existing hero assets)
    const defaultHeroImages = [];

    // Images currently in use (can be overridden from JSON)
    let heroImages = [...defaultHeroImages];

    let currentImageIndex = 0;
    let imageIntervalId = null;

    function setHeroImage(index) {
        if (!heroImages || heroImages.length === 0) {
            return;
        }

        currentImageIndex = index;

        // Update background image
        const imageSrc = heroImages[index % heroImages.length];
        heroBackground.style.backgroundImage = `url('${imageSrc}')`;

        // Restart pan animation
        heroBackground.classList.remove('hero-pan');
        // Force reflow
        void heroBackground.offsetWidth;
        heroBackground.classList.add('hero-pan');

        // Update progress active state (if any dots exist)
        progressDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function startImageRotation() {
        if (imageIntervalId) {
            clearInterval(imageIntervalId);
        }
        imageIntervalId = setInterval(() => {
            const nextIndex = (currentImageIndex + 1) % heroImages.length;
            setHeroImage(nextIndex);
        }, 8000);
    }

    function rebuildDots() {
        if (!heroDotsWrapper) return;

        // Clear existing dots and references
        heroDotsWrapper.innerHTML = '';
        progressDots = [];

        heroImages.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'hero-progress-dot';
            dot.setAttribute('data-hero-index', String(index));
            dot.setAttribute('aria-label', `Hero image ${index + 1}`);

            dot.addEventListener('click', () => {
                setHeroImage(index);
                startImageRotation();
            });

            heroDotsWrapper.appendChild(dot);
            progressDots.push(dot);
        });
    }

    function initHeroImages(images) {
        if (Array.isArray(images) && images.length > 0) {
            heroImages = images;
        } else {
            heroImages = [...defaultHeroImages];
        }

        // Rebuild progress dots based on the current heroImages
        rebuildDots();

        if (heroImages.length > 0) {
            setHeroImage(0);
            startImageRotation();
        }
    }

    // Initialize hero background with defaults first
    initHeroImages(defaultHeroImages);

    // Optionally override hero images from JSON config for easier editing
    fetch('data/hero-images.json')
        .then(response => response.ok ? response.json() : Promise.reject())
        .then(data => {
            if (Array.isArray(data.images) && data.images.length > 0) {
                initHeroImages(data.images);
            }
        })
        .catch(() => {
            // On error, keep using default images
        });

    // Typing animation for final word (loaded from JSON)
    function startTyping(words) {
        if (!Array.isArray(words) || words.length === 0) {
            words = ['Learning', 'Growth', 'Nurturing'];
        }

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        const typeSpeed = 120;
        const deleteSpeed = 80;
        const pauseAtEnd = 1500;

        function tick() {
            const currentWord = words[wordIndex];

            if (!deleting) {
                charIndex++;
                typingSpan.textContent = currentWord.slice(0, charIndex);

                if (charIndex === currentWord.length) {
                    deleting = true;
                    setTimeout(tick, pauseAtEnd);
                    return;
                }
            } else {
                charIndex--;
                typingSpan.textContent = currentWord.slice(0, Math.max(charIndex, 0));

                if (charIndex <= 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }

            const delay = deleting ? deleteSpeed : typeSpeed;
            setTimeout(tick, delay);
        }

        typingSpan.textContent = '';
        tick();
    }

    fetch('data/hero-words.json')
        .then(response => response.ok ? response.json() : Promise.reject())
        .then(data => {
            const words = Array.isArray(data.words) ? data.words : undefined;
            startTyping(words);
        })
        .catch(() => {
            startTyping(['Learning', 'Growth', 'Nurturing']);
        });
});


