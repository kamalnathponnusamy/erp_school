-- Enquiries table for Enquiry & Admission
CREATE TABLE enquiries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    parent_name VARCHAR(100),
    parent_phone VARCHAR(15),
    parent_email VARCHAR(100),
    previous_school VARCHAR(100),
    enquiry_date DATE,
    class_id INT,
    status ENUM('active', 'converted', 'cancelled') DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
); 