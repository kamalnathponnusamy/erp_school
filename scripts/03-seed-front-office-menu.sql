-- Insert the parent menu item for Front Office
INSERT INTO menus (pid, name, url, icon, sort_order, role_permissions)
VALUES (0, 'Front Office', NULL, 'ConciergeBell', 5, '["admin", "Office staff", "principal"]');

-- Get the ID of the menu we just inserted
SET @front_office_id = LAST_INSERT_ID();

-- Insert the sub-menu items for Front Office
INSERT INTO menus (pid, name, url, icon, sort_order, role_permissions)
VALUES
  (@front_office_id, 'Visitor Management', '/front-office/visitor-management', 'Users', 1, '["admin", "Office staff", "principal"]'),
  (@front_office_id, 'Staff Directory', '/front-office/staff-directory', 'UserCog', 2, '["admin", "Office staff", "principal"]'),
  (@front_office_id, 'Student Directory', '/front-office/student-directory', 'BookUser', 3, '["admin", "Office staff", "principal"]'); 