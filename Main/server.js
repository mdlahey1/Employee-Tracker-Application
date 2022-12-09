// Add routes/dependencies
const connection = require('./config/connection');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const figlet = require('figlet');
const chalk = require('chalk');
const validate = require('./validation');
const { throwError } = require('rxjs');
const { default: Choices } = require('inquirer/lib/objects/choices');
const { allowedNodeEnvironmentFlags } = require('process');


// Establish Connection to mySQL and Command Line Introduction Text
connection.connect((err) => {
    if (err) throw error;
    console.log(chalk.cyan.bold('================================================================================================================================'));
    console.log('');
    console.log(chalk.cyan.bold(figlet.textSync('Employee Manager Database')));
    console.log('');
    console.log(chalk.cyan.bold('================================================================================================================================'));
    console.log('Connection to employee_db established')
    promptUser();
})

// Initial user prompt that allows user to select database options
const promptUser = () => {
    inquirer.prompt([
        {
            name: 'choices',
            type: 'list',
            message: 'Please select a database option:',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'View Department Budgets',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Remove Department',
                'Remove Role',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'Exit'             
            ]
        }
    ])
    .then((responses) => {
        const {choices} = responses;
        // View All Departments selected
        if (choices === 'View All Departments') {
            viewAllDepartments();
        } else if (choices === 'View All Roles') {
            viewAllRoles();
        } else if (choices === 'View All Employees') {
            viewAllEmployees();
        } else if (choices === 'View Department Budgets') {
            viewDepartmentBudgets();
        } else if (choices === 'Add Department') {
            addDepartment();
        } else if (choices === 'Add Role') {
            addRole();
        };
    });
};

// ----- VIEW OPTIONS -----

// View All Departments
const viewAllDepartments = () => {
    const sqlQuery = `SELECT * FROM department`;
    connection.query(sqlQuery, (err, res) => {
        if (err) throw error;
        console.log(chalk.cyan.bold('==============================================================================='));
        console.log(chalk.cyan.bold(figlet.textSync('All  Departments')));
        console.log('');
        console.table(res);
        console.log(chalk.cyan.bold('==============================================================================='));
        promptUser();
    });
};

// View All Roles
const viewAllRoles = () => {
    const sqlQuery = `SELECT role.id, role.title, role.salary, role.department_id, department.name AS department_name FROM role INNER JOIN department ON role.department_id = department.id`;
    connection.query(sqlQuery, (err, res) => {
        if (err) throw error;
        console.log(chalk.cyan.bold('=============================================================================='));
        console.log(chalk.cyan.bold(figlet.textSync('All  Roles')));
        console.log('');
        console.table(res);
        console.log(chalk.cyan.bold('=============================================================================='));
        promptUser();
    });
};

// View All Employees
const viewAllEmployees = () => {
    const sqlQuery = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department_name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN employee manager on manager.id = employee.manager_id INNER JOIN role ON (role.id = employee.role_id) INNER JOIN department ON (department.id = role.department_id)`;
    connection.query(sqlQuery, (err, res) => {
        if (err) throw error;
        console.log(chalk.cyan.bold('==================================================================================='));
        console.log(chalk.cyan.bold(figlet.textSync('All  Current  Employees')));
        console.log('');
        console.table(res);
        console.log(chalk.cyan.bold('==================================================================================='));
        promptUser();
    });
};

// View Department Budgets
const viewDepartmentBudgets = () => {
    const sqlQuery = `SELECT department_id AS id, department.name AS department_name, SUM(salary) AS budget FROM  role INNER JOIN department ON role.department_id = department.id GROUP BY  role.department_id`;
    connection.query(sqlQuery, (err, res) => {
        if (err) throw error;
        console.log(chalk.cyan.bold('==================================================================================='));
        console.log(chalk.cyan.bold(figlet.textSync('Department  Budgets')));
        console.log('');
        console.table(res);
        console.log(chalk.cyan.bold('==================================================================================='));
        promptUser();
    });
};

// ----- ADD OPTIONS -----

// Add New Department
const addDepartment = () => {
    inquirer.prompt([
        {
          name: 'addDepartment',
          type: 'input',
          message: 'What is the name of your new Department?',
          validate: validate.validateString
        }
      ])
      .then((response) => {
        let sqlQuery = `INSERT INTO department (name) VALUES (?)`;
        connection.query(sqlQuery, response.addDepartment, (err, res) => {
          if (err) throwError;
          console.log(``);
          console.log(chalk.greenBright(`Department successfully created`));
          console.log(``);
          viewAllDepartments();
        });
      });
};

// Add New Role
const addRole = () => {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the name of the role?'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary of the role?'
        },
        {
            name: "departmentID",
            type: "input",
            message: "Which department id does the role belong to?"
        }
    ])
    .then((response) => {
        let sqlQuery = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        console.log(response.title);
        console.log(response.salary);
        console.log(response.departmentID);
        connection.query(sqlQuery, response.title, response.salary, response.departmentID, (err, res) => {
            if (err) throwError;
            console.log(``);
            console.log(chalk.greenBright(`Role successfully created`));
            console.log(``);
            viewAllRoles();
          });
        });
};