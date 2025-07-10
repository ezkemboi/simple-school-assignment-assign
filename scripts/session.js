// scripts/session.js
function updateNav() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const navStudentRegister = document.getElementById('nav-student-register');
  const navStaffRegister = document.getElementById('nav-staff-register');
  const navCourses = document.getElementById('nav-courses');
  const navFees = document.getElementById('nav-fees');
  const navLogout = document.getElementById('nav-logout');

  if (user) {
    navLogout.style.display = 'inline';
    if (user.type === 'student') {
      navStudentRegister.style.display = 'none';
      navStaffRegister.style.display = 'none';
      navCourses.style.display = 'inline';
      navFees.style.display = 'inline';
    } else if (user.type === 'staff') {
      navStudentRegister.style.display = 'none';
      navStaffRegister.style.display = 'none';
      navCourses.style.display = 'inline';
      navFees.style.display = 'inline';
    }
  } else {
    navStudentRegister.style.display = 'inline';
    navStaffRegister.style.display = 'inline';
    navCourses.style.display = 'none';
    navFees.style.display = 'none';
    navLogout.style.display = 'none';
  }
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
  updateNav();
  const navLogout = document.getElementById('nav-logout');
  if (navLogout) {
    navLogout.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  }
});
