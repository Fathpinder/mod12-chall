INSERT INTO departments (name)
VALUES
('Sales'),
('Finance'),
('Legal'),
('Engineering');

INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 4),
('Software Engineer', 120000, 4),
('Accountant', 160000, 2),
('General Counsel', 500000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Peregrin', 'Took', 1, NULL),
('John', 'Price', 2, 1),
('Marcus', 'Agrippa', 3, NULL),
('Navani', 'Kholin', 4, 3),
('Tyrion', 'Lannister', 5, NULL),
('Charlie', 'Day', 6, NULL);