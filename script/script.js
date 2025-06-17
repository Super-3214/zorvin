document.addEventListener('DOMContentLoaded', function() {
    // ---- Variables Globales ----
    const navbar = document.getElementById('navbar');
    const themeToggle = document.getElementById('theme-toggle');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const videoCards = document.querySelectorAll('.video-card');
    const form = document.getElementById('form');

    // ---- Cambiar Tema Claro/Oscuro ----
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme); // Aplicar al <html>
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        localStorage.setItem('theme', theme);
    };

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // Cargar tema guardado al inicio
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // ---- Menú Hamburguesa ----
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // ---- Efecto de Navbar al Hacer Scroll ----
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ---- Filtro de Vídeos ----
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;

            videoCards.forEach(card => {
                card.style.display = 'none'; // Ocultar primero
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block'; // Mostrar si coincide
                }
            });
        });
    });

    // ---- NUEVO: Animación de Elementos al Hacer Scroll (Intersection Observer) ----
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Dejar de observar una vez que es visible
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1, // 10% del elemento debe ser visible
        rootMargin: '0px 0px -50px 0px' // Empieza la animación un poco antes
    });

    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach(element => {
        revealObserver.observe(element);
    });

    // ---- Animación de Barras de Progreso de Habilidades ----
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const progressBar = skillItem.querySelector('.progress');
                const percent = skillItem.querySelector('.percent').textContent;
                progressBar.style.width = percent;
                observer.unobserve(skillItem); // Animar solo una vez
            }
        });
    }, {
        threshold: 0.5 // Cuando el 50% de la barra es visible
    });

    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        skillObserver.observe(item);
    });

    // ---- Manejo del Formulario de Contacto ----
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
        form.reset();
    });
});