const findAllEmployees = require("./db/index");
const consoleTable = require("console.table");
const inquirer = require("inquirer");

appMenu();

// use async await for functions
// one big function that runs your big inquirer as well as Switch statement to run the necessary functions
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
            findAllEmployees()
            appMenu()
          break;
        case "View Departments":
            viewDepartment()
            
          break;
        case "View Roles":
            viewRoles()
            
          break;
        case "Add Employee":
            addEmployee()
            
          break;
        case "Add Department":
          addDepartment()
          break;
        case "Add Role":
          break;
        case "Update Employee Role":
          break;
        case "Exit":
            process.exit();
      }
    });
}
// What would you like to do?
//View all employees
//View all employees by Department
//View all employees by Manager
//Add Employee
//What is the employee's first name?
//What is the employee's last name?
//What is the employee's role?
//list of roles
//Who is the employee's manager?
//list of managers
//Remove Employee
//list of names
//Update Employee Role
//Which employee's role do you want to update?
//list of employees
//What is the employee's new role?
//list of roles
//Update Employee Manager
//Which employee's manager do you want to update?
//list of employees
//Which employee do you want to set as manager for the selected employee?
//list of managers
//Add Role
//Enter new role
//Add Department
//Enter new department