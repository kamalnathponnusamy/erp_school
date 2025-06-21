-- Visitors table for Front Desk
CREATE TABLE visitors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    visitor_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15),
    person_to_visit VARCHAR(100),
    purpose_of_visit TEXT,
    check_in_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    check_out_time TIMESTAMP NULL,
    status ENUM('checked_in', 'checked_out') DEFAULT 'checked_in',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
); 