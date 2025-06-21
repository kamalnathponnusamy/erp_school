-- scripts/11-seed-comprehensive-users.sql
-- This script seeds the database with a comprehensive set of users and staff.
-- The password for all users is 'password123'.
-- The hash is: $2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6

-- Clear existing data to prevent conflicts
-- DELETE FROM staff;
-- DELETE FROM students;
-- DELETE FROM users WHERE role IN ('teacher', 'librarian', 'staff', 'student', 'parent');

-- Reset auto-increment if needed (be careful with this in production)
-- ALTER TABLE users AUTO_INCREMENT = 10; -- Start after admin/principal etc.
-- ALTER TABLE staff AUTO_INCREMENT = 1;
-- ALTER TABLE students AUTO_INCREMENT = 1;


-- =================================================================
-- 1. Seed Teachers (20)
-- =================================================================
INSERT INTO users (username, email, password_hash, role, first_name, last_name, phone, address, is_active) VALUES
('sunita.iyer', 'sunita.iyer@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'teacher', 'Sunita', 'Iyer', '9876541001', '101 Teacher Colony, Bangalore', TRUE),
('vikas.mehta', 'vikas.mehta@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'teacher', 'Vikas', 'Mehta', '9876541002', '102 Teacher Colony, Mumbai', TRUE),
('anita.desai', 'anita.desai@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'teacher', 'Anita', 'Desai', '9876541003', '103 Teacher Colony, Delhi', TRUE),
('raj.malhotra', 'raj.malhotra@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'teacher', 'Raj', 'Malhotra', '9876541004', '104 Teacher Colony, Pune', TRUE),
('meera.kapoor', 'meera.kapoor@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'teacher', 'Meera', 'Kapoor', '9876541005', '105 Teacher Colony, Chennai', TRUE),
('ashok.verma', 'ashok.verma@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'teacher', 'Ashok', 'Verma', '9876541006', '106 Teacher Colony, Kolkata', TRUE),
('kavya.nayak', 'kavya.nayak@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'teacher', 'Kavya', 'Nayak', '9876541007', '107 Teacher Colony, Hyderabad', TRUE),
('suresh.goyal', 'suresh.goyal@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'teacher', 'Suresh', 'Goyal', '9876541008', '108 Teacher Colony, Ahmedabad', TRUE),
('priyanka.joshi', 'priyanka.joshi@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'teacher', 'Priyanka', 'Joshi', '9876541009', '109 Teacher Colony, Jaipur', TRUE),
('deepak.sharma', 'deepak.sharma@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'teacher', 'Deepak', 'Sharma', '9876541010', '110 Teacher Colony, Lucknow', TRUE),
('tanvi.shah', 'tanvi.shah@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'teacher', 'Tanvi', 'Shah', '9876541011', '111 Teacher Colony, Surat', TRUE),
('rohit.patil', 'rohit.patil@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'teacher', 'Rohit', 'Patil', '9876541012', '112 Teacher Colony, Nagpur', TRUE),
('pooja.gupta', 'pooja.gupta@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'teacher', 'Pooja', 'Gupta', '9876541013', '113 Teacher Colony, Bhopal', TRUE),
('manoj.agarwal', 'manoj.agarwal@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'teacher', 'Manoj', 'Agarwal', '9876541014', '114 Teacher Colony, Indore', TRUE),
('neha.singhania', 'neha.singhania@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'teacher', 'Neha', 'Singhania', '9876541015', '115 Teacher Colony, Agra', TRUE),
('saurabh.jain', 'saurabh.jain@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'teacher', 'Saurabh', 'Jain', '9876541016', '116 Teacher Colony, Varanasi', TRUE),
('divya.nair', 'divya.nair@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'teacher', 'Divya', 'Nair', '9876541017', '117 Teacher Colony, Kochi', TRUE),
('rahul.dubey', 'rahul.dubey@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'teacher', 'Rahul', 'Dubey', '9876541018', '118 Teacher Colony, Patna', TRUE),
('swati.mishra', 'swati.mishra@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'teacher', 'Swati', 'Mishra', '9876541019', '119 Teacher Colony, Ranchi', TRUE),
('gaurav.bose', 'gaurav.bose@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'teacher', 'Gaurav', 'Bose', '9876541020', '120 Teacher Colony, Bhubaneswar', TRUE);

INSERT INTO staff (user_id, employee_id, department, designation, qualification, joining_date) VALUES
((SELECT id from users where username = 'sunita.iyer'), 'EMP1001', 'Academics', 'Senior Teacher', 'M.Sc. Physics', '2015-06-01'),
((SELECT id from users where username = 'vikas.mehta'), 'EMP1002', 'Academics', 'Senior Teacher', 'M.A. English', '2016-07-15'),
((SELECT id from users where username = 'anita.desai'), 'EMP1003', 'Academics', 'Teacher', 'B.Ed', '2018-08-20'),
((SELECT id from users where username = 'raj.malhotra'), 'EMP1004', 'Academics', 'Teacher', 'M.Com', '2019-05-10'),
((SELECT id from users where username = 'meera.kapoor'), 'EMP1005', 'Academics', 'Teacher', 'B.Sc. Chemistry', '2020-02-25'),
((SELECT id from users where username = 'ashok.verma'), 'EMP1006', 'Academics', 'Physical Education', 'B.P.Ed', '2017-04-01'),
((SELECT id from users where username = 'kavya.nayak'), 'EMP1007', 'Academics', 'Art Teacher', 'B.F.A', '2021-09-01'),
((SELECT id from users where username = 'suresh.goyal'), 'EMP1008', 'Academics', 'Music Teacher', 'M.A. Music', '2019-11-12'),
((SELECT id from users where username = 'priyanka.joshi'), 'EMP1009', 'Academics', 'Teacher', 'M.Sc. Biology', '2018-03-18'),
((SELECT id from users where username = 'deepak.sharma'), 'EMP1010', 'Academics', 'Teacher', 'M.A. History', '2020-08-05'),
((SELECT id from users where username = 'tanvi.shah'), 'EMP1011', 'Academics', 'Teacher', 'B.A. Hindi', '2021-01-20'),
((SELECT id from users where username = 'rohit.patil'), 'EMP1012', 'Academics', 'Teacher', 'M.Sc. Mathematics', '2016-10-10'),
((SELECT id from users where username = 'pooja.gupta'), 'EMP1013', 'Academics', 'Teacher', 'M.A. Geography', '2019-07-22'),
((SELECT id from users where username = 'manoj.agarwal'), 'EMP1014', 'Academics', 'Teacher', 'M.Com, B.Ed', '2017-12-01'),
((SELECT id from users where username = 'neha.singhania'), 'EMP1015', 'Academics', 'Teacher', 'B.Tech CS', '2022-02-15'),
((SELECT id from users where username = 'saurabh.jain'), 'EMP1016', 'Academics', 'Teacher', 'M.Sc. IT', '2021-06-30'),
((SELECT id from users where username = 'divya.nair'), 'EMP1017', 'Academics', 'Teacher', 'M.A. Economics', '2018-09-11'),
((SELECT id from users where username = 'rahul.dubey'), 'EMP1018', 'Academics', 'Teacher', 'B.E. Mechanical', '2019-03-03'),
((SELECT id from users where username = 'swati.mishra'), 'EMP1019', 'Academics', 'Teacher', 'M.A. Political Science', '2020-10-28'),
((SELECT id from users where username = 'gaurav.bose'), 'EMP1020', 'Academics', 'Teacher', 'M.Sc. Botany', '2021-05-14');


-- =================================================================
-- 2. Seed Librarians (2)
-- =================================================================
INSERT INTO users (username, email, password_hash, role, first_name, last_name, phone, address, is_active) VALUES
('mohan.das', 'mohan.das@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'librarian', 'Mohan', 'Das', '9876542001', '201 Library Quarters, City', TRUE),
('gita.sarin', 'gita.sarin@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'librarian', 'Gita', 'Sarin', '9876542002', '202 Library Quarters, City', TRUE);

INSERT INTO staff (user_id, employee_id, department, designation, qualification, joining_date) VALUES
((SELECT id from users where username = 'mohan.das'), 'EMP2001', 'Library', 'Senior Librarian', 'M.Lib.Sc.', '2010-03-10'),
((SELECT id from users where username = 'gita.sarin'), 'EMP2002', 'Library', 'Assistant Librarian', 'B.Lib.Sc.', '2019-08-01');


-- =================================================================
-- 3. Seed Other Staff (8)
-- =================================================================
INSERT INTO users (username, email, password_hash, role, first_name, last_name, phone, address, is_active) VALUES
('ramesh.yadav', 'ramesh.yadav@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'staff', 'Ramesh', 'Yadav', '9876543001', '301 Staff Quarters, City', TRUE),
('suresh.kumar', 'suresh.kumar@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'staff', 'Suresh', 'Kumar', '9876543002', '302 Staff Quarters, City', TRUE),
('hari.prasad', 'hari.prasad@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'staff', 'Hari', 'Prasad', '9876543003', '303 Staff Quarters, City', TRUE),
('sita.devi', 'sita.devi@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'staff', 'Sita', 'Devi', '9876543004', '304 Staff Quarters, City', TRUE),
('balu.singh', 'balu.singh@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'staff', 'Balu', 'Singh', '9876543005', '305 Staff Quarters, City', TRUE),
('john.fernandes', 'john.fernandes@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'staff', 'John', 'Fernandes', '9876543006', '306 Staff Quarters, City', TRUE),
('aruna.mishra', 'aruna.mishra@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'staff', 'Aruna', 'Mishra', '9876543007', '307 Staff Quarters, City', TRUE),
('prakash.jha', 'prakash.jha@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'staff', 'Prakash', 'Jha', '9876543008', '308 Staff Quarters, City', TRUE);

INSERT INTO staff (user_id, employee_id, department, designation, qualification, joining_date) VALUES
((SELECT id from users where username = 'ramesh.yadav'), 'EMP3001', 'Transport', 'Driver', '10th Pass, Heavy Vehicle License', '2012-05-20'),
((SELECT id from users where username = 'suresh.kumar'), 'EMP3002', 'Transport', 'Driver', '10th Pass, Heavy Vehicle License', '2014-02-11'),
((SELECT id from users where username = 'hari.prasad'), 'EMP3003', 'Transport', 'Driver', '10th Pass, Heavy Vehicle License', '2018-07-01'),
((SELECT id from users where username = 'sita.devi'), 'EMP3004', 'Administration', 'Office Clerk', 'B.Com', '2015-09-15'),
((SELECT id from users where username = 'balu.singh'), 'EMP3005', 'Security', 'Security Guard', '12th Pass', '2019-01-20'),
((SELECT id from users where username = 'john.fernandes'), 'EMP3006', 'Maintenance', 'Electrician', 'ITI Electrician', '2017-11-05'),
((SELECT id from users where username = 'aruna.mishra'), 'EMP3007', 'Administration', 'Accountant', 'M.Com', '2016-08-19'),
((SELECT id from users where username = 'prakash.jha'), 'EMP3008', 'Administration', 'Front Desk', 'B.A.', '2021-04-12'); 