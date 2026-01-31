/*
 * ================================================
 * FORM VALIDATION SCRIPT
 * Using JavaScript and jQuery
 * ================================================
 */

$(document).ready(function() {
    
    // ================================
    // VALIDATION PATTERNS & RULES
    // ================================
    
    // Regular expression for email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    // Regular expression for phone number (exactly 10 digits)
    const phonePattern = /^\d{10}$/;
    
    // Password strength requirements
    const passwordRequirements = {
        minLength: 8,
        hasUppercase: /[A-Z]/,
        hasLowercase: /[a-z]/,
        hasNumber: /\d/
    };

    
    // ================================
    // PASSWORD TOGGLE FUNCTIONALITY
    // ================================
    
    /**
     * Toggles password visibility for password input fields
     * @param {string} inputId - ID of the password input field
     * @param {string} toggleId - ID of the toggle icon
     */
    function setupPasswordToggle(inputId, toggleId) {
        $(`#${toggleId}`).on('click', function() {
            const passwordField = $(`#${inputId}`);
            const currentType = passwordField.attr('type');
            
            // Toggle between 'password' and 'text'
            if (currentType === 'password') {
                passwordField.attr('type', 'text');
                $(this).text('🙈'); // Change icon to indicate password is visible
            } else {
                passwordField.attr('type', 'password');
                $(this).text('👁️'); // Change icon to indicate password is hidden
            }
        });
    }
    
    // Initialize password toggles for both password fields
    setupPasswordToggle('password', 'togglePassword');
    setupPasswordToggle('confirmPassword', 'toggleConfirmPassword');

    
    // ================================
    // REAL-TIME PASSWORD STRENGTH CHECK
    // ================================
    
    /**
     * Checks password strength and updates requirement indicators
     */
    $('#password').on('input', function() {
        const password = $(this).val();
        
        // Check minimum length
        if (password.length >= passwordRequirements.minLength) {
            $('#lengthReq').addClass('valid');
        } else {
            $('#lengthReq').removeClass('valid');
        }
        
        // Check for uppercase letter
        if (passwordRequirements.hasUppercase.test(password)) {
            $('#uppercaseReq').addClass('valid');
        } else {
            $('#uppercaseReq').removeClass('valid');
        }
        
        // Check for lowercase letter
        if (passwordRequirements.hasLowercase.test(password)) {
            $('#lowercaseReq').addClass('valid');
        } else {
            $('#lowercaseReq').removeClass('valid');
        }
        
        // Check for number
        if (passwordRequirements.hasNumber.test(password)) {
            $('#numberReq').addClass('valid');
        } else {
            $('#numberReq').removeClass('valid');
        }
    });

    
    // ================================
    // PHONE NUMBER INPUT RESTRICTION
    // ================================
    
    /**
     * Restricts phone input to numbers only (no letters or special chars)
     */
    $('#phone').on('input', function() {
        // Remove any non-digit characters
        this.value = this.value.replace(/\D/g, '');
    });

    
    // ================================
    // VALIDATION FUNCTIONS
    // ================================
    
    /**
     * Validates the full name field
     * @returns {boolean} - True if valid, false otherwise
     */
    function validateFullName() {
        const fullName = $('#fullName').val().trim();
        const errorElement = $('#fullNameError');
        
        if (fullName === '') {
            showError(errorElement, 'Full name is required');
            $('#fullName').addClass('error').removeClass('success');
            return false;
        } else if (fullName.length < 3) {
            showError(errorElement, 'Full name must be at least 3 characters');
            $('#fullName').addClass('error').removeClass('success');
            return false;
        } else {
            hideError(errorElement);
            $('#fullName').addClass('success').removeClass('error');
            return true;
        }
    }
    
    /**
     * Validates the email field
     * @returns {boolean} - True if valid, false otherwise
     */
    function validateEmail() {
        const email = $('#email').val().trim();
        const errorElement = $('#emailError');
        
        if (email === '') {
            showError(errorElement, 'Email address is required');
            $('#email').addClass('error').removeClass('success');
            return false;
        } else if (!emailPattern.test(email)) {
            showError(errorElement, 'Please enter a valid email format (user@example.com)');
            $('#email').addClass('error').removeClass('success');
            return false;
        } else {
            hideError(errorElement);
            $('#email').addClass('success').removeClass('error');
            return true;
        }
    }
    
    /**
     * Validates the phone number field
     * @returns {boolean} - True if valid, false otherwise
     */
    function validatePhone() {
        const phone = $('#phone').val().trim();
        const errorElement = $('#phoneError');
        
        if (phone === '') {
            showError(errorElement, 'Phone number is required');
            $('#phone').addClass('error').removeClass('success');
            return false;
        } else if (!phonePattern.test(phone)) {
            showError(errorElement, 'Phone number must be exactly 10 digits');
            $('#phone').addClass('error').removeClass('success');
            return false;
        } else {
            hideError(errorElement);
            $('#phone').addClass('success').removeClass('error');
            return true;
        }
    }
    
    /**
     * Validates the password field
     * @returns {boolean} - True if valid, false otherwise
     */
    function validatePassword() {
        const password = $('#password').val();
        const errorElement = $('#passwordError');
        
        if (password === '') {
            showError(errorElement, 'Password is required');
            $('#password').addClass('error').removeClass('success');
            return false;
        }
        
        // Check all password requirements
        const meetsLength = password.length >= passwordRequirements.minLength;
        const meetsUppercase = passwordRequirements.hasUppercase.test(password);
        const meetsLowercase = passwordRequirements.hasLowercase.test(password);
        const meetsNumber = passwordRequirements.hasNumber.test(password);
        
        if (!meetsLength || !meetsUppercase || !meetsLowercase || !meetsNumber) {
            showError(errorElement, 'Password does not meet all requirements');
            $('#password').addClass('error').removeClass('success');
            return false;
        } else {
            hideError(errorElement);
            $('#password').addClass('success').removeClass('error');
            return true;
        }
    }
    
    /**
     * Validates the confirm password field
     * @returns {boolean} - True if valid, false otherwise
     */
    function validateConfirmPassword() {
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        const errorElement = $('#confirmPasswordError');
        
        if (confirmPassword === '') {
            showError(errorElement, 'Please confirm your password');
            $('#confirmPassword').addClass('error').removeClass('success');
            return false;
        } else if (password !== confirmPassword) {
            showError(errorElement, 'Passwords do not match');
            $('#confirmPassword').addClass('error').removeClass('success');
            return false;
        } else {
            hideError(errorElement);
            $('#confirmPassword').addClass('success').removeClass('error');
            return true;
        }
    }

    
    // ================================
    // HELPER FUNCTIONS FOR MESSAGES
    // ================================
    
    /**
     * Displays an error message
     * @param {jQuery} element - The error message element
     * @param {string} message - The error message text
     */
    function showError(element, message) {
        element.text(message).addClass('show');
    }
    
    /**
     * Hides an error message
     * @param {jQuery} element - The error message element
     */
    function hideError(element) {
        element.removeClass('show');
    }
    
    /**
     * Shows success message in the message box
     * @param {string} message - Success message to display
     */
    function showSuccessMessage(message) {
        const messageBox = $('#messageBox');
        messageBox.removeClass('error').addClass('success');
        messageBox.text(message);
        
        // Auto-hide after 5 seconds
        setTimeout(function() {
            messageBox.removeClass('success').text('');
        }, 5000);
    }
    
    /**
     * Shows error message in the message box
     * @param {string} message - Error message to display
     */
    function showErrorMessage(message) {
        const messageBox = $('#messageBox');
        messageBox.removeClass('success').addClass('error');
        messageBox.text(message);
        
        // Auto-hide after 5 seconds
        setTimeout(function() {
            messageBox.removeClass('error').text('');
        }, 5000);
    }

    
    // ================================
    // REAL-TIME VALIDATION ON BLUR
    // ================================
    
    // Validate each field when user leaves the input
    $('#fullName').on('blur', validateFullName);
    $('#email').on('blur', validateEmail);
    $('#phone').on('blur', validatePhone);
    $('#password').on('blur', validatePassword);
    $('#confirmPassword').on('blur', validateConfirmPassword);

    
    // ================================
    // FORM SUBMISSION HANDLER
    // ================================
    
    /**
     * Handles form submission with complete validation
     */
    $('#validationForm').on('submit', function(event) {
        // Prevent default form submission
        event.preventDefault();
        
        // Run all validation checks
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        
        // Check if all fields are valid
        const isFormValid = isFullNameValid && isEmailValid && isPhoneValid && 
                           isPasswordValid && isConfirmPasswordValid;
        
        if (isFormValid) {
            // Form is valid - show success message
            showSuccessMessage('✓ Form submitted successfully! All validations passed.');
            
            // Optional: Reset form after successful submission
            setTimeout(function() {
                $('#validationForm')[0].reset();
                // Remove all success/error classes
                $('input').removeClass('success error');
                // Reset password requirements display
                $('.password-requirements li').removeClass('valid');
            }, 2000);
            
        } else {
            // Form has errors - show error message
            showErrorMessage('✗ Form submission failed! Please fix the errors above.');
        }
    });

});