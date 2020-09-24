
const dbIndex = require("./db/index");
const consoleTable = require("console.table")
const inquirer = require("inquirer")
//require table thing
//require inquirer

// use async await for functions
// one big function that runs your big inquirer as well as Switch statement to run the necessary functions
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
    //Update Employee Manager
        //Which employee's manager do you want to update?
