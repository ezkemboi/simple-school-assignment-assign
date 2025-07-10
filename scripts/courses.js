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
      { code: 'BSCS320', title: 'Operating Systems' },
      { code: 'BSCS330', title: 'Software Engineering' },
      { code: 'BSCS340', title: 'Computer Networks' },
      { code: 'BSCS350', title: 'Artificial Intelligence' },
      { code: 'BSCS360', title: 'Mobile Application Development' },
      { code: 'BSCS370', title: 'Cyber Security' },
      { code: 'BSCS380', title: 'Cloud Computing' },
      { code: 'BSCS390', title: 'Web Development' },
      { code: 'BSCS400', title: 'Machine Learning' }
    ];
    localStorage.setItem('courses', JSON.stringify(courses));
  }
})();
