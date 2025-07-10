// scripts/student.js
document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const regNo = document.getElementById('regNo').value;

    const student = { name, regNo };

    // Get current students from localStorage
    const students = JSON.parse(localStorage.getItem('students')) || [];

    // Add new student
    students.push(student);

    // Save back
    localStorage.setItem('students', JSON.stringify(students));

    alert('Student registered!');
});
