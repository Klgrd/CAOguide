document.addEventListener('DOMContentLoaded', function() {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'flex';
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
            setTimeout(() => {
                if (window.scrollY <= 300) {
                    backToTopButton.style.display = 'none';
                }
            }, 300);
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Intersection Observer for Sections
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Hover Effect for Example Boxes
    const exampleBoxes = document.querySelectorAll('.example-box');
    
    exampleBoxes.forEach(box => {
        box.addEventListener('mousemove', (e) => {
            const rect = box.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            box.style.setProperty('--mouse-x', `${x}px`);
            box.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Steps List Animation
    const steps = document.querySelectorAll('.steps-list li');
    
    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-20px)';
        
        const stepObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        step.style.opacity = '1';
                        step.style.transform = 'translateX(0)';
                    }, index * 200);
                    stepObserver.unobserve(step);
                }
            });
        }, { threshold: 0.5 });
        
        stepObserver.observe(step);
    });

    // Initialize AOS
    document.querySelectorAll('.example-box img').forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                    imgObserver.unobserve(img);
                }
            });
        }, { threshold: 0.5 });
        
        imgObserver.observe(img);
    });

    // Animation du diagramme d'étapes
    const stepItems = document.querySelectorAll('.step-item');
    
    stepItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        const stepObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 200);
                    stepObserver.unobserve(item);
                }
            });
        }, { threshold: 0.5 });
        
        stepObserver.observe(item);
    });

    // Effet de survol amélioré pour les étapes
    stepItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            stepItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.7';
                    otherItem.style.transform = 'scale(0.95)';
                }
            });
        });

        item.addEventListener('mouseleave', () => {
            stepItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
                otherItem.style.transform = 'scale(1)';
            });
        });
    });
}); 