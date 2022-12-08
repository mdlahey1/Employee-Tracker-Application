// Add routes/dependencies
const connection = require('./config/connection');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const figlet = require('figlet');
const chalk = require('chalk');
const { throwError } = require('rxjs');
const { default: Choices } = require('inquirer/lib/objects/choices');

// Establish Connection to mySQL and Command Line Introduction Text
connection.connect((error) => {
    if (error) throw error;
    console.log(chalk.cyan.bold('================================================================================================================================'));
    console.log('');
    console.log(chalk.cyan.bold(figlet.textSync('Employee Tracker Database')));
    console.log('');
    console.log(chalk.cyan.bold('================================================================================================================================'));
    console.log('Connection to employee_db established')
    promptUser();
})

const promptUser = async () => {
    const { choice } = await inquirer.prompt([
        {
            name: 'choices',
            type: 'list',
            message: 'Please select a database option:',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'View All Employees by Department',
                'View Department Salaries',
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
}