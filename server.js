

const db = require('./db/connection');
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
//const { optionPrompt } = require('./index');
const app = express();
const inquirer = import('inquirer');


const PORT = process.env.PORT || 3001;

//express middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//use api routes
app.use('/api', apiRoutes);


//default response for any other request
app.use((req, res) => {
    res.status(404).end();
});

//start server after db connection
db.connect(err => {
    if (err) throw err; 
    console.log('DATABASE CONNECTED');
    // app.listen(PORT, () => {
    //     console.log(`Server running on port ${PORT}`);
        // require('./index');
        // optionPrompt;
        // test();
        optionPrompt();
    });




    function optionPrompt() { 
        inquirer
            .prompt
            ({
                type: "list",
                name: "option",
                message: "What would you like to do?",
                choices: [
                    "View Employees",
                    "View Departments",
                    "View Roles",
                    "Add Employee",
                    "Add Department",
                    "Add Role",
                    "Update Employee Role"
                ]
            }).then((answer) => {
                if(answer == "View Employees"){
                    viewEmployees();
                } else if (answer == "View Departments"){
                    viewDepartments();
                } else if (answer == "View Roles"){
                    viewRoles();
                } else if (answer == "Add Employee"){
                    addEmployee();
                } else if (answer == "Add Department"){
                    addDepartment();
                } else if (answer == "Add Role"){
                    addRole();
                }
            });
    };


// });

// require('./index');
// optionPrompt;

