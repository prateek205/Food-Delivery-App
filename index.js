// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenuSidebar = document.getElementById('mobileMenuSidebar');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const navLinks = document.getElementById('navLinks');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenuSidebar.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
});

// Close mobile menu
function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenuSidebar.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileMenuOverlay.addEventListener('click', closeMobileMenu);

// Close menu when clicking on mobile menu links
document.querySelectorAll('.mobile-menu-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Smooth scroll to section
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active states
            document.querySelectorAll('.mobile-menu-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile menu
            closeMobileMenu();
        }
    });
});

// Update cart count animation
const cartBtn = document.querySelector('.btn-cart');
const cartCount = document.querySelector('.cart-count');
const mobileCartBadge = document.querySelector('.cart-badge');

cartBtn.addEventListener('click', () => {
    // Add animation
    cartBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
    }, 200);
});

// Track order steps animation
const trackSteps = document.querySelectorAll('.track-step');
let currentStep = 0;

function updateTrackSteps() {
    trackSteps.forEach((step, index) => {
        if (index === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    currentStep = (currentStep + 1) % 4;
}

// Update steps every 3 seconds
setInterval(updateTrackSteps, 3000);

// Search functionality
const searchInput = document.querySelector('.search-box input');
const searchBtn = document.querySelector('.btn-search');

searchBtn.addEventListener('click', () => {
    if (searchInput.value.trim()) {
        showNotification(`Searching for: ${searchInput.value}`);
        // In real app, this would trigger search
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Category cards hover effect
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

// Add to cart animation
const dealButtons = document.querySelectorAll('.btn-deal');

dealButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update cart count
        let count = parseInt(cartCount.textContent);
        cartCount.textContent = count + 1;
        
        // Update mobile cart badge
        if (mobileCartBadge) {
            mobileCartBadge.textContent = count + 1;
        }
        
        // Show notification
        showNotification('Item added to cart!');
        
        // Add cart animation
        cartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 300);
    });
});

// Mobile sign in button
const mobileSigninBtn = document.querySelector('.mobile-signin-btn');
if (mobileSigninBtn) {
    mobileSigninBtn.addEventListener('click', () => {
        showNotification('Redirecting to login page...');
        closeMobileMenu();
    });
}

// Mobile app download buttons
document.querySelectorAll('.mobile-app-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        showNotification('Redirecting to app store...');
        closeMobileMenu();
    });
});

// Notification function
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add slide out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Form validation for track order
const trackInput = document.querySelector('.track-input input');
const trackBtn = document.querySelector('.btn-track');

trackBtn.addEventListener('click', () => {
    if (!trackInput.value.trim()) {
        showNotification('Please enter an order ID');
        trackInput.focus();
        return;
    }
    
    // Simulate tracking
    showNotification('Tracking order #' + trackInput.value);
    trackInput.value = '';
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    // Update desktop nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Update mobile menu links
    mobileMenuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Initialize with first step active
updateTrackSteps();