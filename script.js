document.addEventListener('DOMContentLoaded', function() {
    // Navbar Scroll Effect with Parallax
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Navbar effect
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Parallax effect for hero section
        if (hero) {
            hero.style.transform = `translateY(${currentScroll * 0.4}px)`;
            hero.style.opacity = 1 - (currentScroll * 0.002);
        }

        lastScroll = currentScroll;
    });

    // Smooth Scrolling with Progress Indicator
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                // Create progress indicator
                const progress = document.createElement('div');
                progress.className = 'scroll-progress';
                document.body.appendChild(progress);

                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;

                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const percentage = Math.min(timeElapsed / duration, 1);
                    
                    const easing = t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; // Cubic easing
                    const run = easing(percentage);

                    window.scrollTo(0, startPosition + distance * run);
                    progress.style.width = `${percentage * 100}%`;

                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    } else {
                        document.body.removeChild(progress);
                    }
                }

                requestAnimationFrame(animation);
                navbarMenu.classList.remove('active');
            }
        });
    });

    // Éléments du DOM
    const chapters = document.querySelectorAll('.chapter');
    const content = document.querySelector('.content');
    const readingProgressBar = document.querySelector('.reading-progress-bar');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    let currentChapter = 0;
    let totalProgress = 0;

    // Initialisation
    updateReadingProgress();
    setupChapterNavigation();

    // Gestion du scroll et de la progression
    window.addEventListener('scroll', () => {
        updateReadingProgress();
        highlightCurrentSection();
    });

    function updateReadingProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = content.scrollHeight - windowHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / documentHeight) * 100;
        
        readingProgressBar.style.setProperty('--progress', `${progress}%`);
        totalProgress = Math.max(totalProgress, progress);
        
        // Mise à jour de la barre de progression globale
        document.querySelector('.progress').style.width = `${totalProgress}%`;
        document.querySelector('.progress-text').textContent = `${Math.round(totalProgress)}% Complété`;

        // Mise à jour de la progression du chapitre actuel
        chapters[currentChapter].querySelector('.chapter-progress').style.width = `${progress}%`;
    }

    function highlightCurrentSection() {
        const sections = document.querySelectorAll('.lesson-section');
        const windowHeight = window.innerHeight;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = (rect.top <= windowHeight * 0.5) && (rect.bottom >= windowHeight * 0.5);
            
            if (isVisible) {
                section.classList.add('active');
                section.style.transform = 'translateY(0)';
                section.style.opacity = '1';
            }
        });
    }

    function setupChapterNavigation() {
        chapters.forEach((chapter, index) => {
            chapter.addEventListener('click', () => {
                switchChapter(index);
            });
        });

        // Navigation avec les boutons
        prevBtn.addEventListener('click', () => {
            if (currentChapter > 0) {
                switchChapter(currentChapter - 1);
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentChapter < chapters.length - 1) {
                switchChapter(currentChapter + 1);
            }
        });

        // Navigation au clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && currentChapter < chapters.length - 1) {
                switchChapter(currentChapter + 1);
            } else if (e.key === 'ArrowLeft' && currentChapter > 0) {
                switchChapter(currentChapter - 1);
            }
        });
    }

    function switchChapter(index) {
        // Mise à jour de l'état des chapitres
        chapters.forEach((chapter, i) => {
            chapter.classList.toggle('active', i === index);
        });

        // Mise à jour des boutons de navigation
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === chapters.length - 1;

        // Animation de transition
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            // Ici, vous chargeriez normalement le contenu du nouveau chapitre
            // Pour l'instant, nous avons juste le premier chapitre
            
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
            currentChapter = index;
            window.scrollTo(0, 0);
        }, 300);
    }

    // Animation des sections au scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '-50px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    // Observer les sections pour les animations
    document.querySelectorAll('.lesson-section').forEach(section => {
        section.style.transform = 'translateY(20px)';
        section.style.opacity = '0';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });

    // Animation de la timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.6s ease ${index * 0.2}s`;
        
        observer.observe(item);
    });

    // Interactive demo controls with enhanced animations
    const demoControls = document.querySelectorAll('.control-btn');
    let isPlaying = false;
    let rotation = 0;

    demoControls.forEach(control => {
        control.addEventListener('click', function() {
            const action = this.querySelector('i').className;
            const viewport = document.querySelector('.demo-viewport');
            
            if (action.includes('play')) {
                isPlaying = !isPlaying;
                this.querySelector('i').className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
                animateDemo(viewport, isPlaying);
            } else if (action.includes('rotate')) {
                rotation += 90;
                viewport.style.transform = `rotate(${rotation}deg)`;
            } else if (action.includes('expand')) {
                viewport.classList.toggle('fullscreen');
                if (viewport.classList.contains('fullscreen')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }
        });
    });

    function animateDemo(element, play) {
        if (play) {
            element.style.animation = 'demo-animation 2s infinite';
        } else {
            element.style.animation = 'none';
        }
    }

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .lesson-section {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }

        .lesson-section.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .concept-item {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .concept-item.visible {
            opacity: 1;
            transform: translateY(0);
        }

        @keyframes demo-animation {
            0% { transform: scale(1) rotate(${rotation}deg); }
            50% { transform: scale(1.05) rotate(${rotation}deg); }
            100% { transform: scale(1) rotate(${rotation}deg); }
        }
    `;
    document.head.appendChild(style);

    // Gestion des fonctions principales et contraintes
    setupFunctionHandlers('main-functions');
    setupFunctionHandlers('constraint-functions');

    // Gestion des contraintes
    setupConstraintHandlers('technical-constraints');
    setupConstraintHandlers('normative-constraints');
    setupConstraintHandlers('economic-constraints');

    // Gestion des livrables
    setupDeliverableHandlers();

    // Gestion des boutons d'action
    setupActionButtons();
});

function setupFunctionHandlers(containerId) {
    const container = document.getElementById(containerId);
    
    // Ajouter une nouvelle fonction
    container.querySelector('.add-function-btn').addEventListener('click', function() {
        const functionItem = container.querySelector('.function-item').cloneNode(true);
        functionItem.querySelector('.function-input').value = '';
        functionItem.querySelector('.criteria-input').value = '';
        functionItem.querySelector('.level-input').value = '';
        
        // Réinitialiser les critères
        const criteriaContainer = functionItem.querySelector('.criteria-container');
        while (criteriaContainer.children.length > 1) {
            criteriaContainer.removeChild(criteriaContainer.lastChild);
        }
        
        setupCriteriaHandlers(functionItem);
        container.insertBefore(functionItem, this);
    });

    // Configurer les gestionnaires pour les éléments existants
    container.querySelectorAll('.function-item').forEach(setupCriteriaHandlers);
}

function setupCriteriaHandlers(functionItem) {
    // Ajouter un nouveau critère
    functionItem.querySelector('.add-criteria-btn').addEventListener('click', function() {
        const criteriaContainer = functionItem.querySelector('.criteria-container');
        const newCriteria = document.createElement('div');
        newCriteria.className = 'criteria-container';
        newCriteria.innerHTML = `
            <input type="text" placeholder="Critère" class="criteria-input">
            <input type="text" placeholder="Niveau" class="level-input">
            <select class="flexibility-select">
                <option value="F0">F0 - Impératif</option>
                <option value="F1">F1 - Peu négociable</option>
                <option value="F2">F2 - Négociable</option>
            </select>
            <button class="remove-btn"><i class="fas fa-times"></i></button>
        `;
        
        newCriteria.querySelector('.remove-btn').addEventListener('click', function() {
            newCriteria.remove();
        });
        
        criteriaContainer.parentNode.insertBefore(newCriteria, this);
    });
}

function setupConstraintHandlers(containerId) {
    const container = document.getElementById(containerId);
    
    // Ajouter une nouvelle contrainte
    container.querySelector('.add-constraint-btn').addEventListener('click', function() {
        const constraintItem = container.querySelector('.constraint-item').cloneNode(true);
        constraintItem.querySelector('input').value = '';
        
        setupRemoveHandler(constraintItem);
        container.insertBefore(constraintItem, this);
    });

    // Configurer les gestionnaires pour les éléments existants
    container.querySelectorAll('.constraint-item').forEach(setupRemoveHandler);
}

function setupDeliverableHandlers() {
    const container = document.getElementById('deliverables');
    
    // Ajouter un nouveau livrable
    container.querySelector('.add-deliverable-btn').addEventListener('click', function() {
        const deliverableItem = container.querySelector('.deliverable-item').cloneNode(true);
        deliverableItem.querySelector('input[type="text"]').value = '';
        deliverableItem.querySelector('input[type="date"]').value = '';
        
        setupRemoveHandler(deliverableItem);
        container.insertBefore(deliverableItem, this);
    });

    // Configurer les gestionnaires pour les éléments existants
    container.querySelectorAll('.deliverable-item').forEach(setupRemoveHandler);
}

function setupRemoveHandler(item) {
    const removeBtn = item.querySelector('.remove-btn');
    if (removeBtn) {
        removeBtn.addEventListener('click', function() {
            item.remove();
        });
    }
}

function setupActionButtons() {
    // Sauvegarder le formulaire
    document.querySelector('.save-btn').addEventListener('click', function() {
        const formData = collectFormData();
        console.log('Données du formulaire :', formData);
        // Ici, vous pouvez ajouter la logique pour sauvegarder les données
        alert('Formulaire sauvegardé !');
    });

    // Exporter en PDF
    document.querySelector('.export-btn').addEventListener('click', function() {
        // Ici, vous pouvez ajouter la logique pour exporter en PDF
        alert('Export PDF en cours de développement');
    });
}

function collectFormData() {
    return {
        informationsGenerales: {
            nomProjet: document.getElementById('project-name').value,
            reference: document.getElementById('project-ref').value,
            date: document.getElementById('project-date').value
        },
        contexte: {
            description: document.getElementById('project-context').value,
            objectifs: document.getElementById('project-objectives').value
        },
        fonctionsPrincipales: collectFunctions('main-functions'),
        fonctionsContraintes: collectFunctions('constraint-functions'),
        contraintes: {
            techniques: collectConstraints('technical-constraints'),
            normatives: collectConstraints('normative-constraints'),
            economiques: collectConstraints('economic-constraints')
        },
        livrables: collectDeliverables()
    };
}

function collectFunctions(containerId) {
    const functions = [];
    document.getElementById(containerId).querySelectorAll('.function-item').forEach(item => {
        const func = {
            nom: item.querySelector('.function-input').value,
            criteres: []
        };
        
        item.querySelectorAll('.criteria-container').forEach(criteria => {
            const criteriaInput = criteria.querySelector('.criteria-input');
            const levelInput = criteria.querySelector('.level-input');
            const flexibilitySelect = criteria.querySelector('.flexibility-select');
            
            if (criteriaInput && levelInput && flexibilitySelect) {
                func.criteres.push({
                    critere: criteriaInput.value,
                    niveau: levelInput.value,
                    flexibilite: flexibilitySelect.value
                });
            }
        });
        
        functions.push(func);
    });
    return functions;
}

function collectConstraints(containerId) {
    const constraints = [];
    document.getElementById(containerId).querySelectorAll('.constraint-item input').forEach(input => {
        if (input.value.trim()) {
            constraints.push(input.value);
        }
    });
    return constraints;
}

function collectDeliverables() {
    const deliverables = [];
    document.getElementById('deliverables').querySelectorAll('.deliverable-item').forEach(item => {
        const description = item.querySelector('input[type="text"]').value;
        const date = item.querySelector('input[type="date"]').value;
        if (description.trim()) {
            deliverables.push({ description, date });
        }
    });
    return deliverables;
} 