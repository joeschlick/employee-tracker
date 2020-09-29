DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;
CREATE TABLE department(
  id INT AUTO_INCREMENT,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);
CREATE TABLE roles(
  id INT AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary decimal NOT NULL,
  department_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE employee(
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roles_id INT,
  manager_id VARCHAR(30),
  PRIMARY KEY(id),
  FOREIGN KEY (roles_id) REFERENCES roles(id)
);
INSERT INTO
  department (dept_name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');
INSERT INTO
  roles (
    title,
    salary,
    department_id,
  )
VALUES
  ('Salesperson', '80000','1'),
  ('Sales Lead', '100000', '1'),
  ('Software Engineer', '120000', '2'),
  ('Lead Engineer', '150000', '2'),
  ('Accountant', '125000', '3'),
  ('Head Accountant', '150000', '3'),
  ('Lawyer', '190000', '4'),
  ('Legal Team Lead', '250000', '4');
INSERT INTO
  employee (first_name, last_name, roles_id, manager_id)
VALUES
  ('John', 'Johnson', '2', null),
  ('Spicy', 'Bautista', '1', "1"),
  ('Chunky', 'Williams', '4', null),
  ('Wilma', 'Eric', '3', "3"),
  ('Charlie', 'Cooper', '5', "8"),
  ('Dred', 'Scott', '8', null),
  ('Chizzy', 'Wall', '7', "6"),
  ('Roger', 'Chutia', '6', null),
  ('Biff', 'Thurston', '3', "3")