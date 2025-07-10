// scripts/student.js
document.getElementById('studentRegForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const regNo = document.getElementById('regNo').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const msgDiv = document.getElementById('studentRegMsg');

    if (!name || !regNo || !email || !password) {
        msgDiv.textContent = 'Please fill in all fields.';
        msgDiv.className = 'error';
        return;
    }

    // Get current students from localStorage
    const students = JSON.parse(localStorage.getItem('students')) || [];
    // Check for duplicate regNo or email
    if (students.some(s => s.regNo === regNo)) {
        msgDiv.textContent = 'Registration number already exists.';
        msgDiv.className = 'error';
        return;
    }
    if (students.some(s => s.email === email)) {
        msgDiv.textContent = 'Email already registered.';
        msgDiv.className = 'error';
        return;
    }

    // Add all mock courses and fees to new student
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const student = { 
        name, regNo, email, password, role: 'STUDENT',
        registeredCourses: courses,
        fees: { amount: 50000, status: 'Paid' }
    };
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
    // Set current user and redirect
    localStorage.setItem('currentUser', JSON.stringify(student));
    msgDiv.textContent = 'Registration successful! Redirecting to dashboard...';
    msgDiv.className = 'success';
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1200);
});
