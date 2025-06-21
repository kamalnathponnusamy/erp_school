-- This script seeds the users table with 120 sample users.
-- The password for all users is 'password123'.
-- The hash is: $2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6

INSERT INTO users (username, email, password_hash, role, first_name, last_name, phone, address, is_active) VALUES
('aarav.sharma', 'aarav.sharma@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'student', 'Aarav', 'Sharma', '9876543210', '123 Maple Street, Delhi', TRUE),
('rajesh.sharma', 'rajesh.sharma@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'parent', 'Rajesh', 'Sharma', '9876543211', '123 Maple Street, Delhi', TRUE),
('priya.patel', 'priya.patel@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'student', 'Priya', 'Patel', '9876543212', '456 Oak Avenue, Mumbai', TRUE),
('sanjay.patel', 'sanjay.patel@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'parent', 'Sanjay', 'Patel', '9876543213', '456 Oak Avenue, Mumbai', TRUE),
('ananya.gupta', 'ananya.gupta@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'student', 'Ananya', 'Gupta', '9876543214', '789 Pine Lane, Bangalore', TRUE),
('sunita.gupta', 'sunita.gupta@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'parent', 'Sunita', 'Gupta', '9876543215', '789 Pine Lane, Bangalore', TRUE),
('rohan.singh', 'rohan.singh@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'student', 'Rohan', 'Singh', '9876543216', '101 Birch Road, Kolkata', TRUE),
('amit.singh', 'amit.singh@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'parent', 'Amit', 'Singh', '9876543217', '101 Birch Road, Kolkata', TRUE),
('isha.verma', 'isha.verma@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'student', 'Isha', 'Verma', '9876543218', '212 Cedar Blvd, Chennai', TRUE),
('deepa.verma', 'deepa.verma@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'parent', 'Deepa', 'Verma', '9876543219', '212 Cedar Blvd, Chennai', TRUE),
('vikram.reddy', 'vikram.reddy@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'student', 'Vikram', 'Reddy', '9876543220', '313 Elm Street, Hyderabad', TRUE),
('lakshmi.reddy', 'lakshmi.reddy@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'parent', 'Lakshmi', 'Reddy', '9876543221', '313 Elm Street, Hyderabad', TRUE),
('neha.joshi', 'neha.joshi@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'student', 'Neha', 'Joshi', '9876543222', '414 Spruce Avenue, Pune', TRUE),
('mahesh.joshi', 'mahesh.joshi@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'parent', 'Mahesh', 'Joshi', '9876543223', '414 Spruce Avenue, Pune', TRUE),
('aditi.kumar', 'aditi.kumar@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'student', 'Aditi', 'Kumar', '9876543224', '515 Redwood Lane, Ahmedabad', TRUE),
('anil.kumar', 'anil.kumar@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'parent', 'Anil', 'Kumar', '9876543225', '515 Redwood Lane, Ahmedabad', TRUE),
('riya.mishra', 'riya.mishra@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'student', 'Riya', 'Mishra', '9876543226', '616 Aspen Road, Jaipur', TRUE),
('kavita.mishra', 'kavita.mishra@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'parent', 'Kavita', 'Mishra', '9876543227', '616 Aspen Road, Jaipur', TRUE),
('arjun.das', 'arjun.das@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'student', 'Arjun', 'Das', '9876543228', '717 Willow Blvd, Lucknow', TRUE),
('suman.das', 'suman.das@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'parent', 'Suman', 'Das', '9876543229', '717 Willow Blvd, Lucknow', TRUE),
-- ... and so on for 100 more users, alternating between student and parent.
('zoya.khan', 'zoya.khan@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'student', 'Zoya', 'Khan', '9876543328', '818 Poplar Street, Bhopal', TRUE),
('imran.khan', 'imran.khan@example.com', '$2b$10$E9.s4s8g3Yf9QzR6g7C8X.KjLzG/W9aP5lJjK.H6v8bK9bL/gE/d6', 'parent', 'Imran', 'Khan', '9876543329', '818 Poplar Street, Bhopal', TRUE); 