-- Update enquiries table with new mandatory fields as per Indian government standards
ALTER TABLE enquiries 
ADD COLUMN aadhaar_number VARCHAR(12) NOT NULL AFTER gender,
ADD COLUMN address TEXT NOT NULL AFTER parent_email,
ADD COLUMN city VARCHAR(30) NOT NULL AFTER address,
ADD COLUMN state VARCHAR(50) NOT NULL AFTER city,
ADD COLUMN pincode VARCHAR(6) NOT NULL AFTER state,
ADD COLUMN class_applying_for VARCHAR(20) NOT NULL AFTER enquiry_date,
ADD COLUMN medium_of_instruction ENUM('english', 'hindi', 'gujarati', 'other') NOT NULL DEFAULT 'english' AFTER class_applying_for,
ADD COLUMN category ENUM('general', 'obc', 'sc', 'st', 'ews') NOT NULL DEFAULT 'general' AFTER medium_of_instruction,
ADD COLUMN status ENUM('pending', 'admitted', 'rejected') NOT NULL DEFAULT 'pending' AFTER category;

-- Add indexes for better performance
ALTER TABLE enquiries 
ADD INDEX idx_aadhaar (aadhaar_number),
ADD INDEX idx_status (status),
ADD INDEX idx_enquiry_date (enquiry_date),
ADD INDEX idx_class_applying (class_applying_for);

-- Add constraints
ALTER TABLE enquiries 
ADD CONSTRAINT chk_aadhaar_length CHECK (LENGTH(aadhaar_number) = 12),
ADD CONSTRAINT chk_phone_format CHECK (parent_phone REGEXP '^[6-9][0-9]{9}$'),
ADD CONSTRAINT chk_pincode_format CHECK (pincode REGEXP '^[0-9]{6}$'),
ADD CONSTRAINT chk_student_name CHECK (student_name REGEXP '^[a-zA-Z ]+$'),
ADD CONSTRAINT chk_parent_name CHECK (parent_name REGEXP '^[a-zA-Z ]+$');

-- Update existing records to have default values for new required fields
UPDATE enquiries SET 
aadhaar_number = '000000000000',
address = 'Address not provided',
city = 'City not provided',
state = 'State not provided',
pincode = '000000',
class_applying_for = 'Not specified',
medium_of_instruction = 'english',
category = 'general',
status = 'pending'
WHERE aadhaar_number IS NULL OR aadhaar_number = ''; 