// scripts/courses.js
// Add mock data for courses if not present
(function() {
  let courses = JSON.parse(localStorage.getItem('courses'));
  if (!courses || !Array.isArray(courses) || courses.length === 0) {
    courses = [
      { code: 'BSCS101', title: 'Introduction to Computer Science' },
      { code: 'BSCS201', title: 'Data Structures and Algorithms' },
      { code: 'BSCS309', title: 'Internet Applications Programming' },
      { code: 'BSCS315', title: 'Database Systems' },
      { code: 'BSCS320', title: 'Operating Systems' }
    ];
    localStorage.setItem('courses', JSON.stringify(courses));
  }
})();
