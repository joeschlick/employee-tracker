const connection1 = require("./connection");
const connection = connection1.myConn();
const inquirer = require("inquirer");
//const consoleTable = require("console.table");

findAllEmployees = () => {
  const query =
    "SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.dept_name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN roles on employee.roles_id = roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id";
  connection.query(query, function (err, result) {
    if (err) throw err;
    //resultsArray.push(result);
    console.table(result);
  });
};

viewDepartment = () => {
  const query =
    "SELECT department.dept_name AS department FROM department";
  connection.query(query, function (err, result) {
    if (err) throw err;
    //resultsArray.push(result);
    console.table(result);
  });
};

viewRoles = () => {
  const query =
    "SELECT roles.title AS roles, department.dept_name AS department, roles.salary FROM roles LEFT JOIN department on roles.department_id = department.id";
  connection.query(query, function (err, result) {
    if (err) throw err;
    //resultsArray.push(result);
    console.table(result);
  });
};

getRoles = () => {
  const query = "SELECT title FROM roles";
  let roles = [];
  connection.query(query, function (err, result) {
    if (err) throw err;
    roles.push(result);
    console.log(roles)
  });
};

getManagers = () => {
  const query = "SELECT employee.first_name, employee.last_name FROM employee WHERE manager_id IS NULL";
  let managers = [];
  connection.query(query, function (err, result) {
    if (err) throw err;
    managers.push(result);
    console.log(managers)
    //I get an empty array
  });
};

addEmployee = () => {
  const query = "INSERT into employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
  connection.query(nameQuery, function (err, result) {
    if (err) throw err;
    console.log(`Added employee ${employeeInfo.first_name} ${employeeInfo.last_name}.`);
  });

  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the employee's first name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the employee's last name?",
    },
    {
      type: "list",
      message: "What is the employee's role?",
      name: "role",
      choices: [
        // populate from db
      ],
    },
    {
      type: "list",
      message: "Who is the employee's manager?",
      name: "manager",
      choices: [
        // populate from db
      ],
    },
  ])
  .then((employeeInfo) => {

  })
};

// employeesByDept() {
//   return this.connection.query(
//     "SELECT department.name AS department, employee.first_name, employee.last_name FROM department LEFT JOIN employee on employee "
//   )
// }

// employeesByRole() {
//   return this.connection.query(

//   )
// }

// findAllPossibleManagers(employeeId) {
//   return this.connection.query(
//     "SELECT id, first_name, last_name FROM employee WHERE id != ?",
//     employeeId
//   );
// }

// employeesByManager() {
//   return this.connection.query(

//   )
// }

// addEmployee() {
//   return this.connection.query(

//   )
// }

// deleteEmployee() {
//   return this.connection.query(

//   )
// }

// updateRole() {
//   return this.connection.query(

//   )
// }

// updateManager() {
//   return this.connection.query(

//   )
// }

// addRole() {
//   return this.connection.query(

//   )
// }

// addDepartment() {
//   return this.connection.query(

//   )
// }

module.exports = findAllEmployees;
