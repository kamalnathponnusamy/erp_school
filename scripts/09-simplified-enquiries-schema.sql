-- Migration script to update existing enquiries table for simplified schema
-- This script modifies the existing table without dropping it to preserve foreign key relationships

-- Check and add missing columns only
-- Add class_applying_for if it doesn't exist
SET @sql = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
   WHERE TABLE_SCHEMA = DATABASE() 
   AND TABLE_NAME = 'enquiries' 
   AND COLUMN_NAME = 'class_applying_for') = 0,
  'ALTER TABLE enquiries ADD COLUMN class_applying_for VARCHAR(20) AFTER student_name',
  'SELECT "class_applying_for column already exists" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add contact_person if it doesn't exist
SET @sql = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
   WHERE TABLE_SCHEMA = DATABASE() 
   AND TABLE_NAME = 'enquiries' 
   AND COLUMN_NAME = 'contact_person') = 0,
  'ALTER TABLE enquiries ADD COLUMN contact_person VARCHAR(50) AFTER class_applying_for',
  'SELECT "contact_person column already exists" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add contact_phone if it doesn't exist
SET @sql = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
   WHERE TABLE_SCHEMA = DATABASE() 
   AND TABLE_NAME = 'enquiries' 
   AND COLUMN_NAME = 'contact_phone') = 0,
  'ALTER TABLE enquiries ADD COLUMN contact_phone VARCHAR(10) AFTER contact_person',
  'SELECT "contact_phone column already exists" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add contact_email if it doesn't exist
SET @sql = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
   WHERE TABLE_SCHEMA = DATABASE() 
   AND TABLE_NAME = 'enquiries' 
   AND COLUMN_NAME = 'contact_email') = 0,
  'ALTER TABLE enquiries ADD COLUMN contact_email VARCHAR(100) AFTER contact_phone',
  'SELECT "contact_email column already exists" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add purpose_of_enquiry if it doesn't exist
SET @sql = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
   WHERE TABLE_SCHEMA = DATABASE() 
   AND TABLE_NAME = 'enquiries' 
   AND COLUMN_NAME = 'purpose_of_enquiry') = 0,
  'ALTER TABLE enquiries ADD COLUMN purpose_of_enquiry TEXT AFTER contact_email',
  'SELECT "purpose_of_enquiry column already exists" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Update existing status enum to include new status options
ALTER TABLE enquiries 
MODIFY COLUMN status ENUM('new', 'processing', 'converted', 'pending', 'not_interested', 'active', 'cancelled') DEFAULT 'new';

-- Update existing records to populate new required fields (only if they're NULL)
UPDATE enquiries SET 
class_applying_for = CASE 
  WHEN class_id = 1 THEN '1'
  WHEN class_id = 2 THEN '2'
  WHEN class_id = 3 THEN '3'
  WHEN class_id = 4 THEN '4'
  WHEN class_id = 5 THEN '5'
  WHEN class_id = 6 THEN '6'
  WHEN class_id = 7 THEN '7'
  WHEN class_id = 8 THEN '8'
  WHEN class_id = 9 THEN '9'
  WHEN class_id = 10 THEN '10'
  WHEN class_id = 11 THEN '11'
  WHEN class_id = 12 THEN '12'
  ELSE 'Not specified'
END
WHERE class_applying_for IS NULL AND class_id IS NOT NULL;

UPDATE enquiries SET 
contact_person = COALESCE(parent_name, 'Not specified')
WHERE contact_person IS NULL;

UPDATE enquiries SET 
contact_phone = COALESCE(parent_phone, '0000000000')
WHERE contact_phone IS NULL;

UPDATE enquiries SET 
contact_email = COALESCE(parent_email, 'not.specified@email.com')
WHERE contact_email IS NULL;

UPDATE enquiries SET 
purpose_of_enquiry = COALESCE(notes, 'General enquiry about admission')
WHERE purpose_of_enquiry IS NULL;

UPDATE enquiries SET 
status = CASE 
  WHEN status = 'active' THEN 'new'
  WHEN status = 'converted' THEN 'converted'
  WHEN status = 'cancelled' THEN 'not_interested'
  ELSE 'new'
END
WHERE status IN ('active', 'cancelled');

-- Make required fields NOT NULL after populating them
ALTER TABLE enquiries 
MODIFY COLUMN class_applying_for VARCHAR(20) NOT NULL,
MODIFY COLUMN contact_person VARCHAR(50) NOT NULL,
MODIFY COLUMN contact_phone VARCHAR(10) NOT NULL,
MODIFY COLUMN contact_email VARCHAR(100) NOT NULL,
MODIFY COLUMN purpose_of_enquiry TEXT NOT NULL,
MODIFY COLUMN enquiry_date DATE NOT NULL;

-- Add indexes for better performance (only if they don't exist)
-- Note: MySQL will ignore duplicate index creation errors
ALTER TABLE enquiries 
ADD INDEX idx_student_name (student_name),
ADD INDEX idx_status (status),
ADD INDEX idx_enquiry_date (enquiry_date),
ADD INDEX idx_class_applying (class_applying_for),
ADD INDEX idx_contact_phone (contact_phone);

-- Optional: Drop old columns that are no longer needed (uncomment if you want to remove them)
-- ALTER TABLE enquiries 
-- DROP COLUMN date_of_birth,
-- DROP COLUMN gender,
-- DROP COLUMN parent_name,
-- DROP COLUMN parent_phone,
-- DROP COLUMN parent_email,
-- DROP COLUMN previous_school,
-- DROP COLUMN class_id; 