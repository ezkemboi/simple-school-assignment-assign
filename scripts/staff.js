// scripts/staff.js
document.getElementById('staffRegForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const staffId = document.getElementById('staffId').value.trim();
    const email = document.getElementById('email').value.trim();
    const department = document.getElementById('department').value.trim();
    const password = document.getElementById('password').value;
    const msgDiv = document.getElementById('staffRegMsg');

    if (!name || !staffId || !email || !department || !password) {
        msgDiv.textContent = 'Please fill in all fields.';
        msgDiv.className = 'error';
        return;
    }

    // Get current staff from localStorage
    const staff = JSON.parse(localStorage.getItem('staff')) || [];
    // Check for duplicate staffId or email
    if (staff.some(s => s.staffId === staffId)) {
        msgDiv.textContent = 'Staff ID already exists.';
        msgDiv.className = 'error';
        return;
    }
    if (staff.some(s => s.email === email)) {
        msgDiv.textContent = 'Email already registered.';
        msgDiv.className = 'error';
        return;
    }

    const staffMember = { name, staffId, email, department, password, role: 'STAFF' };
    staff.push(staffMember);
    localStorage.setItem('staff', JSON.stringify(staff));
    // Set current user and redirect
    localStorage.setItem('currentUser', JSON.stringify(staffMember));
    msgDiv.textContent = 'Registration successful! Redirecting to dashboard...';
    msgDiv.className = 'success';
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1200);
});
