// FAQ Toggle Functionality
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Animate drone markers on map
function createDroneMarkers() {
    const worldMap = document.getElementById('worldMap');
    const dronePositions = [
        { top: '25%', left: '15%' },  // Europe
        { top: '35%', left: '45%' },  // Asia
        { top: '45%', left: '25%' },  // Africa
        { top: '30%', left: '75%' },  // North America
        { top: '55%', left: '70%' },  // South America
        { top: '65%', left: '85%' },  // Australia
        { top: '20%', left: '35%' },  // Russia
        { top: '40%', left: '55%' },  // India
        { top: '28%', left: '52%' },  // China
        { top: '32%', left: '78%' },  // USA East
        { top: '28%', left: '82%' },  // USA West
        { top: '48%', left: '28%' },  // South Africa
        { top: '22%', left: '22%' },  // Scandinavia
        { top: '15%', left: '48%' },  // Siberia
        { top: '38%', left: '62%' }   // Southeast Asia
    ];

    dronePositions.forEach((pos, index) => {
        setTimeout(() => {
            const drone = document.createElement('div');
            drone.className = 'drone-marker';
            drone.style.top = pos.top;
            drone.style.left = pos.left;
            worldMap.appendChild(drone);
        }, index * 200);
    });
}

// Animate statistics counter
function animateCounters() {
    const counters = [
        { element: document.getElementById('co2-cleaned'), target: 2847392, suffix: '' },
        { element: document.getElementById('active-drones'), target: 15284, suffix: '' },
        { element: document.getElementById('efficiency'), target: 94.2, suffix: '%' },
        { element: document.getElementById('cities'), target: 847, suffix: '' }
    ];

    counters.forEach(counter => {
        if (!counter.element) return;
        
        let current = 0;
        const increment = counter.target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= counter.target) {
                current = counter.target;
                clearInterval(timer);
            }
            
            if (counter.target > 1000) {
                counter.element.textContent = new Intl.NumberFormat('tr-TR').format(Math.floor(current)) + counter.suffix;
            } else {
                counter.element.textContent = current.toFixed(1) + counter.suffix;
            }
        }, 50);
    });
}

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    alert(`Teşekkürler ${data.name}! Mesajınız alındı. En kısa sürede size dönüş yapacağız.`);
    this.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active navigation link on scroll
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Real-time data updates (simulated)
function updateRealTimeData() {
    const stats = {
        co2: Math.floor(Math.random() * 1000) + 2847000,
        drones: Math.floor(Math.random() * 100) + 15250,
        efficiency: (Math.random() * 2 + 93).toFixed(1),
        cities: Math.floor(Math.random() * 10) + 845
    };

    if (document.getElementById('co2-cleaned')) {
        document.getElementById('co2-cleaned').textContent = new Intl.NumberFormat('tr-TR').format(stats.co2);
    }
    if (document.getElementById('active-drones')) {
        document.getElementById('active-drones').textContent = new Intl.NumberFormat('tr-TR').format(stats.drones);
    }
    if (document.getElementById('efficiency')) {
        document.getElementById('efficiency').textContent = stats.efficiency + '%';
    }
    if (document.getElementById('cities')) {
        document.getElementById('cities').textContent = stats.cities;
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        createDroneMarkers();
        animateCounters();
    }, 1000);

    // Update real-time data every 30 seconds
    setInterval(updateRealTimeData, 30000);
});

// Update navigation on scroll
window.addEventListener('scroll', updateActiveNav);

// Add scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease-in-out';
        }
    });
}, observerOptions);

// Observe all major sections
document.querySelectorAll('.stat-card, .feature-card, .pricing-card').forEach(el => {
    observer.observe(el);
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Add floating notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--gradient-card);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: 10px;
        border: 1px solid var(--primary-color);
        z-index: 9999;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        box-shadow: var(--shadow-card);
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.2rem;">${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Show welcome notification after page loads
setTimeout(() => {
    showNotification('AON sistemine hoş geldiniz! Gerçek zamanlı veriler yükleniyor...', 'info');
}, 2000);