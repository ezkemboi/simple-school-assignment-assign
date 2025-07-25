// scripts/courses.js
// Add mock data for courses if not present
(function() {
  let courses = JSON.parse(localStorage.getItem('courses'));
  if (!courses || !Array.isArray(courses) || courses.length === 0) {
    courses = [
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
    localStorage.setItem('courses', JSON.stringify(courses));
  }
})();
