-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Set the starting value for AUTO_INCREMENT
ALTER TABLE users AUTO_INCREMENT = 100;

-- Create admin table
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Insert admin data
INSERT INTO admins (username, password) VALUES
('harry_admin', 'admin1password'),
('john_admin', 'admin2password');