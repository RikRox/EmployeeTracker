const mysql = require('mysql2');
const inquirer = require('inquirer');
//require('console.table');

//sql connection
const db = require('./db/connection');

db.connect(err => {
  if (err) throw err; 
  console.log('DATABASE CONNECTED');

    firstPrompt();
  });






// prompt user inputs
// function firstPrompt() {

//   inquirer
//     .prompt({
//       type: "list",
//       name: "task",
//       message: "Would you like to do?",
//       choices: [
//         "View Employees",
//         "View Employees by Department",
//         "Add Employee",
//         "Remove Employees",
//         "Update Employee Role",
//         "Add Role",
//         "End"]
//     }).then((answer) => {
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

// function viewEmployees(){};


function firstPrompt() {

    inquirer
      .prompt({
        type: "list",
        name: "task",
        message: "Would you like to do?",
        choices: [
          "View Employees",
          "View Employees by Department",
          "Add Employee",
          "Remove Employees",
          "Update Employee Role",
          "Add Role",
          "End"]
      })
      .then(function ({ task }) {
        switch (task) {
          case "View Employees":
            viewEmployee();
            break;
  
          case "View Employees by Department":
            viewEmployeeByDepartment();
            break;
        
          case "Add Employee":
            addEmployee();
            break;
  
          case "Remove Employees":
            removeEmployees();
            break;
  
          case "Update Employee Role":
            updateEmployeeRole();
            break;
  
          case "Add Role":
            addRole();
            break;

        }
      });
  }
  
  //View Employees/ READ all, SELECT * FROM
  function viewEmployee() {

  
    var sql =
     `SELECT * FROM employees`

    db.query(sql, function (err, res) {
      if (err) throw err;
  
      console.table(res);
  
      firstPrompt();
    });
  
  }
  
  //"View Employees by Department" / READ by, SELECT * FROM
  // Make a department array
  function viewEmployeeByDepartment() {
  
    var sql =  `SELECT * FROM employees`

  
    db.query(sql, function (err, res) {
      if (err) throw err;
  
      const departmentChoices = res.map(data => ({
        value: data.id, name: data.name
      }));
  
      console.table(res);
      console.log("Department view succeed!\n");
  
      promptDepartment(departmentChoices);
    });
  }
  
  // User choose the department list, then employees pop up
  function promptDepartment(departmentChoices) {
  
    inquirer
      .prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Which department would you choose?",
          choices: departmentChoices
        }
      ])
      .then(function (answer) {
        console.log("answer ", answer.departmentId);
  
        var sql =`SELECT * FROM employees`

  
        db.query(sql, answer.departmentId, function (err, res) {
          if (err) throw err;
  
          console.table("response ", res);
          console.log(res.affectedRows + "Employees are viewed!\n");
  
          firstPrompt();
        });
      });
  }
  
  
  // Make a employee array
  function addEmployee() {

  
    var sql =`SELECT * FROM employees`

  
    db.query(sql, function (err, res) {
      if (err) throw err;
  
      const roleChoices = res.map(({ id, title, salary }) => ({
        value: id, title: `${title}`, salary: `${salary}`
      }));
  
      console.table(res);
      console.log("RoleToInsert!");
  
      promptInsert(roleChoices);
    });
  }
  
  function promptInsert(roleChoices) {
  
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?"
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?"
        },
        {
          type: "list",
          name: "roleId",
          message: "What is the employee's role?",
          choices: roleChoices
        },
      ])
      .then(function (answer) {
        console.log(answer);
  
        var sql = `INSERT INTO employee SET ?`
        // when finished prompting, insert a new item into the db with that info
        db.query(sql,
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.roleId,
            manager_id: answer.managerId,
          },
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log(res.insertedRows + "Inserted successfully!\n");
  
            firstPrompt();
          });
      });
  }
  
  //"Remove Employees" / DELETE, DELETE FROM
  // Make a employee array to delete
  function removeEmployees() {
    console.log("Deleting an employee");
  
    var sql =`SELECT * FROM employees`

  
    db.query(sql, function (err, res) {
      if (err) throw err;
  
      const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
        value: id, name: `${id} ${first_name} ${last_name}`
      }));
  
      console.table(res);
      console.log("ArrayToDelete!\n");
  
      promptDelete(deleteEmployeeChoices);
    });
  }
  
  // User choose the employee list, then employee is deleted
  function promptDelete(deleteEmployeeChoices) {
  
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee do you want to remove?",
          choices: deleteEmployeeChoices
        }
      ])
      .then(function (answer) {
  
        var sql = `DELETE FROM employees WHERE ?`;
        // when finished prompting, insert a new item into the db with that info
        db.query(sql, { id: answer.employeeId }, function (err, res) {
          if (err) throw err;
  
          console.table(res);
          console.log(res.affectedRows + "Deleted!\n");
  
          firstPrompt();
        });
      });
  }
  
  //"Update Employee Role" / UPDATE,
  function updateEmployeeRole() { 
    employeeArray();
  
  }
  
  function employeeArray() {
    console.log("Updating an employee");
  
    var sql = `SELECT * FROM employees`

    db.query(sql, function (err, res) {
      if (err) throw err;
  
      const employeeChoices = res.map(({ id, first_name, last_name }) => ({
        value: id, name: `${first_name} ${last_name}`      
      }));
  
      console.table(res);
      console.log("employeeArray To Update!\n")
  
      roleArray(employeeChoices);
    });
  }
  
  function roleArray(employeeChoices) {
    console.log("Updating an role");
  
    var sql = `SELECT * FROM employees`



    let roleChoices;
  
    db.query(sql, function (err, res) {
      if (err) throw err;
  
      roleChoices = res.map(({ id, title, salary }) => ({
        value: id, title: `${title}`, salary: `${salary}`      
      }));
  
      console.table(res);
      console.log("roleArray to Update!\n")
  
      promptEmployeeRole(employeeChoices, roleChoices);
    });
  }
  
  function promptEmployeeRole(employeeChoices, roleChoices) {
  
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee do you want to set with the role?",
          choices: employeeChoices
        },
        {
          type: "list",
          name: "roleId",
          message: "Which role do you want to update?",
          choices: roleChoices
        },
      ])
      .then(function (answer) {
  
        var sql = `UPDATE employee SET role_id = ? WHERE id = ?`
        // when finished prompting, insert a new item into the db with that info
        db.query(sql,
          [ answer.roleId,  
            answer.employeeId
          ],
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log(res.affectedRows + "Updated successfully!");
  
            firstPrompt();
          });
      });
  }
  
  
  
  //"Add Role" / CREATE: INSERT INTO
  function addRole() {
  
    var sql = `SELECT * FROM employees`


    
    db.query(sql, function (err, res) {
      if (err) throw err;
  
      // (callbackfn: (value: T, index: number, array: readonly T[]) => U, thisArg?: any)
      const departmentChoices = res.map(({ id, name }) => ({
        value: id, name: `${id} ${name}`
      }));
  
      console.table(res);
      console.log("Department array!");
  
      promptAddRole(departmentChoices);
    });
  }
  
  function promptAddRole(departmentChoices) {
  
    inquirer
      .prompt([
        {
          type: "input",
          name: "roleTitle",
          message: "Role title?"
        },
        {
          type: "input",
          name: "roleSalary",
          message: "Role Salary"
        },
        {
          type: "list",
          name: "departmentId",
          message: "Department?",
          choices: departmentChoices
        },
      ])
      .then(function (answer) {
  
        var sql = `INSERT INTO role SET ?`
  
        db.query(sql, {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.departmentId
        },
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log("Role Inserted!");
  
            firstPrompt();
          });
  
      });
  }