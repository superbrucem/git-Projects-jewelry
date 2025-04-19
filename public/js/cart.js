// Shopping Cart Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage or create empty cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart count in the header
    updateCartCount();
    
    // Add event listener to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.cta-button');
    addToCartButtons.forEach(button => {
        if (button.textContent.trim() === 'Add to Cart') {
            button.addEventListener('click', addToCart);
        }
    });
    
    // Add event listener to shopping bag icon
    const shoppingBagIcon = document.querySelector('.header-actions a i.fa-shopping-bag');
    if (shoppingBagIcon) {
        const shoppingBagLink = shoppingBagIcon.closest('a');
        shoppingBagLink.href = '/cart';
        shoppingBagLink.addEventListener('click', function(e) {
            // If cart is empty, prevent navigation and show message
            if (cart.length === 0) {
                e.preventDefault();
                alert('Your cart is empty. Add some items first!');
            }
        });
    }
    
    // Function to add product to cart
    function addToCart(e) {
        // Get product information from the page
        const productContainer = e.target.closest('section');
        const productName = productContainer.querySelector('h2').textContent;
        const productPrice = parseFloat(productContainer.querySelector('span[style*="font-weight: bold"]').textContent.replace('$', ''));
        const productImage = productContainer.querySelector('img').src;
        const productId = window.location.pathname.split('/').pop();
        
        // Check if product is already in cart
        const existingProductIndex = cart.findIndex(item => item.id === productId);
        
        if (existingProductIndex !== -1) {
            // Increment quantity if product already exists
            cart[existingProductIndex].quantity += 1;
        } else {
            // Add new product to cart
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }
        
        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCount();
        
        // Show success message
        showMessage('Product added to cart!', 'success');
    }
    
    // Function to update cart count in header
    function updateCartCount() {
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        
        // Create or update cart count badge
        let cartBadge = document.querySelector('.cart-badge');
        if (!cartBadge && cartCount > 0) {
            const shoppingBagIcon = document.querySelector('.header-actions a i.fa-shopping-bag');
            if (shoppingBagIcon) {
                const shoppingBagLink = shoppingBagIcon.closest('a');
                cartBadge = document.createElement('span');
                cartBadge.className = 'cart-badge';
                cartBadge.style.position = 'absolute';
                cartBadge.style.top = '-8px';
                cartBadge.style.right = '-8px';
                cartBadge.style.backgroundColor = 'var(--accent-color)';
                cartBadge.style.color = 'var(--text-dark)';
                cartBadge.style.borderRadius = '50%';
                cartBadge.style.width = '20px';
                cartBadge.style.height = '20px';
                cartBadge.style.display = 'flex';
                cartBadge.style.alignItems = 'center';
                cartBadge.style.justifyContent = 'center';
                cartBadge.style.fontSize = '12px';
                cartBadge.style.fontWeight = 'bold';
                
                // Make the parent position relative for absolute positioning of badge
                shoppingBagLink.style.position = 'relative';
                shoppingBagLink.appendChild(cartBadge);
            }
        }
        
        if (cartBadge) {
            if (cartCount > 0) {
                cartBadge.textContent = cartCount;
                cartBadge.style.display = 'flex';
            } else {
                cartBadge.style.display = 'none';
            }
        }
    }
    
    // Function to show messages
    function showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '20px';
        messageDiv.style.right = '20px';
        messageDiv.style.padding = '10px 20px';
        messageDiv.style.borderRadius = '4px';
        messageDiv.style.zIndex = '1000';
        messageDiv.style.opacity = '0';
        messageDiv.style.transition = 'opacity 0.3s ease';
        
        if (type === 'success') {
            messageDiv.style.backgroundColor = '#4CAF50';
            messageDiv.style.color = 'white';
        } else if (type === 'error') {
            messageDiv.style.backgroundColor = '#F44336';
            messageDiv.style.color = 'white';
        } else {
            messageDiv.style.backgroundColor = '#2196F3';
            messageDiv.style.color = 'white';
        }
        
        document.body.appendChild(messageDiv);
        
        // Fade in
        setTimeout(() => {
            messageDiv.style.opacity = '1';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 3000);
    }
});
