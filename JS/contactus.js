// Form validation with Bootstrap
document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('contactForm');
        
        // Enable validation
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            form.classList.add('was-validated');
            
            if (form.checkValidity()) {
                // If form is valid, show success message
                event.preventDefault();
                showAlert('Thank you! Your message has been sent successfully.', 'success');
                form.reset();
                form.classList.remove('was-validated');
            }
        }, false);
        
        // Phone number validation
        const phoneInput = document.getElementById('phone');
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9+]/g, '');
        });
        
        // Email validation
        const emailInput = document.getElementById('email');
        emailInput.addEventListener('blur', function() {
            if (!validateEmail(this.value) && this.value) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });
        
        // Show alert message
        function showAlert(message, type) {
            // Remove existing alerts
            const oldAlert = document.querySelector('.alert');
            if (oldAlert) oldAlert.remove();
            
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${type} fade show`;
            alertDiv.innerHTML = `
                <span>${message}</span>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            
            const form = document.querySelector('.contact-form');
            form.insertBefore(alertDiv, form.firstChild);
            
            // Auto-dismiss after 5 seconds
            setTimeout(() => {
                alertDiv.classList.remove('show');
                setTimeout(() => alertDiv.remove(), 300);
            }, 5000);
        }
        
        // Email validation function
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        // Animation on scroll
        window.addEventListener('scroll', function() {
            const contactWrapper = document.querySelector('.contact-wrapper');
            const position = contactWrapper.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (position < screenPosition) {
                contactWrapper.style.opacity = '1';
                contactWrapper.style.transform = 'translateY(0)';
            }
        });
        
        // Initialize animations
        const contactWrapper = document.querySelector('.contact-wrapper');
        contactWrapper.style.opacity = '0';
        contactWrapper.style.transform = 'translateY(30px)';
        contactWrapper.style.transition = 'all 0.6s ease-out';
        
        setTimeout(() => {
            contactWrapper.style.opacity = '1';
            contactWrapper.style.transform = 'translateY(0)';
        }, 300);
        
        // Social icons animation
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach((icon, index) => {
            icon.style.transition = `all 0.3s ease ${index * 0.1}s`;
        });
    });