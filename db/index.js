const connection = require("./connection");

class DB {
  findAllEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  employeesByDept() {
    return this.connection.query(
      "SELECT department.name AS department, employee.first_name, employee.last_name FROM department LEFT JOIN employee on employee "
    )
  }

  employeesByRole() {
    return this.connection.query(
      
    )
  }

  findAllPossibleManagers(employeeId) {
    return this.connection.query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeId
    );
  }

  employeesByManager() {
    return this.connection.query(
      
    )
  }

  addEmployee() {
    return this.connection.query(
      
    )
  }

  deleteEmployee() {
    return this.connection.query(
      
    )
  }

  updateRole() {
    return this.connection.query(
      
    )
  }

  updateManager() {
    return this.connection.query(
      
    )
  }

  addRole() {
    return this.connection.query(
      
    )
  }

  addDepartment() {
    return this.connection.query(
      
    )
  }
}

module.export = new DB();
