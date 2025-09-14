// =============================================
// PART 1: JAVASCRIPT EVENT HANDLING
// =============================================

/**
 * Dark/Light Mode Toggle
 * Listens for click events on the theme toggle button
 * and switches between light and dark themes
 */
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeToggleBtn.textContent = '☀️ Light Mode';
        } else {
            themeToggleBtn.textContent = '🌙 Dark Mode';
        }
        
        // Save theme preference to localStorage
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        
        // Trigger animation on theme change
        triggerThemeChangeAnimation();
    });

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleBtn.textContent = '☀️ Light Mode';
    }

    // ===============================
    // Original Code: Variables & Conditionals
    // ===============================

    // Prompt the user for their name and greet accordingly
    const name = prompt("Welcome to OMORO's Jewelry! What's your name?", "Guest") || "Guest";
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning"
                    : hour < 18 ? "Good afternoon"
                    : "Good evening";

    console.log(`${greeting}, ${name}!`);

    // Update header paragraph with a personalized greeting
    const headerPara = document.querySelector("header p");
    if (headerPara) {
        headerPara.textContent = `${greeting}, ${name}! Welcome to our jewelry showcase.`;
    }

    // ===============================
    // PART 2: JAVASCRIPT FUNCTIONS - SCOPE, PARAMETERS & RETURN VALUES
    // ===============================

    /**
     * calculateTotal() – computes total price after discount
     * @param {number} price - unit price
     * @param {number} quantity - number of items
     * @param {number} discount - fractional discount (e.g. 0.1 for 10%)
     * @returns {number}
     */
    function calculateTotal(price, quantity, discount = 0) {
        // Local scope variables
        const subtotal = price * quantity;
        const discountAmount = subtotal * discount;
        const total = subtotal - discountAmount;
        
        return total;
    }

    /**
     * formatCurrency() – formats numbers as currency string
     * @param {number} amount
     * @returns {string}
     */
    function formatCurrency(amount) {
        return `$${amount.toFixed(2)}`;
    }

    /**
     * calculateTax() - calculates tax based on location
     * @param {number} amount - the amount to calculate tax for
     * @param {string} state - state code for tax calculation
     * @returns {number} - tax amount
     */
    function calculateTax(amount, state = 'CA') {
        // Tax rates by state (simplified for demo)
        const taxRates = {
            'CA': 0.0825,
            'NY': 0.08875,
            'TX': 0.0625,
            'FL': 0.06,
            'default': 0.07
        };
        
        const rate = taxRates[state] || taxRates.default;
        return amount * rate;
    }

    /**
     * getFinalPrice() - demonstrates function composition
     * @param {number} price - base price
     * @param {number} quantity - quantity
     * @param {string} state - state for tax calculation
     * @param {number} discount - discount percentage
     * @returns {object} - object with breakdown of costs
     */
    function getFinalPrice(price, quantity, state = 'CA', discount = 0) {
        const subtotal = calculateTotal(price, quantity, discount);
        const tax = calculateTax(subtotal, state);
        const total = subtotal + tax;
        
        return {
            subtotal: formatCurrency(subtotal),
            tax: formatCurrency(tax),
            total: formatCurrency(total),
            breakdown: `Subtotal: ${formatCurrency(subtotal)}, Tax: ${formatCurrency(tax)}, Total: ${formatCurrency(total)}`
        };
    }

    // Example usage
    console.log(getFinalPrice(500, 2, 'CA', 0.1));

    // ===============================
    // Original Code: Loops
    // ===============================

    const productNames = ["Gemstone Ring", "Pearl Necklace", "Diamond Earrings"];

    // Traditional for loop
    for (let i = 0; i < productNames.length; i++) {
        console.log(`Product ${i + 1}: ${productNames[i]}`);
    }

    // forEach loop
    productNames.forEach((product, index) => {
        console.log(`(forEach) ${index + 1}: ${product}`);
    });

    // ===============================
    // PART 2: BUILDING INTERACTIVE ELEMENTS
    // ===============================

    /**
     * Product Counter Implementation
     * Allows users to track interest in each product
     */
    const counterButtons = document.querySelectorAll('.counter-btn');
    const counterValues = {
        ring: 0,
        necklace: 0,
        earrings: 0
    };

    // Load saved counter values from localStorage
    const savedCounters = localStorage.getItem('productCounters');
    if (savedCounters) {
        const parsedCounters = JSON.parse(savedCounters);
        Object.keys(parsedCounters).forEach(product => {
            if (counterValues.hasOwnProperty(product)) {
                counterValues[product] = parsedCounters[product];
                document.getElementById(`${product}-counter`).textContent = parsedCounters[product];
            }
        });
    }

    // Event listeners for counter buttons
    counterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.dataset.product;
            const action = this.dataset.action;
            
            if (action === 'increment') {
                counterValues[product]++;
            } else if (action === 'decrement' && counterValues[product] > 0) {
                counterValues[product]--;
            }
            
            // Update display with animation
            const counterElement = document.getElementById(`${product}-counter`);
            counterElement.textContent = counterValues[product];
            
            // Add highlight animation
            counterElement.classList.add('highlight');
            setTimeout(() => {
                counterElement.classList.remove('highlight');
            }, 1000);
            
            // Save to localStorage
            localStorage.setItem('productCounters', JSON.stringify(counterValues));
            
            console.log(`${product} counter: ${counterValues[product]}`);
        });
    });

    /**
     * Interactive FAQ Section
     * Allows users to expand/collapse FAQ answers
     */
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('span');
            
            // Toggle answer visibility with animation
            answer.classList.toggle('show');
            
            // Change icon
            if (answer.classList.contains('show')) {
                icon.textContent = '−';
            } else {
                icon.textContent = '+';
            }
        });
    });

    /**
     * Image Lightbox
     * Allows users to view product images in a lightbox
     */
    const productImages = document.querySelectorAll('.product img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    
    productImages.forEach(image => {
        image.addEventListener('click', function() {
            lightbox.style.display = 'flex';
            lightboxImage.src = this.src;
            lightboxImage.alt = this.alt;
        });
    });
    
    lightboxClose.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // ===============================
    // PART 3: FORM VALIDATION WITH JAVASCRIPT
    // ===============================

    /**
     * Form Validation
     * Validates name, email, phone, and product selection on form submission
     * Shows appropriate error messages for invalid inputs
     */
    const orderForm = document.getElementById('order-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const productSelect = document.getElementById('product');
    const quantityInput = document.getElementById('quantity');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const productError = document.getElementById('product-error');
    const quantityError = document.getElementById('quantity-error');
    const successMessage = document.getElementById('form-success');
    
    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+0-9\- ]{7,15}$/;
    
    // Validate name field
    function validateName() {
        if (nameInput.value.trim().length < 2) {
            nameError.style.display = 'block';
            nameInput.classList.add('invalid');
            nameInput.classList.remove('valid');
            return false;
        } else {
            nameError.style.display = 'none';
            nameInput.classList.remove('invalid');
            nameInput.classList.add('valid');
            return true;
        }
    }
    
    // Validate email field
    function validateEmail() {
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.style.display = 'block';
            emailInput.classList.add('invalid');
            emailInput.classList.remove('valid');
            return false;
        } else {
            emailError.style.display = 'none';
            emailInput.classList.remove('invalid');
            emailInput.classList.add('valid');
            return true;
        }
    }
    
    // Validate phone field
    function validatePhone() {
        if (!phoneRegex.test(phoneInput.value.trim())) {
            phoneError.style.display = 'block';
            phoneInput.classList.add('invalid');
            phoneInput.classList.remove('valid');
            return false;
        } else {
            phoneError.style.display = 'none';
            phoneInput.classList.remove('invalid');
            phoneInput.classList.add('valid');
            return true;
        }
    }
    
    // Validate product selection
    function validateProduct() {
        if (!productSelect.value) {
            productError.style.display = 'block';
            productSelect.classList.add('invalid');
            productSelect.classList.remove('valid');
            return false;
        } else {
            productError.style.display = 'none';
            productSelect.classList.remove('invalid');
            productSelect.classList.add('valid');
            return true;
        }
    }
    
    // Validate quantity
    function validateQuantity() {
        if (quantityInput.value < 1 || quantityInput.value > 10) {
            quantityError.style.display = 'block';
            quantityInput.classList.add('invalid');
            quantityInput.classList.remove('valid');
            return false;
        } else {
            quantityError.style.display = 'none';
            quantityInput.classList.remove('invalid');
            quantityInput.classList.add('valid');
            return true;
        }
    }
    
    // Real-time validation as user types
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    phoneInput.addEventListener('input', validatePhone);
    productSelect.addEventListener('change', validateProduct);
    quantityInput.addEventListener('input', validateQuantity);
    
    // Form submission handler
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isProductValid = validateProduct();
        const isQuantityValid = validateQuantity();
        
        // If all fields are valid, show success message
        if (isNameValid && isEmailValid && isPhoneValid && isProductValid && isQuantityValid) {
            successMessage.style.display = 'block';
            
            // Get form data
            const formData = {
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                product: productSelect.options[productSelect.selectedIndex].text,
                quantity: quantityInput.value,
                message: document.getElementById('message').value,
                contactMethod: document.querySelector('input[name="contact_method"]:checked').value
            };
            
            console.log("Form Data Submitted:", formData);
            
            // Trigger celebration animation
            triggerCelebration();
            
            // Reset form after 3 seconds
            setTimeout(function() {
                orderForm.reset();
                successMessage.style.display = 'none';
                
                // Clear validation styles
                const validatedElements = document.querySelectorAll('.valid, .invalid');
                validatedElements.forEach(el => {
                    el.classList.remove('valid');
                    el.classList.remove('invalid');
                });
            }, 3000);
        }
    });

    // ===============================
    // PART 3: COMBINING CSS ANIMATIONS WITH JAVASCRIPT
    // ===============================

    /**
     * Theme change animation
     * Creates a smooth transition effect when changing themes
     */
    function triggerThemeChangeAnimation() {
        const elements = document.querySelectorAll('section, aside, header, nav, footer, .product');
        
        elements.forEach(element => {
            element.style.transition = 'all 0.5s ease';
        });
        
        setTimeout(() => {
            elements.forEach(element => {
                element.style.transition = '';
            });
        }, 500);
    }

    /**
     * Celebration animation
     * Creates a confetti effect when form is successfully submitted
     */
    function triggerCelebration() {
        const celebration = document.createElement('div');
        celebration.classList.add('celebration');
        
        // Create confetti elements
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random colors
            const colors = ['#ff5252', '#ff4081', '#e040fb', '#7c4dff', '#536dfe', '#448aff', '#40c4ff', '#18ffff', '#64ffda', '#69f0ae'];
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            // Random position and animation
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.animation = `confettiFall ${(Math.random() * 3) + 2}s linear forwards`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            
            celebration.appendChild(confetti);
        }
        
        document.body.appendChild(celebration);
        
        // Remove after animation completes
        setTimeout(() => {
            document.body.removeChild(celebration);
        }, 5000);
    }

    /**
     * Animation controls
     * Start/stop animations on elements
     */
    const startAnimationBtn = document.getElementById('start-animation');
    const stopAnimationBtn = document.getElementById('stop-animation');
    
    if (startAnimationBtn && stopAnimationBtn) {
        startAnimationBtn.addEventListener('click', () => {
            const products = document.querySelectorAll('.product');
            products.forEach(product => {
                product.style.animation = 'productEntrance 0.8s ease-out';
            });
        });
        
        stopAnimationBtn.addEventListener('click', () => {
            const products = document.querySelectorAll('.product');
            products.forEach(product => {
                product.style.animation = 'none';
            });
        });
    }

    /**
     * Price calculator buttons
     */
    const priceButtons = document.querySelectorAll('.price-calculator');
    priceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const price = parseFloat(this.dataset.price);
            const quantity = parseInt(prompt('Enter quantity:', '1')) || 1;
            const state = prompt('Enter your state (CA, NY, TX, FL):', 'CA') || 'CA';
            
            const finalPrice = getFinalPrice(price, quantity, state);
            alert(`Price Calculation:\n${finalPrice.breakdown}`);
        });
    });

    // ===============================
    // Original Code: DOM Interactions
    // ===============================

    // 1. Toggle highlight class on product click
    const products = document.querySelectorAll(".product");
    products.forEach(product => {
        product.addEventListener("click", () => {
            product.classList.toggle("highlight");
        });
    });

    // 3. Add a Back to Top button dynamically
    const backToTopBtn = document.createElement("button");
    backToTopBtn.textContent = "↑";
    backToTopBtn.id = "back-to-top";
    document.body.appendChild(backToTopBtn);

    // Style the button
    Object.assign(backToTopBtn.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "0.8rem 1rem",
        border: "none",
        borderRadius: "50%",
        backgroundColor: "#336699",
        color: "#ffffff",
        cursor: "pointer",
        display: "none",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        transition: "all 0.3s ease",
        zIndex: "999"
    });

    // Show/hide based on scroll position, with smooth scroll on click
    window.addEventListener("scroll", () => {
        backToTopBtn.style.display = window.scrollY >= 200 ? "block" : "none";
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});