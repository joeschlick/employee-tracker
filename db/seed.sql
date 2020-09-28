USE employee_db;
INSERT INTO
  department (name)
VALUES
  ("Sales"),
  ("Engineering"),
  ("Finance"),
  ("Legal");
INSERT INTO
  role (title, salary, department_id)
VALUES
  ('Sales Manager', 100000, 1),
  ('Salesperson', 60000, 1),
  ('Engineering Manager', 120000, 2),
  ('Engineer', 90000, 2),
  ('Lead Accountant', 120000, 3),
  ('Accountant', 90000, 3),
  ('Legal Attorney', 150000, 4),
  ('Attorney', 100000, 4);
INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Johnson', 1, null),
  ('Spicy', 'Bautista', 2, 1),
  ('Chunky', 'Williams', 3, null),
  ('Wilma', 'Eric', 4, 3),
  ('Charlie', 'Cooper', 5, null),
  ('Dred', 'Scott', 6, 5),
  ('Chizzy', 'Wall', 7, null),
  ('Biff', 'Thurston', 8, 7)