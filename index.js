//const findAllEmployees = require("./db/index");
const consoleTable = require("console.table");
const inquirer = require("inquirer");
const connection1 = require("./db/connection");
const connection = connection1.myConn();


function appMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "intro",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View Departments",
          "View Roles",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then((introChoice) => {
      switch (introChoice.intro) {
        case "View all employees":
          findAllEmployees();
          // appMenu()
          break;
        case "View Departments":
          viewDepartment();

          //console.log(introChoice.intro)
          // appMenu()
          break;
        case "View Roles":
          viewRoles();
          // appMenu()
          break;
        case "Add Employee":
          addEmployee();
          //console.log(introChoice.intro)
          break;

        case "Add Department":
          addDepartment();
          // appMenu()
          break;
        case "Add Role":
          addRole();
          // appMenu()
          break;
        case "Update Employee Role":
          updateRole();
          // appMenu()
          break;
        case "Exit":
          process.exit();
      }
    });
}
findAllEmployees = () => {
  const query =
    "SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.dept_name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN roles on employee.roles_id = roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id";
  connection.query(query, function (err, result) {
    if (err) throw err;
    //resultsArray.push(result);
    console.table(result);
  });
  appMenu();
};

viewDepartment = () => {
  const query = "SELECT department.dept_name AS department FROM department";
  connection.query(query, function (err, result) {
    if (err) throw err;
    //resultsArray.push(result);
    console.log("\n");
    console.table(result);
  });
  appMenu();
};

viewRoles = () => {
  const query = "SELECT * FROM roles";
  connection.query(query, function (err, result) {
    if (err) throw err;
    //resultsArray.push(result);
    console.table(result);
  });
  appMenu();
};

// getRoles = () => {
//   const query = "SELECT id, title FROM roles";
//   let roles = [];
//   connection.query(query, function (err, result) {
//     if (err) throw err;
//     for (let i = 0; i < result.length; i++) {
//       roles.push(`${result[i].id} ${result[i].title}`);
//     }
//     //console.log(roles)
//   });
//   return roles;
// };

getRoles = () => {
  const query =
    "SELECT roles.id, roles.title, CONCAT(roles.id, ' ', roles.title) AS role FROM roles";
  return connection.query(query);
};

// getManagers = () => {
//   const query =
//     "SELECT employee.id, employee.first_name, employee.last_name, CONCAT(employee.id, ' ', employee.first_name, ' ', employee.last_name) AS manager FROM employee WHERE manager_id IS NULL";
//   let managers = [];
//   connection.query(query, function (err, result) {
//     if (err) throw err;
//     for (let i = 0; i < result.length; i++) {
//       managers.push(`${result[i].manager}`);
//     }
//     managers.push("null")
//     //console.log(managers)
//   });
//   return managers;
// };

getManagers = () => {
  const query =
    "SELECT employee.id, employee.first_name, employee.last_name, CONCAT(employee.id, ' ', employee.first_name, ' ', employee.last_name) AS manager FROM employee WHERE manager_id IS NULL";

  return connection.query(query);
};

getDepartments = () => {
  const query =
    "SELECT department.id, dept_name, CONCAT(department.id, ' ', dept_name) AS department FROM department";
  let departments = [];
  connection.query(query, function (err, result) {
    if (err) throw err;
    for (let i = 0; i < result.length; i++) {
      departments.push(`${result[i].department}`);
    }
    //console.log(departments)
  });
  return departments;
};

getEmployees = () => {
  const query =
    "SELECT employee.first_name, employee.last_name, CONCAT(employee.first_name, ' ', employee.last_name) AS employee FROM employee";
  return connection.query(query);

  //   let employees = [];
  // connection.query(query, function (err, result) {
  //   if (err) throw err;
  //   for (let i = 0; i < result.length; i++) {
  //     employees.push(result[i].employee);
  //   }
  //   //console.log(employees)
  // });
  // return employees;
};

addEmployee = async () => {
  let roles = await getRoles();
  let manager = await getManagers();

  //console.log(roles)

  let managerChoice = [];
  for (let i = 0; i < manager.length; i++) {
    managerChoice.push(manager[i].manager);
  }
  managerChoice.push("null");

  let roleChoice = [];
  for (let i = 0; i < roles.length; i++) {
    roleChoice.push(roles[i].role);
  }

  inquirer
    .prompt([
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
        choices: roleChoice,
      },

      {
        type: "list",
        message: "Who is the employee's manager?",
        name: "manager_id",
        choices: managerChoice,
      },
    ])
    .then((employeeInfo) => {
      const id = employeeInfo.roles_id.replace(/ .*/, "");
      const mID = employeeInfo.manager_id.replace(/ .*/, "");
      const newEmployee = {
        first_name: employeeInfo.first_name,
        last_name: employeeInfo.last_name,
        roles_id: id,
        manager_id: mID,
      };
      const query = "INSERT INTO employee SET ?";
      connection.query(query, newEmployee);

      console.log(
        `Added employee ${employeeInfo.first_name} ${employeeInfo.last_name}.`
      );
      appMenu();
    });
};

addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "dept_name",
        message: "What department do you want to add?",
      },
    ])
    .then((departmentInfo) => {
      const query = "INSERT INTO department SET ?";
      connection.query(query, departmentInfo);

      console.log(`Added department ${departmentInfo.dept_name}.`);
      appMenu();
    });
};

addRole = () => {
  let department = getDepartments();
  inquirer
    .prompt([
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
        type: "list",
        message: "What department is it in?",
        name: "department_id",
        choices: department,
      },
    ])
    .then((roleInfo) => {
      const id = roleInfo.department_id.replace(/ .*/, "");
      const newRole = {
        title: roleInfo.title,
        salary: roleInfo.salary,
        department_id: id,
      };
      const query = "INSERT INTO roles SET ?";
      connection.query(query, newRole);

      console.log(`Added role ${roleInfo.title}`);
      appMenu();
    });
};

updateRole = async () => {
  let employee = await getEmployees();
  let roles = await getRoles();
  console.log(employee);

  let employeeChoice = [];
  for (let i = 0; i < employee.length; i++) {
    employeeChoice.push(employee[i].employee);
  }

  let roleChoice = [];
  for (let i = 0; i < roles.length; i++) {
    roleChoice.push(roles[i].role);
  }
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee role would you like to update?",
        name: "employees",
        choices: employeeChoice,
      },
      {
        type: "list",
        name: "roles_id",
        message: "What new role will the employee have?",
        choices: roleChoice,
      },
    ])
    .then((roleInfo) => {
      //console.log(roleInfo)
      const id = roleInfo.roles_id.replace(/ .*/, "");
      const query = "UPDATE employee SET roles_id=?";
      connection.query(query, id);

      console.log(
        `Updated employee ${roleInfo.employees} with role ${roleInfo.roles_id}`
      );
      appMenu();
    });
};

appMenu();
