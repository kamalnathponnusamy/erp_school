-- Insert menu items for School ERP
INSERT INTO menus (pid, name, url, icon, sort_order, role_permissions) VALUES
-- Main Dashboard
(0, 'Dashboard', '/dashboard', 'LayoutDashboard', 1, '["admin", "principal", "teacher", "student", "parent"]'),

-- Student Management
(0, 'Student Management', NULL, 'Users', 2, '["admin", "principal", "teacher"]'),
(2, 'Admission', '/students/admission', 'UserPlus', 1, '["admin", "principal"]'),
(2, 'Student List', '/students', 'UserCheck', 2, '["admin", "principal", "teacher"]'),
(2, 'Attendance', '/attendance', 'Calendar', 3, '["admin", "principal", "teacher"]'),
(2, 'Promotion', '/students/promotion', 'TrendingUp', 4, '["admin", "principal"]'),

-- Staff Management
(0, 'Staff Management', NULL, 'UserCog', 3, '["admin", "principal"]'),
(7, 'Staff List', '/staff', 'Users', 1, '["admin", "principal"]'),
(7, 'Staff Attendance', '/staff/attendance', 'Clock', 2, '["admin", "principal"]'),
(7, 'Leave Management', '/staff/leave', 'Calendar', 3, '["admin", "principal"]'),

-- Academics
(0, 'Academics', NULL, 'BookOpen', 4, '["admin", "principal", "teacher", "student"]'),
(11, 'Timetable', '/academics/timetable', 'CalendarDays', 1, '["admin", "principal", "teacher", "student"]'),
(11, 'Subjects', '/academics/subjects', 'Book', 2, '["admin", "principal", "teacher"]'),
(11, 'Marks Entry', '/academics/marks', 'FileText', 3, '["admin", "principal", "teacher"]'),
(11, 'Report Cards', '/academics/reports', 'Award', 4, '["admin", "principal", "teacher", "student", "parent"]'),

-- Communication
(0, 'Communication', NULL, 'MessageSquare', 5, '["admin", "principal", "teacher", "student", "parent"]'),
(16, 'Mailbox', '/communication/mailbox', 'Mail', 1, '["admin", "principal", "teacher", "student", "parent"]'),
(16, 'Announcements', '/communication/announcements', 'Megaphone', 2, '["admin", "principal", "teacher", "student", "parent"]'),
(16, 'Events', '/communication/events', 'Calendar', 3, '["admin", "principal", "teacher", "student", "parent"]'),

-- Finance
(0, 'Finance', NULL, 'DollarSign', 6, '["admin", "principal"]'),
(20, 'Fee Collection', '/finance/fees', 'CreditCard', 1, '["admin", "principal"]'),
(20, 'Fee Reports', '/finance/reports', 'BarChart', 2, '["admin", "principal"]'),
(20, 'Expenses', '/finance/expenses', 'Receipt', 3, '["admin", "principal"]'),

-- Masters
(0, 'Masters', NULL, 'Settings', 7, '["admin", "principal"]'),
(24, 'Classes', '/masters/classes', 'School', 1, '["admin", "principal"]'),
(24, 'Sections', '/masters/sections', 'Grid', 2, '["admin", "principal"]'),
(24, 'Categories', '/masters/categories', 'Tag', 3, '["admin", "principal"]'),
(24, 'Religion', '/masters/religion', 'Heart', 4, '["admin", "principal"]');
