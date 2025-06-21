-- Follow-ups table for Enquiry & Admission
CREATE TABLE follow_ups (
    id INT PRIMARY KEY AUTO_INCREMENT,
    enquiry_id INT NOT NULL,
    follow_up_date DATE NOT NULL,
    status VARCHAR(100),
    notes TEXT,
    next_follow_up_date DATE,
    followed_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (enquiry_id) REFERENCES enquiries(id) ON DELETE CASCADE,
    FOREIGN KEY (followed_by) REFERENCES users(id) ON DELETE SET NULL
); 