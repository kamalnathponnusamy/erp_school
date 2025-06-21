-- This script modifies the students table and creates a student_documents table for the admission process.

-- Drop unique constraint on email and make it nullable, as it may not be available for all students.
-- ALTER TABLE `students`
--   DROP INDEX `email`,
--   MODIFY `email` varchar(255) DEFAULT NULL;

-- Add new columns to the students table for comprehensive admission data.
ALTER TABLE `students`
  ADD COLUMN `admission_number` VARCHAR(50) UNIQUE,
  ADD COLUMN `aadhaar_number` VARCHAR(12) UNIQUE,
  ADD COLUMN `religion` VARCHAR(50),
  ADD COLUMN `community` VARCHAR(50),
  ADD COLUMN `mother_tongue` VARCHAR(50),
  ADD COLUMN `nationality` VARCHAR(50) DEFAULT 'Indian',
  ADD COLUMN `disability_details` TEXT,
  ADD COLUMN `photo_path` VARCHAR(255),
  ADD COLUMN `father_name` VARCHAR(255),
  ADD COLUMN `father_occupation` VARCHAR(255),
  ADD COLUMN `father_annual_income` DECIMAL(12, 2),
  ADD COLUMN `father_contact_number` VARCHAR(15),
  ADD COLUMN `mother_name` VARCHAR(255),
  ADD COLUMN `mother_occupation` VARCHAR(255),
  ADD COLUMN `mother_annual_income` DECIMAL(12, 2),
  ADD COLUMN `mother_contact_number` VARCHAR(15),
  ADD COLUMN `guardian_name` VARCHAR(255),
  ADD COLUMN `guardian_relationship` VARCHAR(50),
  ADD COLUMN `permanent_address` TEXT,
  ADD COLUMN `communication_address` TEXT,
  ADD COLUMN `previous_school_name` VARCHAR(255),
  ADD COLUMN `previous_school_class` VARCHAR(50),
  ADD COLUMN `transfer_certificate_number` VARCHAR(50),
  MODIFY `gender` ENUM('Male', 'Female', 'Other'),
  MODIFY `date_of_birth` DATE,
  MODIFY `admission_date` DATE,
  MODIFY `blood_group` VARCHAR(5);

-- Create a table to store student documents.
CREATE TABLE `student_documents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `student_id` INT NOT NULL,
  `document_type` VARCHAR(100) NOT NULL,
  `file_path` VARCHAR(255) NOT NULL,
  `uploaded_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; 