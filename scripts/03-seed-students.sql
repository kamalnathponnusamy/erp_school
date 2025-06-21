INSERT INTO students (
  user_id, date_of_birth, gender, aadhaar_number, religion, community, mother_tongue, nationality, blood_group, disability_details, photo_path,
  father_name, father_occupation, father_annual_income, father_contact_number,
  mother_name, mother_occupation, mother_annual_income, mother_contact_number,
  guardian_name, guardian_relationship, permanent_address, communication_address,
  transport_required, hostel_required, previous_school_name, previous_school_class, transfer_certificate_number,
  birth_certificate, aadhaar_card, community_certificate, transfer_certificate, class_id
) VALUES
  (1, '2016-05-15', 'Male', '123456789012', 'Hindu', 'General', 'Hindi', 'Indian', 'B+', '', '/uploads/photos/aarav_sharma.jpg', 'Rajesh Sharma', 'Engineer', 800000, '9876543210', 'Sunita Sharma', 'Teacher', 500000, '9123456780', '', '', '45, Green Park, Delhi - 110016', '', 0, 0, 'Delhi Public School', 'KG', 'DPS/TC/2022/1234', '/uploads/docs/aarav_birth.jpg', '/uploads/docs/aarav_aadhaar.jpg', '/uploads/docs/aarav_community.jpg', '/uploads/docs/aarav_tc.jpg', 1),
  (2, '2016-08-22', 'Female', '987654321098', 'Christian', 'OBC', 'Malayalam', 'Indian', 'O+', '', '/uploads/photos/meera_nair.jpg', 'Joseph Nair', 'Accountant', 600000, '9988776655', 'Annie Nair', 'Nurse', 400000, '8877665544', 'Mathew Nair', 'Uncle', '12, MG Road, Kochi - 682016', '12, MG Road, Kochi - 682016', 1, 1, 'St. Mary''s School', 'KG', 'SM/TC/2023/5678', '/uploads/docs/meera_birth.jpg', '/uploads/docs/meera_aadhaar.jpg', '/uploads/docs/meera_community.jpg', '/uploads/docs/meera_tc.jpg', 1),
  (3, '2016-03-10', 'Male', '234567890123', 'Hindu', 'OBC', 'Gujarati', 'Indian', 'A+', '', '/uploads/photos/rohan_patel.jpg', 'Vikas Patel', 'Businessman', 900000, '9123456789', 'Kavita Patel', 'Homemaker', 300000, '9988776655', '', '', '22, Lake View, Ahmedabad - 380001', '', 0, 1, 'Little Stars', 'KG', 'LS/TC/2022/7890', '/uploads/docs/rohan_birth.jpg', '/uploads/docs/rohan_aadhaar.jpg', '/uploads/docs/rohan_community.jpg', '/uploads/docs/rohan_tc.jpg', 1),
  (4, '2016-07-12', 'Female', '345678901234', 'Muslim', 'General', 'Urdu', 'Indian', 'AB+', '', '/uploads/photos/sara_khan.jpg', 'Imran Khan', 'Doctor', 1200000, '9876543220', 'Nazia Khan', 'Homemaker', 0, '9876543221', '', '', '78, Rose Lane, Lucknow - 226001', '', 1, 0, 'City Montessori', 'KG', 'CM/TC/2022/2345', '/uploads/docs/sara_birth.jpg', '/uploads/docs/sara_aadhaar.jpg', '/uploads/docs/sara_community.jpg', '/uploads/docs/sara_tc.jpg', 2),
  (5, '2016-11-05', 'Male', '456789012345', 'Sikh', 'General', 'Punjabi', 'Indian', 'O-', '', '/uploads/photos/harpreet_singh.jpg', 'Gurpreet Singh', 'Businessman', 1500000, '9876543222', 'Simran Kaur', 'Teacher', 500000, '9876543223', '', '', '12, Golden Temple Rd, Amritsar - 143001', '', 0, 1, 'Golden Kids', 'KG', 'GK/TC/2022/3456', '/uploads/docs/harpreet_birth.jpg', '/uploads/docs/harpreet_aadhaar.jpg', '/uploads/docs/harpreet_community.jpg', '/uploads/docs/harpreet_tc.jpg', 2),
  (6, '2016-09-18', 'Female', '567890123456', 'Hindu', 'OBC', 'Marathi', 'Indian', 'A-', '', '/uploads/photos/vaishnavi_patil.jpg', 'Suresh Patil', 'Farmer', 300000, '9876543224', 'Meena Patil', 'Homemaker', 0, '9876543225', '', '', '34, Shivaji Nagar, Pune - 411005', '', 1, 0, 'Shivaji School', 'KG', 'SS/TC/2022/4567', '/uploads/docs/vaishnavi_birth.jpg', '/uploads/docs/vaishnavi_aadhaar.jpg', '/uploads/docs/vaishnavi_community.jpg', '/uploads/docs/vaishnavi_tc.jpg', 2),
  (7, '2016-04-25', 'Male', '678901234567', 'Jain', 'General', 'Gujarati', 'Indian', 'O+', '', '/uploads/photos/ronak_shah.jpg', 'Manish Shah', 'Businessman', 2000000, '9876543226', 'Rita Shah', 'Homemaker', 0, '9876543227', '', '', '56, Market Yard, Surat - 395002', '', 0, 1, 'Market School', 'KG', 'MS/TC/2022/5678', '/uploads/docs/ronak_birth.jpg', '/uploads/docs/ronak_aadhaar.jpg', '/uploads/docs/ronak_community.jpg', '/uploads/docs/ronak_tc.jpg', 2),
  (8, '2016-10-30', 'Female', '789012345678', 'Parsi', 'General', 'Gujarati', 'Indian', 'B+', '', '/uploads/photos/zenobia_irani.jpg', 'Rustom Irani', 'Engineer', 1100000, '9876543228', 'Persis Irani', 'Artist', 700000, '9876543229', '', '', '90, Parsi Colony, Mumbai - 400014', '', 1, 0, 'Parsi School', 'KG', 'PS/TC/2022/6789', '/uploads/docs/zenobia_birth.jpg', '/uploads/docs/zenobia_aadhaar.jpg', '/uploads/docs/zenobia_community.jpg', '/uploads/docs/zenobia_tc.jpg', 2),
  (9, '2016-12-20', 'Male', '890123456789', 'Hindu', 'OBC', 'Hindi', 'Indian', 'A+', '', '/uploads/photos/ankit_sharma.jpg', 'Vijay Sharma', 'Teacher', 500000, '9876543230', 'Kavita Sharma', 'Doctor', 1300000, '9876543231', '', '', '23, School Lane, Jaipur - 302001', '', 0, 0, 'Sunrise School', 'KG', 'SR/TC/2022/7890', '/uploads/docs/ankit_birth.jpg', '/uploads/docs/ankit_aadhaar.jpg', '/uploads/docs/ankit_community.jpg', '/uploads/docs/ankit_tc.jpg', 2),
  (10, '2016-06-14', 'Female', '901234567890', 'Muslim', 'General', 'Urdu', 'Indian', 'O-', '', '/uploads/photos/ayesha_khan.jpg', 'Salman Khan', 'Actor', 2500000, '9876543232', 'Alia Khan', 'Homemaker', 0, '9876543233', '', '', '67, Film City, Mumbai - 400065', '', 1, 1, 'Filmcity School', 'KG', 'FC/TC/2022/8901', '/uploads/docs/ayesha_birth.jpg', '/uploads/docs/ayesha_aadhaar.jpg', '/uploads/docs/ayesha_community.jpg', '/uploads/docs/ayesha_tc.jpg', 2),
  -- ... 26 more students ...
  (36, '2016-11-11', 'Other', '912345678901', 'Other', 'General', 'English', 'Indian', 'AB-', '', '/uploads/photos/alex_morgan.jpg', 'Alex Morgan', 'Scientist', 1800000, '9876543250', 'Jamie Morgan', 'Engineer', 1500000, '9876543251', '', '', '99, Science Rd, Bengaluru - 560001', '', 0, 0, 'Science School', 'KG', 'SC/TC/2022/9999', '/uploads/docs/alex_birth.jpg', '/uploads/docs/alex_aadhaar.jpg', '/uploads/docs/alex_community.jpg', '/uploads/docs/alex_tc.jpg', 3);

