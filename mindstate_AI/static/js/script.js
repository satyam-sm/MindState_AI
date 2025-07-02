// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const thoughtForm = document.getElementById('thoughtForm');
    const thoughtText = document.getElementById('thoughtText');
    const resultContainer = document.querySelector('.result-container');
    const backgroundCircles = document.querySelectorAll('.bg-circle');
    
    // Initialize the page with subtle animations
    initPageAnimations();
    
    // Form submission handling
    if (thoughtForm) {
        thoughtForm.addEventListener('submit', function(e) {
            // We're not preventing default form submission since we want the server to process it
            // This is just for adding animations and enhancements
            
            // Add a loading state to button
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.innerHTML = '<span>Analyzing...</span><div class="btn-glow"></div>';
                submitButton.disabled = true;
                
                // We'll re-enable it when the page reloads with results
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = '<span>Analyze Insights</span><div class="btn-glow"></div>';
                }, 10000); // Fallback in case submission hangs
            }
        });
    }
    
    // If there's a result already displayed (from server-side rendering)
    if (resultContainer && resultContainer.classList.contains('visible')) {
        animateResult();
    }
    
    // Add subtle parallax effect to background elements
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        backgroundCircles.forEach((circle, index) => {
            const depth = 0.05 * (index + 1);
            const moveX = mouseX * depth * 100;
            const moveY = mouseY * depth * 100;
            
            circle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    // Textarea auto-resize
    if (thoughtText) {
        thoughtText.addEventListener('input', autoResizeTextarea);
        
        // Initial resize if there's content
        if (thoughtText.value.trim() !== '') {
            autoResizeTextarea.call(thoughtText);
        }
        
        // Focus effects
        thoughtText.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        thoughtText.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    }
    
    // Character count feature
    if (thoughtText) {
        // Create character count element if it doesn't exist
        let charCount = document.querySelector('.char-count');
        if (!charCount) {
            charCount = document.createElement('div');
            charCount.className = 'char-count';
            charCount.style.cssText = `
                position: absolute;
                bottom: 10px;
                right: 15px;
                font-size: 0.8rem;
                color: var(--text-light);
                pointer-events: none;
                opacity: 0.7;
                transition: opacity 0.3s ease;
            `;
            thoughtText.parentElement.appendChild(charCount);
        }
        
        // Update character count
        function updateCharCount() {
            const currentLength = thoughtText.value.length;
            charCount.textContent = `${currentLength} characters`;
            
            // Show/hide based on content
            charCount.style.opacity = currentLength > 0 ? '0.7' : '0';
        }
        
        thoughtText.addEventListener('input', updateCharCount);
        updateCharCount(); // Initial count
    }
    
    // Functions
    function initPageAnimations() {
        // Fade in elements
        const elements = [
            document.querySelector('header'),
            document.querySelector('.hero'),
            document.querySelector('.predictor-card')
        ];
        
        elements.forEach((el, index) => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 100 * index);
            }
        });
    }
    
    function animateResult() {
        // Add a subtle highlight animation to the result
        const resultCard = document.querySelector('.result-card');
        if (resultCard) {
            resultCard.style.animation = 'highlight-pulse 2s ease-in-out';
        }
    }
    
    function autoResizeTextarea() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    }
    
    // Add CSS animation for result highlight
    const style = document.createElement('style');
    style.textContent = `
        @keyframes highlight-pulse {
            0% { box-shadow: 0 0 0 0 rgba(94, 114, 228, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(94, 114, 228, 0); }
            100% { box-shadow: 0 0 0 0 rgba(94, 114, 228, 0); }
        }
        
        .form-group.focused .textarea-border {
            border-color: var(--primary);
            opacity: 0.8;
            transform: translate(-3px, 3px);
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Easter egg - typing "help" or "crisis" in the textarea
    if (thoughtText) {
        thoughtText.addEventListener('input', function() {
            const text = this.value.toLowerCase().trim();
            if (text === 'help' || text === 'crisis' || text.includes('suicide')) {
                // Show a helpful resources message
                let helpMessage = document.querySelector('.help-message');
                
                if (!helpMessage) {
                    helpMessage = document.createElement('div');
                    helpMessage.className = 'help-message';
                    helpMessage.style.cssText = `
                        margin-top: 15px;
                        padding: 15px;
                        border-radius: 8px;
                        background-color: rgba(245, 177, 76, 0.1);
                        border-left: 4px solid var(--accent);
                        font-size: 0.9rem;
                        color: var(--text-medium);
                        display: none;
                    `;
                    
                    helpMessage.innerHTML = `
                        <strong>Need immediate support?</strong>
                        <p>If you're experiencing a crisis, please reach out:</p>
                        <ul style="margin-left: 20px; margin-top: 5px;">
                            <li>National Suicide Prevention Lifeline: 988 or 1-800-273-8255</li>
                            <li>Crisis Text Line: Text HOME to 741741</li>
                            <li>Or call your local emergency services: 911</li>
                        </ul>
                    `;
                    
                    this.parentElement.after(helpMessage);
                }
                
                // Show with animation
                helpMessage.style.display = 'block';
                setTimeout(() => {
                    helpMessage.style.opacity = '0';
                    helpMessage.style.transition = 'opacity 0.5s ease';
                    helpMessage.style.opacity = '1';
                }, 10);
            }
        });
    }
    
    // Accessibility improvements
    const improveAccessibility = () => {
        // Ensure all interactive elements have appropriate ARIA attributes
        const submitButton = document.querySelector('.btn-predict');
        if (submitButton) {
            submitButton.setAttribute('aria-label', 'Analyze your thoughts');
        }
        
        // Make sure the form is accessible
        if (thoughtForm) {
            thoughtText.setAttribute('aria-label', 'Enter your thoughts here');
        }
        
        // Ensure proper focus states
        const focusableElements = document.querySelectorAll('a, button, input, textarea');
        focusableElements.forEach(el => {
            el.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--primary)';
                this.style.outlineOffset = '2px';
            });
            
            el.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    };
    
    improveAccessibility();
});
