DROP TABLE IF EXISTS departmentS;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departmentS (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    deptName VARCHAR(20) NOT NULL,
    manager VARCHAR(20) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    deptName VARCHAR(20) NOT NULL,
    salary DECIMAL(10,2)
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    title VARCHAR(30) NOT NULL
);