-- Insert the parent menu item for Enquiry & Admission
INSERT INTO menus (pid, name, url, icon, sort_order, role_permissions)
VALUES (0, 'Enquiry & Admission', NULL, 'ClipboardUser', 6, '["admin", "Office staff", "principal"]');

-- Get the ID of the menu we just inserted
SET @enquiry_admission_id = LAST_INSERT_ID();

-- Insert the sub-menu items for Enquiry & Admission
INSERT INTO menus (pid, name, url, icon, sort_order, role_permissions)
VALUES
  (@enquiry_admission_id, 'Enquiry', '/enquiry-admission/enquiry', 'ClipboardList', 1, '["admin", "Office staff", "principal"]'),
  (@enquiry_admission_id, 'Student Admission', '/enquiry-admission/student-admission', 'UserPlus', 2, '["admin", "Office staff", "principal"]'),
  (@enquiry_admission_id, 'Follow Up', '/enquiry-admission/follow-up', 'PhoneForwarded', 3, '["admin", "Office staff", "principal"]'),
  (@enquiry_admission_id, 'Report', '/enquiry-admission/report', 'BarChart3', 4, '["admin", "Office staff", "principal"]'); 