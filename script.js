function toggleMenu() {
  const menuLinks = document.querySelector('.menu-links');
  if (menuLinks) {
    menuLinks.classList.toggle('active');
  } else {
    console.error('Element with class "menu-links" not found.');
  }
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop();
  const galleryLink = document.querySelector('a[href="gallery.html"]');
  if (currentPage === 'gallery.html' && galleryLink) {
    galleryLink.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const errorMessage = document.getElementById('email-error');

    emailInput.addEventListener('input', function() {
        const isValid = validateEmail(this.value);
        
        if (this.value.length === 0) {
            // Input is empty
            this.classList.remove('valid', 'invalid');
            errorMessage.textContent = '';
            errorMessage.classList.remove('visible');
        } else if (isValid) {
            // Valid email
            this.classList.remove('invalid');
            this.classList.add('valid');
            errorMessage.textContent = '';
            errorMessage.classList.remove('visible');
        } else {
            // Invalid email
            this.classList.remove('valid');
            this.classList.add('invalid');
            errorMessage.textContent = 'Please enter a valid email address';
            errorMessage.classList.add('visible');
        }
    });

    // Form submission validation
    document.getElementById('contact-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const form = this;
        const submitButton = form.querySelector('button[type="submit"]');
        const successMessage = document.getElementById('success-message');
        
        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            const formData = {
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                message: form.message.value
            };
            
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                successMessage.textContent = 'Message sent successfully!';
                successMessage.classList.remove('hidden');
                form.reset();
                
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 5000);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
});
