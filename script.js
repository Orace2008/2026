// =========================================
// VARIABLES GLOBALES & INITIALISATION
// =========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser l'année dynamique
    setDynamicYear();
    
    // Initialiser les animations de feu d'artifice
    initFireworks();
    
    // Initialiser les confettis
    initConfetti();
    
    // Initialiser le compte à rebours
    initCountdown();
    
    // Initialiser les animations au scroll
    initScrollAnimations();
    
    // Initialiser le bouton retour en haut
    initBackToTop();
    
    // Initialiser les effets de survol
    initHoverEffects();
    
    // Lancer l'animation du texte
    animateTypewriter();
});

// =========================================
// ANNÉE DYNAMIQUE
// =========================================
function setDynamicYear() {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    
    // Mettre à jour toutes les occurrences de l'année
    document.getElementById('dynamic-year').textContent = nextYear;
    document.querySelectorAll('.year').forEach(el => el.textContent = nextYear);
    document.getElementById('current-year').textContent = nextYear;
    
    // Mettre à jour le compte à rebours pour la prochaine année
    document.querySelectorAll('.highlight').forEach(el => {
        if (el.textContent.includes('2026') || el.textContent.includes('2027')) {
            el.textContent = nextYear;
        }
    });
}

// =========================================
// FEUX D'ARTIFICE
// =========================================
function initFireworks() {
    const fireworksContainer = document.getElementById('fireworks');
    
    function createFirework() {
        // Créer un feu d'artifice seulement si l'utilisateur est sur la section hero
        const heroSection = document.getElementById('hero');
        const heroRect = heroSection.getBoundingClientRect();
        const isHeroVisible = heroRect.top < window.innerHeight && heroRect.bottom > 0;
        
        if (!isHeroVisible) return;
        
        const firework = document.createElement('div');
        firework.className = 'firework';
        
        // Position aléatoire
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.5;
        
        // Couleur aléatoire (or, rouge, blanc)
        const colors = ['#D4AF37', '#F4E8C1', '#C62828', '#E53935', '#FFFFFF'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Taille aléatoire
        const size = Math.random() * 6 + 2;
        
        // Appliquer les styles
        firework.style.left = `${x}px`;
        firework.style.top = `${y}px`;
        firework.style.backgroundColor = color;
        firework.style.width = `${size}px`;
        firework.style.height = `${size}px`;
        firework.style.setProperty('--explode-y', `${y - Math.random() * 200 - 100}px`);
        
        // Ajouter au conteneur
        fireworksContainer.appendChild(firework);
        
        // Supprimer après l'animation
        setTimeout(() => {
            if (firework.parentNode) {
                firework.parentNode.removeChild(firework);
            }
        }, 1500);
    }
    
    // Créer des feux d'artifice à intervalles réguliers
    setInterval(createFirework, 800);
    
    // Créer un grand feu d'artifice au chargement
    setTimeout(() => {
        for (let i = 0; i < 20; i++) {
            setTimeout(createFirework, i * 50);
        }
    }, 1000);
}

// =========================================
// CONFETTIS
// =========================================
function initConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const confettiColors = ['#D4AF37', '#F4E8C1', '#C62828', '#E53935', '#1A2C50', '#FFFFFF'];
    
    function createConfetti() {
        // Créer des confettis seulement si l'utilisateur fait défiler
        if (window.scrollY < 100) return;
        
        const confettiCount = 15;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Position aléatoire en haut
            const x = Math.random() * window.innerWidth;
            
            // Couleur aléatoire
            const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            
            // Taille et forme aléatoires
            const size = Math.random() * 10 + 5;
            const isSquare = Math.random() > 0.7;
            const rotation = Math.random() * 360;
            
            // Durée et délai aléatoires
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            
            // Appliquer les styles
            confetti.style.left = `${x}px`;
            confetti.style.backgroundColor = color;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${isSquare ? size : size / 2}px`;
            confetti.style.borderRadius = isSquare ? '2px' : '50%';
            confetti.style.animationDuration = `${duration}s`;
            confetti.style.animationDelay = `${delay}s`;
            
            // Ajouter au conteneur
            confettiContainer.appendChild(confetti);
            
            // Supprimer après l'animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, (duration + delay) * 1000);
        }
    }
    
    // Créer des confettis au défilement
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(createConfetti, 150);
    });
}

// =========================================
// COMPTE À REBOURS
// =========================================
function initCountdown() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    function updateCountdown() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const nextYear = currentYear + 1;
        const nextYearDate = new Date(`January 1, ${nextYear} 00:00:00`);
        
        const timeDifference = nextYearDate - currentDate;
        
        // Calculer les jours, heures, minutes, secondes
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        // Mettre à jour les éléments avec animation
        updateElementWithAnimation(daysElement, days.toString().padStart(2, '0'));
        updateElementWithAnimation(hoursElement, hours.toString().padStart(2, '0'));
        updateElementWithAnimation(minutesElement, minutes.toString().padStart(2, '0'));
        updateElementWithAnimation(secondsElement, seconds.toString().padStart(2, '0'));
    }
    
    function updateElementWithAnimation(element, newValue) {
        if (element.textContent !== newValue) {
            element.classList.add('updated');
            element.textContent = newValue;
            
            setTimeout(() => {
                element.classList.remove('updated');
            }, 500);
        }
    }
    
    // Mettre à jour immédiatement puis toutes les secondes
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// =========================================
// ANIMATIONS AU SCROLL
// =========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.wish-card, .section-title, .section-subtitle');
    
    function checkScroll() {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.85;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerPoint) {
                // Récupérer le délai personnalisé
                const delay = element.getAttribute('data-delay') || 0;
                
                // Appliquer l'animation avec le délai
                setTimeout(() => {
                    element.classList.add('animated');
                    
                    // Pour les cartes de vœux, ajouter la classe visible
                    if (element.classList.contains('wish-card')) {
                        element.classList.add('visible');
                    }
                }, parseInt(delay));
            }
        });
    }
    
    // Vérifier au chargement et au défilement
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    
    // Vérifier immédiatement
    checkScroll();
}

// =========================================
// BOUTON RETOUR EN HAUT
// =========================================
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =========================================
// EFFETS DE SURVOL
// =========================================
function initHoverEffects() {
    // Ajouter des effets de survol aux cartes
    const wishCards = document.querySelectorAll('.wish-card');
    
    wishCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Ajouter un effet de survol aux boutons sociaux
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// =========================================
// ANIMATION MACHINE À ÉCRIRE
// =========================================
function animateTypewriter() {
    const typewriterText = document.getElementById('typewriter-text');
    const text = typewriterText.textContent;
    typewriterText.textContent = '';
    typewriterText.style.opacity = 1;
    
    let i = 0;
    const speed = 20;
    
    function typeWriter() {
        if (i < text.length) {
            // Gérer les sauts de ligne
            if (text.substring(i, i + 4) === '<br>') {
                typewriterText.innerHTML += '<br><br>';
                i += 4;
            } else {
                typewriterText.innerHTML += text.charAt(i);
                i++;
            }
            
            setTimeout(typeWriter, speed);
        }
        // Pas de curseur à la fin - le texte reste simplement visible
    }
    
    // Démarrer l'animation après un délai
    setTimeout(typeWriter, 1000);
}
// =========================================
// ANIMATION PARALLAX LÉGER
// =========================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.getElementById('hero');
    
    // Effet parallax sur la section hero
    if (heroSection) {
        const rate = scrolled * 0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }
    
    // Effet de fondu sur les sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrolled >= sectionTop - window.innerHeight / 1.5 && scrolled <= sectionTop + sectionHeight) {
            section.style.opacity = 1;
        }
    });
});