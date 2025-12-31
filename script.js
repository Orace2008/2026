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
// ANNÉE DYNAMIQUE - CORRECTION
// =========================================
function setDynamicYear() {
    // LE SITE EST TOUJOURS POUR 2026
    const SITE_YEAR = 2026;
    
    // Mettre à jour toutes les occurrences de l'année avec 2026
    document.getElementById('dynamic-year').textContent = SITE_YEAR;
    document.querySelectorAll('.year').forEach(el => el.textContent = SITE_YEAR);
    document.getElementById('current-year').textContent = SITE_YEAR;
    
    // Mettre à jour les vœux
    document.querySelectorAll('.section-title .highlight').forEach(el => {
        if (el.textContent.match(/\d{4}/)) {
            el.textContent = SITE_YEAR;
        }
    });
    
    // Mettre à jour les sous-titres
    const subtitles = document.querySelectorAll('.section-subtitle');
    subtitles.forEach(el => {
        if (el.textContent.includes('2026') || el.textContent.includes('2027')) {
            el.textContent = el.textContent.replace(/\d{4}/, SITE_YEAR);
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
// COMPTE À REBOURS - LOGIQUE CORRECTE
// =========================================
function initCountdown() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // IMPORTANT : Le site s'appelle "Bonne Année 2026"
    // Donc nous souhaitons une bonne année 2026
    // Le compte à rebours est pour le PROCHAIN Nouvel An
    
    function updateCountdown() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        
        // Déterminer la date du PROCHAIN Nouvel An
        let nextNewYearDate;
        
        // Si nous sommes AVANT le 1er janvier de l'année en cours
        // (entre le 2 janvier et le 31 décembre)
        const jan1stCurrentYear = new Date(`January 1, ${currentYear} 00:00:00`);
        
        if (currentDate < jan1stCurrentYear) {
            // Cas spécial : nous sommes entre le 1er et le 2 janvier à minuit
            // Le prochain Nouvel An est celui de l'année en cours
            nextNewYearDate = jan1stCurrentYear;
        } else {
            // Nous sommes après le 1er janvier, donc le prochain Nouvel An est l'année suivante
            nextNewYearDate = new Date(`January 1, ${currentYear + 1} 00:00:00`);
        }
        
        const timeDifference = nextNewYearDate - currentDate;
        const targetYear = nextNewYearDate.getFullYear();
        
        // Mettre à jour l'affichage de l'année cible
        document.querySelectorAll('.countdown-section .highlight').forEach(el => {
            el.textContent = targetYear;
        });
        
        // Calculer le temps restant
        const totalSeconds = Math.max(0, Math.floor(timeDifference / 1000));
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        // Mettre à jour l'affichage
        updateElementWithAnimation(daysElement, days.toString().padStart(2, '0'));
        updateElementWithAnimation(hoursElement, hours.toString().padStart(2, '0'));
        updateElementWithAnimation(minutesElement, minutes.toString().padStart(2, '0'));
        updateElementWithAnimation(secondsElement, seconds.toString().padStart(2, '0'));
        
        // Messages selon le temps restant
        updateCountdownMessage(days, hours, minutes, seconds, targetYear);
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
    
    function updateCountdownMessage(days, hours, minutes, seconds, targetYear) {
        const messageElement = document.querySelector('.countdown-message');
        
        if (!messageElement) return;
        
        // Réinitialiser les styles
        messageElement.style.color = '';
        messageElement.style.fontWeight = '';
        messageElement.style.animation = '';
        
        if (days > 60) {
            messageElement.textContent = `Le compte à rebours pour ${targetYear} a commencé !`;
        } else if (days > 30) {
            messageElement.textContent = `Plus que ${days} jours avant ${targetYear} !`;
        } else if (days > 7) {
            messageElement.textContent = `Plus que ${days} jours ! Préparez-vous pour ${targetYear} !`;
        } else if (days > 1) {
            messageElement.textContent = `Plus que ${days} jours avant le Nouvel An ${targetYear} !`;
        } else if (days === 1) {
            messageElement.textContent = `Dernier jour avant ${targetYear} ! Préparez les célébrations !`;
            messageElement.style.color = "var(--gold)";
        } else if (days === 0 && hours > 12) {
            messageElement.textContent = `C'est aujourd'hui ! ${targetYear} arrive ce soir !`;
            messageElement.style.color = "var(--gold)";
        } else if (days === 0 && hours > 6) {
            messageElement.textContent = `Plus que ${hours} heures avant ${targetYear} !`;
            messageElement.style.color = "var(--gold)";
            messageElement.style.fontWeight = "bold";
        } else if (days === 0 && hours > 1) {
            messageElement.textContent = `Plus que ${hours} heures et ${minutes} minutes !`;
            messageElement.style.color = "var(--red-light)";
            messageElement.style.fontWeight = "bold";
        } else if (days === 0 && hours === 1) {
            messageElement.textContent = `Dernière heure avant ${targetYear} !`;
            messageElement.style.color = "var(--red-light)";
            messageElement.style.fontWeight = "bold";
            messageElement.style.animation = "pulse 1s infinite";
        } else if (days === 0 && hours === 0 && minutes > 10) {
            messageElement.textContent = `Plus que ${minutes} minutes ! Tenez-vous prêts !`;
            messageElement.style.color = "var(--red-light)";
            messageElement.style.fontWeight = "bold";
            messageElement.style.animation = "pulse 0.5s infinite";
        } else if (days === 0 && hours === 0 && minutes > 1) {
            messageElement.textContent = `Dernières minutes avant ${targetYear} !`;
            messageElement.style.color = "var(--red)";
            messageElement.style.fontWeight = "bold";
            messageElement.style.animation = "pulse 0.3s infinite";
        } else if (days === 0 && hours === 0 && minutes === 1) {
            messageElement.textContent = `Dernière minute !!!`;
            messageElement.style.color = "var(--red)";
            messageElement.style.fontWeight = "bold";
            messageElement.style.animation = "pulse 0.2s infinite";
        } else if (days === 0 && hours === 0 && minutes === 0 && seconds > 10) {
            messageElement.textContent = `${seconds}...`;
            messageElement.style.color = "var(--red)";
            messageElement.style.fontWeight = "bold";
            messageElement.style.animation = "pulse 0.1s infinite";
        } else if (days === 0 && hours === 0 && minutes === 0 && seconds > 0) {
            messageElement.textContent = `${seconds}...`;
            messageElement.style.color = "var(--red)";
            messageElement.style.fontWeight = "bold";
            messageElement.style.fontSize = "1.5rem";
            messageElement.style.animation = "pulse 0.1s infinite";
        } else if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
            // C'EST LE NOUVEL AN !
            messageElement.innerHTML = `🎉 <strong>BONNE ANNÉE ${targetYear} !</strong> 🎉`;
            messageElement.style.color = "var(--gold)";
            messageElement.style.fontWeight = "bold";
            messageElement.style.animation = "pulse 0.5s infinite, glow 2s infinite";
            
            // Mettre à jour le site pour la nouvelle année
            celebrateNewYear(targetYear);
        } else {
            messageElement.textContent = "Le meilleur est encore à venir...";
        }
    }
    
    function celebrateNewYear(newYear) {
        // Mettre à jour toutes les années sur le site
        document.querySelectorAll('.hero-year, .year, #current-year, #dynamic-year').forEach(el => {
            el.textContent = newYear;
        });
        
        // Mettre à jour les vœux
        document.querySelectorAll('.section-title .highlight, .section-subtitle').forEach(el => {
            if (el.textContent.includes('2026') || el.textContent.includes('2027')) {
                el.textContent = el.textContent.replace(/\d{4}/, newYear);
            }
        });
        
        // Feux d'artifice massifs
        launchFireworks(100);
        
        // Confettis
        launchConfetti(300);
        
        // Jouer un son (optionnel)
        playNewYearSound();
    }
    
    function launchFireworks(count) {
        const container = document.getElementById('fireworks');
        if (!container) return;
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                
                // Position aléatoire
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight * 0.8 + window.innerHeight * 0.2;
                
                // Couleurs festives
                const colors = ['#D4AF37', '#F4E8C1', '#C62828', '#E53935', '#FFFFFF', '#1A2C50'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                // Taille
                const size = Math.random() * 10 + 5;
                
                // Appliquer styles
                firework.style.left = `${x}px`;
                firework.style.top = `${y}px`;
                firework.style.backgroundColor = color;
                firework.style.width = `${size}px`;
                firework.style.height = `${size}px`;
                firework.style.setProperty('--explode-y', `${y - Math.random() * 400 - 200}px`);
                
                container.appendChild(firework);
                
                // Nettoyer
                setTimeout(() => {
                    if (firework.parentNode) {
                        firework.parentNode.removeChild(firework);
                    }
                }, 2000);
            }, i * 50);
        }
    }
    
    function launchConfetti(count) {
        const container = document.getElementById('confetti-container');
        if (!container) return;
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                // Position
                const x = Math.random() * window.innerWidth;
                
                // Couleur
                const colors = ['#D4AF37', '#F4E8C1', '#C62828', '#E53935', '#FFFFFF'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                // Taille et forme
                const size = Math.random() * 12 + 3;
                const isRound = Math.random() > 0.5;
                const duration = Math.random() * 4 + 2;
                
                // Styles
                confetti.style.left = `${x}px`;
                confetti.style.backgroundColor = color;
                confetti.style.width = `${size}px`;
                confetti.style.height = `${isRound ? size : size / 3}px`;
                confetti.style.borderRadius = isRound ? '50%' : '2px';
                confetti.style.animationDuration = `${duration}s`;
                
                container.appendChild(confetti);
                
                // Nettoyer
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, duration * 1000);
            }, i * 20);
        }
    }
    
    function playNewYearSound() {
        // Créer un son de célébration simple (optionnel)
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.5);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
        } catch (e) {
            console.log("Audio non supporté ou désactivé");
        }
    }
    
    // Initialiser
    updateCountdown();
    setInterval(updateCountdown, 1000);
}
// =========================================
// FONCTION FEU D'ARTIFICE (à ajouter si elle n'existe pas)
// =========================================
function createFirework() {
    const fireworksContainer = document.getElementById('fireworks');
    
    const firework = document.createElement('div');
    firework.className = 'firework';
    
    // Position aléatoire
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    // Couleur aléatoire
    const colors = ['#D4AF37', '#F4E8C1', '#C62828', '#E53935', '#FFFFFF', '#1A2C50'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Taille aléatoire
    const size = Math.random() * 8 + 3;
    
    // Appliquer les styles
    firework.style.left = `${x}px`;
    firework.style.top = `${y}px`;
    firework.style.backgroundColor = color;
    firework.style.width = `${size}px`;
    firework.style.height = `${size}px`;
    firework.style.setProperty('--explode-y', `${y - Math.random() * 300 - 100}px`);
    
    // Ajouter au conteneur
    fireworksContainer.appendChild(firework);
    
    // Supprimer après l'animation
    setTimeout(() => {
        if (firework.parentNode) {
            firework.parentNode.removeChild(firework);
        }
    }, 1500);
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