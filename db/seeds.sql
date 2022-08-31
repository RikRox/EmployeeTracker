USE business;

INSERT INTO departments(id, deptName, manager)
VALUES
(1, "IT", "Melanie"),
(2, "ENGINEERING", "Taria"),
(3, "MAINTENANCE","Rick"),
(4, "PRODUCTION", "Monie");

INSERT INTO roles(id, title, dept_id, salary)
VALUES
(1, "Developer", 1, 85000),
(2, "Cybersecurity Specialist", 1, 76000),
(3, "Mechanical Engineer", 2, 78000),
(4, "Electrical Engineer", 2,80000),
(5, "Automation Technician", 3, 40.50),
(6, "Industrial Technician", 3,34.50),
(7, "MP1",4, 22.50),
(8, "MP2", 4,24.50);

INSERT INTO employees(id, firstName, lastName, role_id)
VALUES
(1, "Rikayla", "Johnson",1),
(2, "Warrick", "Johnson",1),
(3, "Andrea", "Johnson", 2),
(4, "Cardosia", "Johnson",2),
(5, "Lillie", "Jenkins",3),
(6, "Lula", "Dukes",3),
(7, "Misha", "Morris",4),
(8, "Shorick", "Dosia",4),
(9, "Cree", "Zamir",5),
(10, "Harlow", "Alayah",5),
(11, "Ricky", "Craig",6),
(12, "Willie", "Bert",6),
(13, "Bill", "Francis",7),
(14, "Sport", "Stephen",7),
(15, "Austin", "Land",8),
(16, "Matthew", "Rowland",8);