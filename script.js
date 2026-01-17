// Inject dynamic CSS for animations and notifications
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    /* Smooth Reveal Animation Classes */
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
    }
    .reveal.active {
        opacity: 1;
        transform: translateY(0);
    }

    /* Custom Toast Notification */
    .toast-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #111;
        color: #fff;
        padding: 12px 24px;
        border-radius: 8px;
        border-left: 4px solid #00a8ff;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        font-family: sans-serif;
    }
    .toast-notification.show {
        transform: translateY(0);
        opacity: 1;
    }
`;
document.head.appendChild(styleSheet);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Create and show custom toast instead of alert
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = 'Thank you! I will get back to you soon.';
        document.body.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => toast.classList.add('show'));

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);

        this.reset();
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters view
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once for better performance
        }
    });
}, observerOptions);

// Target elemen di SEMUA halaman (Home, About, Projects, Contact)
const animateElements = document.querySelectorAll('.project, .hero-content > *, .about-img, #about p, form, section h2');
animateElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// Page Transition (Exit Animation)
document.querySelectorAll('a:not([href^="#"])').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Pastikan link valid dan internal (bukan link eksternal/hash)
        if (href && href !== '#' && !href.startsWith('http') && !this.target) {
            e.preventDefault();
            document.body.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            document.body.style.opacity = '0';
            document.body.style.transform = 'translateY(-15px)';
            
            setTimeout(() => {
                window.location.href = href;
            }, 400); // Tunggu animasi selesai sebelum pindah
        }
    });
});

// Typing Animation Effect
const typingElement = document.querySelector('.typing-text');
if (typingElement) {
    const textToType = "Seka Afrul Anjas"; // Teks yang akan diketik
    let charIndex = 0;

    function typeText() {
        if (charIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100); // Kecepatan mengetik (100ms per huruf)
        }
    }

    // Mulai mengetik setelah jeda 1 detik (setelah animasi halaman selesai)
    setTimeout(typeText, 1000);
}
