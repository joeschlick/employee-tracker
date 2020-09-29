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
    return
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
    "SELECT * FROM roles"
  connection.query(query, function (err, result) {
    if (err) throw err;
    //resultsArray.push(result);
    console.table(result);
  });
};

getRoles = () => {
  const query = "SELECT id, title FROM roles";
  let roles = [];
  connection.query(query, function (err, result) {
    if (err) throw err;
    for (let i = 0; i < result.length; i++) {
      roles.push(`${result[i].id} ${result[i].Title}`);
    }
    //console.log(roles)
  });
  return roles
};

getManagers = () => {
  const query = "SELECT employee.id, employee.first_name, employee.last_name, CONCAT(employee.id, ' ', employee.first_name, ' ', employee.last_name) AS manager FROM employee WHERE manager_id IS NULL";
  let managers = [];
  connection.query(query, function (err, result) {
    if (err) throw err;
    for (let i = 0; i < result.length; i++) {
      managers.push(`${result[i].manager}`);
    }
    //console.log(managers)
  });
  return managers
};

getDepartments = () => {
  const query = "SELECT *, CONCAT (department.id, ' ', department.dept_name) AS department FROM department";
  let departments = [];
  connection.query(query, function (err, result) {
    if (err) throw err;
    for (let i = 0; i < result.length; i++) {
      departments.push(result[i].department);
    }
    console.log(departments)
  });
  return departments
};



addEmployee = async () => {
  let roles = await getRoles()
  let manager = await getManagers()
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
      name: "roles_id",
      choices: roles,
    },

    {
      type: "list",
      message: "Who is the employee's manager?",
      name: "manager_id",
      choices: manager,
    },
  ])
  .then( (employeeInfo) => {
    const id = employeeInfo.roles_id.replace(/ .*/, '');
    const mID = employeeInfo.manager_id.replace(/ .*/, '');
    const newEmployee ={
      first_name: employeeInfo.first_name,
      last_name: employeeInfo.last_name,
      roles_id: id,
      manager_id: mID
    }
    const query = "INSERT INTO employee SET ?";
    connection.query(query, newEmployee)

    console.log(`Added employee ${employeeInfo.first_name} ${employeeInfo.last_name}.`);
  })
};

addDepartment = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "dept_name",
      message: "What department do you want to add?",
    },
  ])
  .then((departmentInfo) => {
    const query = "INSERT INTO department SET ?";
    connection.query(query, departmentInfo)

    console.log(`Added department ${departmentInfo.dept_name}.`);
  })
}


addRole = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of the role you want to add?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary?",
    },
    {
      type: "input",
      name: "department_id",
      message: "What department is it in?",
    },
  ])
  

}

//addDepartment



// updateRole() {
//   return this.connection.query(const query = 'UPDATE employee SET role_id=? WHERE employee.first_name=? AND employee.last_name=?'

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