-- Reference document for each student
INSERT INTO student_documents (student_id, document_type, file_path) VALUES
(1, 'Birth Certificate', '/documents/stu1_birth_certificate.pdf'),
(2, 'Birth Certificate', '/documents/stu2_birth_certificate.pdf'),
(3, 'Birth Certificate', '/documents/stu3_birth_certificate.pdf'),
(4, 'Birth Certificate', '/documents/stu4_birth_certificate.pdf'),
(5, 'Birth Certificate', '/documents/stu5_birth_certificate.pdf'),
(6, 'Birth Certificate', '/documents/stu6_birth_certificate.pdf'),
(7, 'Birth Certificate', '/documents/stu7_birth_certificate.pdf'),
(8, 'Birth Certificate', '/documents/stu8_birth_certificate.pdf'),
(9, 'Birth Certificate', '/documents/stu9_birth_certificate.pdf'),
(10, 'Birth Certificate', '/documents/stu10_birth_certificate.pdf'),
(11, 'Birth Certificate', '/documents/stu11_birth_certificate.pdf'),
(12, 'Birth Certificate', '/documents/stu12_birth_certificate.pdf'),
(13, 'Birth Certificate', '/documents/stu13_birth_certificate.pdf'),
(14, 'Birth Certificate', '/documents/stu14_birth_certificate.pdf'),
(15, 'Birth Certificate', '/documents/stu15_birth_certificate.pdf'),
(16, 'Birth Certificate', '/documents/stu16_birth_certificate.pdf'),
(17, 'Birth Certificate', '/documents/stu17_birth_certificate.pdf'),
(18, 'Birth Certificate', '/documents/stu18_birth_certificate.pdf'),
(19, 'Birth Certificate', '/documents/stu19_birth_certificate.pdf'),
(20, 'Birth Certificate', '/documents/stu20_birth_certificate.pdf'),
(21, 'Birth Certificate', '/documents/stu21_birth_certificate.pdf'),
(22, 'Birth Certificate', '/documents/stu22_birth_certificate.pdf'),
(23, 'Birth Certificate', '/documents/stu23_birth_certificate.pdf'),
(24, 'Birth Certificate', '/documents/stu24_birth_certificate.pdf'),
(25, 'Birth Certificate', '/documents/stu25_birth_certificate.pdf'),
(26, 'Birth Certificate', '/documents/stu26_birth_certificate.pdf'),
(27, 'Birth Certificate', '/documents/stu27_birth_certificate.pdf'),
(28, 'Birth Certificate', '/documents/stu28_birth_certificate.pdf'),
(29, 'Birth Certificate', '/documents/stu29_birth_certificate.pdf'),
(30, 'Birth Certificate', '/documents/stu30_birth_certificate.pdf'),
(31, 'Birth Certificate', '/documents/stu31_birth_certificate.pdf'),
(32, 'Birth Certificate', '/documents/stu32_birth_certificate.pdf'),
(33, 'Birth Certificate', '/documents/stu33_birth_certificate.pdf'),
(34, 'Birth Certificate', '/documents/stu34_birth_certificate.pdf'),
(35, 'Birth Certificate', '/documents/stu35_birth_certificate.pdf'),
(36, 'Birth Certificate', '/documents/stu36_birth_certificate.pdf');

INSERT INTO student_transport (student_id, route_id, bus_id, assigned_date)
VALUES (1, 2, 1, '2023-06-15'), ...; 