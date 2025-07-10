// Login logic using localStorage users

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;
    const errorDiv = document.getElementById('loginError');
    errorDiv.textContent = '';

    let user = null;
    if (role === 'student') {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        user = students.find(s =>
            (s.regNo === username || s.email === username || s.name === username) &&
            s.password === password
        );
    } else if (role === 'staff') {
        const staff = JSON.parse(localStorage.getItem('staff')) || [];
        user = staff.find(s =>
            (s.staffId === username || s.email === username || s.name === username) &&
            s.password === password
        );
    }

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    } else {
        errorDiv.textContent = 'Invalid credentials or role.';
    }
}); 