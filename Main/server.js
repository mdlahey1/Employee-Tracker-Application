// Add routes/dependencies
const connection = require('./config/connection');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const figlet = require('figlet');
const chalk = require('chalk');
const { throwError } = require('rxjs');

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

const promptUser = () => {

}