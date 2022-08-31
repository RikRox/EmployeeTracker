const inquirer = import('inquirer');

// function optionPrompt() { 
//     inquirer
//         .prompt
//         ({
//             type: "list",
//             name: "option",
//             message: "What would you like to do?",
//             choices: [
//                 "View Employees",
//                 "View Departments",
//                 "View Roles",
//                 "Add Employee",
//                 "Add Department",
//                 "Add Role",
//                 "Update Employee Role"
//             ]
//         }).then((answer) => {
//             if(answer == "View Employees"){
//                 viewEmployees();
//             } else if (answer == "View Departments"){
//                 viewDepartments();
//             } else if (answer == "View Roles"){
//                 viewRoles();
//             } else if (answer == "Add Employee"){
//                 addEmployee();
//             } else if (answer == "Add Department"){
//                 addDepartment();
//             } else if (answer == "Add Role"){
//                 addRole();
//             }
//         });
// };


function test() {
    console.log("is it working?");
}

//optionPrompt;

module.exports = {optionPrompt};