const db = require('./db/connection');
const inquirer = require('inquirer');
const mysql2 = require('mysql2');

const menu = [{
    type: 'list',
    message: 'What would you like to do?',
    name: 'action',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add role', 'Add employee', 'Update employee role', 'DONE']
}
];
const deptQs = [{
    type: 'text',
    name: 'name',
    message: 'Enter department name'
}];
const roleQs = [{
    type: 'text',
    name: 'title',
    message: 'Enter role title'
},
{
    type: 'text',
    name: 'salary',
    message: 'Enter role salary'
},
{
    type: 'text',
    name: 'department_id',
    message: 'What is the department ID for this role?'
}];
const employQs = [{
    type: 'text',
    name: 'first_name',
    message: 'Enter employee first name'
},
{
    type: 'text',
    name: 'last_name',
    message: 'Enter employee last name'
},
{
    type: 'text',
    name: 'role_id',
    message: "What is the ID for this employee's role?"
},
{
    type: 'text',
    name: 'manager_id',
    message: "What is the ID for this employee's manager?"
}];
const updateQs = [{
    type: 'text',
    name: 'id',
    message: "What is the ID for the employee you would like to update?"
},
{
    type: 'text',
    name: 'role_id',
    message: "What is the ID for this employee's new role?"
}];

const init = () => {
    inquirer
        .prompt(menu)
        .then((response) => {
            switch (response.action) {
                case 'View all departments':
                    viewDept();
                    break;
                case 'View all roles':
                    viewRole();
                    break;
                case 'View all employees':
                    viewEmploy();
                    break;
                case 'Add department':
                    addDept();
                    break;
                case 'Add role':
                    addRole();
                    break;
                case 'Add employee':
                    addEmploy();
                    break;
                case 'Update employee role':
                    updateRole();
                    break;
                case 'DONE':
                    console.log('Come back when the info needs updating')
                    break;
            }
        })
}

viewDept = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, results) => {
        console.table(results);
        init();
    });
};

viewRole = () => {
    const sql = `SELECT roles.id, roles.title, roles.salary, departments.name AS department
    FROM roles
    JOIN departments 
    ON roles.department_id = departments.id`;
    db.query(sql, (err, results) => {
        console.log('\n');
        console.table(results);
        init();
    });
};

viewEmploy = () => {
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS title, departments.name AS department, roles.salary AS salary, employees.manager_id AS manager
    FROM employees
    JOIN roles ON employees.role_id = roles.id
    JOIN departments ON roles.department_id = departments.id`;
    db.query(sql, (err, results) => {
        console.log('\n');
        console.table(results);
        init();
    });
};

addDept = () => {
    inquirer
        .prompt(deptQs)
        .then((response) => {
            const sql = `INSERT INTO departments (name) VALUES ('${response.name}')`;
            db.query(sql, (err, results) => {
                console.log(`${response.name} added to company departments`);
                init();
            });
        })
};

addRole = () => {
    inquirer
        .prompt(roleQs)
        .then((response) => {
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES ('${response.title}', ${response.salary}, ${response.department_id})`;
            db.query(sql, (err, results) => {
                console.log(`${response.title} added as a role`);
                init();
            });
        })
};

addEmploy = () => {
    inquirer
        .prompt(employQs)
        .then((response) => {
            const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
            VALUES ('${response.first_name}', '${response.last_name}', ${response.role_id}, ${response.manager_id})`;
            db.query(sql, (err, results) => {
                console.log(`${response.first_name} ${response.last_name} added as an employee`);
                init();
            });
        })
};

updateRole = () => {
    inquirer
        .prompt(updateQs)
        .then((response) => {
            const sql = `UPDATE employees SET role_id = ${response.role_id} WHERE id = ${response.id}`;
            db.query(sql, (err, results) => {
                console.log(`Employee ${response.id} has had their role ID updated to ${response.role_id}`);
                init();
            });
        })
};

init();