// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Search Toggle
const searchBtn = document.querySelector('.search-btn');
const searchBox = document.querySelector('.search-box');
const searchClose = document.querySelector('.search-close');

searchBtn.addEventListener('click', () => {
    searchBox.classList.toggle('active');
});

searchClose.addEventListener('click', () => {
    searchBox.classList.remove('active');
});

// Cart Toggle
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartClose = document.querySelector('.cart-close');
const continueShopping = document.querySelector('.continue-shopping');

cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    cartSidebar.classList.add('active');
    document.body.style.overflow = 'hidden';
});

cartClose.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    document.body.style.overflow = '';
});

continueShopping.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    document.body.style.overflow = '';
});

// Quick View Modal
const quickViewBtns = document.querySelectorAll('.quick-view');
const quickViewModal = document.querySelector('.quick-view-modal');
const modalClose = document.querySelector('.modal-close');

quickViewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        quickViewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', () => {
    quickViewModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    if (e.target === quickViewModal) {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Wishlist Toggle
const wishlistBtns = document.querySelectorAll('.wishlist-btn');

wishlistBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.replace('far', 'fas');
            icon.style.color = '#ff4444';
        } else {
            icon.classList.replace('fas', 'far');
            icon.style.color = '';
        }
    });
});

// Add to Cart Animation
const addToCartBtns = document.querySelectorAll('.add-to-cart');

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        
        // Add animation
        this.textContent = 'Added!';
        this.style.background = '#4CAF50';
        
        setTimeout(() => {
            this.textContent = 'Add to Cart';
            this.style.background = '';
        }, 2000);
        
        // Update cart count (in a real app, this would update state)
        const cartBadge = document.querySelector('.cart-icon .icon-badge');
        let currentCount = parseInt(cartBadge.textContent);
        cartBadge.textContent = currentCount + 1;
        
        console.log(`Added to cart: ${productName}`);
    });
});

// Quantity Controls
const quantityControls = document.querySelectorAll('.quantity-controls');

quantityControls.forEach(control => {
    const minusBtn = control.querySelector('button:first-child');
    const plusBtn = control.querySelector('button:last-child');
    const quantitySpan = control.querySelector('span');
    
    let quantity = parseInt(quantitySpan.textContent);
    
    minusBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity;
            updateCartTotal();
        }
    });
    
    plusBtn.addEventListener('click', () => {
        quantity++;
        quantitySpan.textContent = quantity;
        updateCartTotal();
    });
});

// Remove Cart Items
const removeItems = document.querySelectorAll('.remove-item');

removeItems.forEach(btn => {
    btn.addEventListener('click', function() {
        const cartItem = this.closest('.cart-item');
        cartItem.style.animation = 'fadeOut 0.3s ease';
        
        setTimeout(() => {
            cartItem.remove();
            updateCartTotal();
            updateCartCount();
        }, 300);
    });
});

// Update Cart Total
function updateCartTotal() {
    // In a real app, this would calculate based on actual prices and quantities
    console.log('Cart total updated');
}

// Update Cart Count
function updateCartCount() {
    const cartItems = document.querySelectorAll('.cart-item');
    const cartBadge = document.querySelector('.cart-icon .icon-badge');
    cartBadge.textContent = cartItems.length;
    
    const cartHeader = document.querySelector('.cart-header h3');
    cartHeader.textContent = `Your Cart (${cartItems.length})`;
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    // Simulate form submission
    this.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <i class="fas fa-check-circle" style="font-size: 3rem; color: #4CAF50; margin-bottom: 1rem;"></i>
            <h3>Thank You!</h3>
            <p>You've been subscribed to our newsletter.</p>
        </div>
    `;
    
    console.log(`Newsletter subscription: ${email}`);
});

// Smooth Scrolling for Navigation Links
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

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--white)';
        header.style.backdropFilter = 'none';
    }
});

// Product Image Lazy Loading
const productImages = document.querySelectorAll('.product-image img');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

productImages.forEach(img => {
    imageObserver.observe(img);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(-20px); }
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

console.log('Urban Charm website loaded successfully!');