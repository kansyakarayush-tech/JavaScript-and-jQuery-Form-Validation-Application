$(document).ready(function() {

    $('#toggleBtn').click(function() {
        var passwordField = $('#password');
        var fieldType = passwordField.attr('type');
        
        if(fieldType === 'password') {
            passwordField.attr('type', 'text');
            $(this).text('🙈');
        } else {
            passwordField.attr('type', 'password');
            $(this).text('👁️');
        }
    });

    $('#phone').on('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    $('#myForm').submit(function(e) {
        e.preventDefault();
        
        var isValid = true;
        
        $('.error').removeClass('show');
        $('#message').removeClass('success error').hide();
        
        var name = $('#name').val().trim();
        if(name === '') {
            $('#nameError').text('Name is required').addClass('show');
            isValid = false;
        }
        
        var email = $('#email').val().trim();
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if(email === '') {
            $('#emailError').text('Email is required').addClass('show');
            isValid = false;
        } else if(!emailPattern.test(email)) {
            $('#emailError').text('Please enter valid email format').addClass('show');
            isValid = false;
        }
        
        var phone = $('#phone').val().trim();
        if(phone === '') {
            $('#phoneError').text('Phone number is required').addClass('show');
            isValid = false;
        } else if(phone.length !== 10) {
            $('#phoneError').text('Phone number must be 10 digits').addClass('show');
            isValid = false;
        }
        
        var password = $('#password').val();
        var hasUpper = /[A-Z]/.test(password);
        var hasLower = /[a-z]/.test(password);
        var hasNumber = /[0-9]/.test(password);
        
        if(password === '') {
            $('#passwordError').text('Password is required').addClass('show');
            isValid = false;
        } else if(password.length < 8) {
            $('#passwordError').text('Password must be at least 8 characters').addClass('show');
            isValid = false;
        } else if(!hasUpper) {
            $('#passwordError').text('Password must contain uppercase letter').addClass('show');
            isValid = false;
        } else if(!hasLower) {
            $('#passwordError').text('Password must contain lowercase letter').addClass('show');
            isValid = false;
        } else if(!hasNumber) {
            $('#passwordError').text('Password must contain a number').addClass('show');
            isValid = false;
        }
        
        if(isValid) {
            $('#message').text('Form submitted successfully!').addClass('success').show();
            
            setTimeout(function() {
                $('#myForm')[0].reset();
                $('#message').removeClass('success').hide();
            }, 3000);
        } else {
            $('#message').text('Please fix the errors above').addClass('error').show();
        }
    });

});