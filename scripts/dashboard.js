// scripts/dashboard.js

document.addEventListener('DOMContentLoaded', function() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  // Sidebar menu items by role
  const studentMenu = [
    { id: 'dashboardCourses', label: 'My Courses' },
    { id: 'dashboardRegisterUnits', label: 'Register for Units' },
    { id: 'dashboardFees', label: 'My Fees' }
  ];
  const staffMenu = [
    { id: 'dashboardStudents', label: 'All Students' },
    { id: 'dashboardAssignCourses', label: 'Assign Courses' },
    { id: 'dashboardFees', label: 'All Fees' }
  ];

  const sidebarMenu = document.getElementById('sidebarMenu');
  const dashboardContent = document.getElementById('dashboardContent');
  const dashboardWelcome = document.getElementById('dashboardWelcome');

  // Helper to clear all sections
  function hideAllSections() {
    const sections = [
      'dashboardCourses',
      'dashboardRegisterUnits',
      'dashboardFees',
      'dashboardStudents',
      'dashboardAssignCourses'
    ];
    sections.forEach(id => {
      let el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  }

  // Populate sidebar
  function renderSidebar() {
    sidebarMenu.innerHTML = '';
    const menu = user.role === 'STAFF' ? staffMenu : studentMenu;
    menu.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.label;
      li.className = 'sidebar-link';
      li.dataset.section = item.id;
      li.tabIndex = 0;
      sidebarMenu.appendChild(li);
    });
  }

  // Render welcome message
  function renderWelcome() {
    dashboardWelcome.innerHTML = `<h2>Welcome, ${user.name} (${user.role})</h2>`;
  }

  // Helper to get courses
  function getCourses() {
    return JSON.parse(localStorage.getItem('courses')) || [];
  }
  // Helper to get students
  function getStudents() {
    return JSON.parse(localStorage.getItem('students')) || [];
  }

  // Helper to get current student registered courses (mock: store in student object as registeredCourses)
  function getRegisteredCourses() {
    if (user.role === 'STUDENT') {
      return user.registeredCourses || [];
    }
    return [];
  }

  // Helper to show courses for students
  function showStudentCourses() {
    const section = document.getElementById('dashboardCourses');
    const allCourses = getCourses();
    const registered = getRegisteredCourses();
    let html = '';
    if (registered.length === 0) {
      html += '<p>You have not registered for any courses yet.</p>';
    } else {
      html += '<ul>' + registered.map(c => `<li><strong>${c.code}</strong>: ${c.title}</li>`).join('') + '</ul>';
    }
    section.innerHTML = '<h3>My Courses</h3>' + html;
  }

  // Helper to show available courses for registration
  function showRegisterUnits() {
    const section = document.getElementById('dashboardRegisterUnits');
    const allCourses = getCourses();
    const registered = getRegisteredCourses();
    // Filter out already registered
    const available = allCourses.filter(c => !registered.some(rc => rc.code === c.code));
    let html = '';
    if (available.length === 0) {
      html += '<p>No more courses available for registration.</p>';
    } else {
      html += '<ul>' + available.map(c => `<li><strong>${c.code}</strong>: ${c.title}</li>`).join('') + '</ul>';
    }
    section.innerHTML = '<h3>Register for Units</h3>' + html;
  }

  // Helper to show all courses for staff
  function showAssignCourses() {
    const section = document.getElementById('dashboardAssignCourses');
    const allCourses = getCourses();
    let html = '';
    if (allCourses.length === 0) {
      html += '<p>No courses available.</p>';
    } else {
      html += '<ul>' + allCourses.map(c => `<li><strong>${c.code}</strong>: ${c.title}</li>`).join('') + '</ul>';
    }
    section.innerHTML = '<h3>Assign Courses</h3>' + html;
  }

  // Section content rendering (now with course display)
  function renderSection(sectionId) {
    hideAllSections();
    dashboardWelcome.style.display = 'none';
    let section = document.getElementById(sectionId);
    if (!section) {
      section = document.createElement('section');
      section.id = sectionId;
      section.className = 'dashboard-section';
      dashboardContent.appendChild(section);
    }
    section.style.display = 'block';
    if (sectionId === 'dashboardCourses') {
      showStudentCourses();
    } else if (sectionId === 'dashboardRegisterUnits') {
      showRegisterUnits();
    } else if (sectionId === 'dashboardFees') {
      section.innerHTML = `<h3>${user.role === 'STAFF' ? 'All Fees' : 'My Fees'}</h3><div id="feesList">(Fee details will be shown here)</div>`;
    } else if (sectionId === 'dashboardStudents') {
      section.innerHTML = '<h3>All Students</h3><div id="studentsList">(List of students will be shown here)</div>';
    } else if (sectionId === 'dashboardAssignCourses') {
      showAssignCourses();
    }
  }

  // Sidebar click handler
  sidebarMenu.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('sidebar-link')) {
      renderSection(e.target.dataset.section);
    }
  });
  sidebarMenu.addEventListener('keydown', function(e) {
    if (e.target && e.target.classList.contains('sidebar-link') && (e.key === 'Enter' || e.key === ' ')) {
      renderSection(e.target.dataset.section);
    }
  });

  // Initial render
  renderSidebar();
  renderWelcome();
  dashboardWelcome.style.display = 'block';

  // Show first section by default
  const firstMenu = sidebarMenu.querySelector('.sidebar-link');
  if (firstMenu) {
    renderSection(firstMenu.dataset.section);
  }

  // Logout functionality
  const navLogout = document.getElementById('nav-logout');
  if (navLogout) {
    navLogout.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('currentUser');
      window.location.href = 'index.html';
    });
  }
}); 