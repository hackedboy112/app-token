// Admin Authentication and Common Functions
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in as admin
    const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated');
    const currentPage = window.location.pathname;
    
    //if (!isAdminAuthenticated && !currentPage.includes('login.html')) {
        //window.location.href = 'login.html';
       // return;
//}

    // Handle admin login
    const adminLoginForm = document.getElementById('adminLoginFormElement');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Check admin credentials
            if (username === 'admin123' && password === 'admin@123') {
                localStorage.setItem('isAdminAuthenticated', 'true');
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid admin credentials!');
            }
        });
    }

    // Handle logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isAdminAuthenticated');
            window.location.href = 'login.html';
        });
    }
});

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}
