// scripts/dashboard.js

document.addEventListener('DOMContentLoaded', function() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  // --- MOCK DATA SETUP ---
  // Add mock registered courses and fees for all students if not present
  (function() {
    // Mock registered courses (all courses)
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    // Mock students
    let students = JSON.parse(localStorage.getItem('students'));
    if (!students || !Array.isArray(students) || students.length === 0) {
      students = [
        { name: 'Alice Student', regNo: 'SCT1001', email: 'alice@student.com', password: 'pass', role: 'STUDENT' },
        { name: 'Bob Student', regNo: 'SCT1002', email: 'bob@student.com', password: 'pass', role: 'STUDENT' }
      ];
      localStorage.setItem('students', JSON.stringify(students));
    }
    // Add registeredCourses and fees to all students
    let updated = false;
    students = students.map(s => {
      if (!s.registeredCourses) {
        s.registeredCourses = courses;
        updated = true;
      }
      if (!s.fees) {
        s.fees = { amount: 50000, status: 'Paid' };
        updated = true;
      }
      return s;
    });
    if (updated) {
      localStorage.setItem('students', JSON.stringify(students));
    }
    // Mock fees (for all students)
    let fees = JSON.parse(localStorage.getItem('fees'));
    if (!fees || !Array.isArray(fees) || fees.length === 0) {
      fees = students.map(s => ({ regNo: s.regNo, name: s.name, amount: 50000, status: 'Paid' }));
      localStorage.setItem('fees', JSON.stringify(fees));
    }
  })();

  // Sidebar menu items by role
  const studentMenu = [
    { id: 'dashboardCourses', label: 'My Courses' },
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
  // Helper to get students (with registeredCourses and fees)
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

  // Helper to get mock fee breakdown
  function getMockFeeDetails() {
    return [
      { item: 'Tuition Fee', amount: 40000, status: 'Paid' },
      { item: 'Library Fee', amount: 2000, status: 'Paid' },
      { item: 'Exam Fee', amount: 3000, status: 'Unpaid' },
      { item: 'Hostel Fee', amount: 8000, status: 'Paid' },
      { item: 'Sports Fee', amount: 2000, status: 'Unpaid' },
      { item: 'Medical Fee', amount: 1500, status: 'Paid' },
      { item: 'ICT Fee', amount: 1000, status: 'Paid' },
      { item: 'Student Union Fee', amount: 500, status: 'Paid' }
    ];
  }

  // Render student profile card
  function renderStudentProfileCard() {
    if (user.role !== 'STUDENT') {
      document.getElementById('studentProfileCard').style.display = 'none';
      return;
    }
    // Mock profile data
    const profile = {
      name: user.name || 'Jane Doe',
      regNo: user.regNo || 'SCT123456',
      program: 'BSc Computer Science',
      email: user.email || 'jane.doe@gretsa.ac.ke',
      avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name || 'Jane Doe') + '&background=003366&color=fff&size=128'
    };
    const card = document.getElementById('studentProfileCard');
    card.innerHTML = `
      <div class="profile-card">
        <img src="${profile.avatar}" alt="Avatar" class="profile-avatar">
        <div class="profile-info">
          <h2>${profile.name}</h2>
          <div><strong>Reg No:</strong> ${profile.regNo}</div>
          <div><strong>Program:</strong> ${profile.program}</div>
          <div><strong>Email:</strong> <a href="mailto:${profile.email}">${profile.email}</a></div>
        </div>
      </div>
    `;
    card.style.display = 'flex';
  }

  // Render student quick links/notifications card
  function renderStudentQuickLinks() {
    if (user.role !== 'STUDENT') {
      document.getElementById('studentQuickLinks').style.display = 'none';
      return;
    }
    const card = document.getElementById('studentQuickLinks');
    card.innerHTML = `
      <div class="quick-links-card">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#" tabindex="0"><i class="fa fa-calendar-alt"></i> View Timetable</a></li>
          <li><a href="#" tabindex="0"><i class="fa fa-user-friends"></i> Contact Advisor</a></li>
          <li><a href="#" tabindex="0"><i class="fa fa-file-download"></i> Download Transcript</a></li>
        </ul>
      </div>
    `;
    card.style.display = 'block';
  }

  // Render staff profile card
  function renderStaffProfileCard() {
    if (user.role !== 'STAFF') {
      document.getElementById('staffProfileCard').style.display = 'none';
      return;
    }
    // Mock profile data
    const profile = {
      name: user.name || 'John Smith',
      staffId: user.staffId || 'ST98765',
      department: user.department || 'Computer Science',
      email: user.email || 'john.smith@gretsa.ac.ke',
      avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name || 'John Smith') + '&background=003366&color=fff&size=128'
    };
    const card = document.getElementById('staffProfileCard');
    card.innerHTML = `
      <div class="profile-card staff-profile-card">
        <img src="${profile.avatar}" alt="Avatar" class="profile-avatar">
        <div class="profile-info">
          <h2>${profile.name} <span class="badge badge-staff">Staff</span></h2>
          <div><strong>Staff ID:</strong> ${profile.staffId}</div>
          <div><strong>Department:</strong> ${profile.department}</div>
          <div><strong>Email:</strong> <a href="mailto:${profile.email}">${profile.email}</a></div>
        </div>
      </div>
    `;
    card.style.display = 'flex';
  }

  // Render staff stat cards
  function renderStaffStatCards() {
    if (user.role !== 'STAFF') {
      document.getElementById('staffStatCards').style.display = 'none';
      return;
    }
    // Mock stats
    const stats = [
      { label: 'Total Students', value: 1200, icon: 'fa-users', color: 'var(--primary-blue)' },
      { label: 'Courses', value: 24, icon: 'fa-book', color: 'var(--secondary-blue)' },
      { label: 'Pending Fees', value: 150, icon: 'fa-exclamation-circle', color: '#c62828' }
    ];
    const card = document.getElementById('staffStatCards');
    card.innerHTML = `
      <div class="stat-cards">
        ${stats.map(s => `
          <div class="stat-card" style="--stat-color:${s.color}">
            <div class="stat-icon"><i class="fa ${s.icon}"></i></div>
            <div class="stat-value">${s.value}</div>
            <div class="stat-label">${s.label}</div>
          </div>
        `).join('')}
      </div>
    `;
    card.style.display = 'flex';
  }

  // Update dashboard heading based on role
  function updateDashboardHeading() {
    const heading = document.querySelector('.dashboard-heading');
    if (!heading) return;
    heading.textContent = user.role === 'STAFF' ? 'Staff Dashboard' : 'Student Dashboard';
  }

  // Helper to show courses for students (table)
  function showStudentCourses() {
    const section = document.getElementById('dashboardCourses');
    // Always fetch the latest courses from localStorage
    const allCourses = getCourses();
    let html = '';
    if (allCourses.length === 0) {
      html += '<p>No courses available.</p>';
      html += '<button id="registerDefaultCoursesBtn" class="btn">Register Default Courses</button>';
      section.innerHTML = '<h3>My Courses</h3>' + html;
      // Add event listener after rendering
      const btn = document.getElementById('registerDefaultCoursesBtn');
      if (btn) {
        btn.addEventListener('click', function() {
          const defaultCourses = [
            { code: 'BSCS101', title: 'Introduction to Computer Science', lecturer: 'Dr. Alice Kimani', students: 85 },
            { code: 'BSCS201', title: 'Data Structures and Algorithms', lecturer: 'Prof. John Mwangi', students: 60 },
            { code: 'BSCS309', title: 'Internet Applications Programming', lecturer: 'Ms. Grace Otieno', students: 75 },
            { code: 'BSCS315', title: 'Database Systems', lecturer: 'Dr. Peter Njoroge', students: 90 },
            { code: 'BSCS320', title: 'Operating Systems', lecturer: 'Dr. Susan Wambui', students: 55 },
            { code: 'BSCS330', title: 'Software Engineering', lecturer: 'Prof. David Ochieng', students: 120 },
            { code: 'BSCS340', title: 'Computer Networks', lecturer: 'Dr. Jane Muthoni', students: 45 },
            { code: 'BSCS350', title: 'Artificial Intelligence', lecturer: 'Dr. Brian Kiptoo', students: 70 },
            { code: 'BSCS360', title: 'Mobile Application Development', lecturer: 'Ms. Carol Achieng', students: 40 },
            { code: 'BSCS370', title: 'Cyber Security', lecturer: 'Mr. Samuel Kariuki', students: 30 },
            { code: 'BSCS380', title: 'Cloud Computing', lecturer: 'Dr. Faith Mutua', students: 50 },
            { code: 'BSCS390', title: 'Web Development', lecturer: 'Ms. Linda Chebet', students: 110 },
            { code: 'BSCS400', title: 'Machine Learning', lecturer: 'Dr. Kevin Omondi', students: 65 }
          ];
          localStorage.setItem('courses', JSON.stringify(defaultCourses));
          showStudentCourses();
        });
      }
      return;
    } else {
      html += `<table class="dashboard-table">
        <thead><tr><th><i class='fa fa-hashtag'></i> Course Code</th><th><i class='fa fa-book'></i> Course Title</th><th><i class='fa fa-user-tie'></i> Lecturer</th><th><i class='fa fa-users'></i> Students</th><th>Status</th></tr></thead>
        <tbody>
        ${allCourses.map(c => `<tr><td>${c.code}</td><td>${c.title}</td><td>${c.lecturer || '-'} </td><td>${c.students || '-'} </td><td><span class='badge badge-ongoing' title='Currently enrolled' aria-label='Ongoing'>Ongoing</span></td></tr>`).join('')}
        </tbody>
      </table>`;
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

  // Helper to show all students for staff (table)
  function showAllStudents() {
    const section = document.getElementById('dashboardStudents');
    const students = getStudents();
    let html = '';
    if (students.length === 0) {
      html += '<p>No students found.</p>';
    } else {
      html += `<table class="dashboard-table">
        <thead><tr><th>Name</th><th>Reg No</th><th>Courses</th><th>Fees</th></tr></thead>
        <tbody>
        ${students.map(s => `
          <tr>
            <td>${s.name}</td>
            <td>${s.regNo}</td>
            <td><ul style='margin:0;padding-left:1.2em;'>${(s.registeredCourses||[]).map(c => `<li>${c.code}: ${c.title}</li>`).join('')}</ul></td>
            <td>Amount: KES ${s.fees ? s.fees.amount : 'N/A'}<br>Status: ${s.fees ? s.fees.status : 'N/A'}</td>
          </tr>
        `).join('')}
        </tbody>
      </table>`;
    }
    section.innerHTML = '<h3>All Students</h3>' + html;
  }

  // Section content rendering (now with table display)
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
    } else if (sectionId === 'dashboardFees') {
      section.innerHTML = `<h3>${user.role === 'STAFF' ? 'All Fees' : 'My Fees'}</h3>`;
      if (user.role === 'STUDENT') {
        // Show student's own fees in a detailed table
        const feeDetails = getMockFeeDetails();
        let total = feeDetails.reduce((sum, f) => sum + f.amount, 0);
        section.innerHTML += `<table class="dashboard-table">
          <thead><tr><th>Fee Item</th><th>Amount (KES)</th><th>Status</th></tr></thead>
          <tbody>
            ${feeDetails.map(f => `<tr><td>${f.item}</td><td>${f.amount}</td><td><span class='badge badge-${f.status.toLowerCase()}' title='${f.status === 'Paid' ? 'Fee paid in full' : 'Fee not paid'}' aria-label='${f.status}'>${f.status}</span></td></tr>`).join('')}
            <tr style="font-weight:bold;"><td>Total</td><td>${total}</td><td></td></tr>
          </tbody>
        </table>`;
      } else if (user.role === 'STAFF') {
        // Show all fees in a table
        const fees = JSON.parse(localStorage.getItem('fees')) || [];
        section.innerHTML += `<table class="dashboard-table"><thead><tr><th>Name</th><th>Reg No</th><th>Amount</th><th>Status</th></tr></thead><tbody>${fees.map(f => `<tr><td>${f.name}</td><td>${f.regNo}</td><td>KES ${f.amount}</td><td>${f.status}</td></tr>`).join('')}</tbody></table>`;
      }
    } else if (sectionId === 'dashboardStudents') {
      showAllStudents();
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
  renderStudentProfileCard();
  renderStudentQuickLinks();
  renderStaffProfileCard();
  renderStaffStatCards();
  updateDashboardHeading();
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