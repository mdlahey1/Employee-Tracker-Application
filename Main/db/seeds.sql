-- Establish values for Departments in db --
INSERT INTO department(name)
VALUES ("Accounting/Finance"), ("Engineering"), ("Human Resources"), ("Legal"), ("Marketing"), ("Production"), ("Sales");

-- Establish values for Roles in db --
INSERT INTO role(title, salary, department_id)
VALUES
    (Accountant, 50000, 1), (Sr Accountant, 60000, 1), ( Accounting Team Lead, 85000, 1),
    (Engineer, 70000, 2), (Sr Engineer, 100000, 2), (Engineering Team Lead, 120000, 2),
    (HR Representative, 50000, 3), (Sr HR Representative, 60000, 3), (HR Team Lead, 85000, 3),
    (Attorney, 100000, 4), (Sr Attorney, 120000, 4), (Lead Attorney, 200000, 4),
    (Marketing Representative, 50000, 5), (Sr Marketing Representative, 70000, 5), (Team Lead Marketing, 70000, 5),
    (Production Analyst, 50000, 6), (Sr Production Analyst, 60000, 6), (Production Team Lead, 70000, 6),
    (Sales Agent, 40000, 7), (Sales Agent, 40000, 7), (Sales Agent, 40000, 7);

-- Establish values for Employees in db --
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    (Matt, Lahey, 3, null), (John, Smith, 2, 1), (Jake, Marshall, 1, 1),
    (Brett, Slager, 6, null), (Jack, Peters, 5, 4), (Sean, Brosnan, 4, 4),
    (Mike, Nieder, 9, null), (Joe, Galiotto, 8, 7), (Tom, Stein, 7, 7),
    (Keenan, McKenzie, 12, null), (Mary, Jones, 11, 10), (Liz, McDaniels, 10, 10),
    (Olivia, Rodriguez, 15, null), (Lucy, Gonzalez, 14, 13), (Zach, Thomas, 13, 13),
    (Joseph, Reed, 18, null), (John, Fritz, 17, 16), (Tina, Flick, 16, 16),
    (Lynn, Tatge, 21, null), (Lisa, Fox, 20, 19), (Rina, Smart, 19, 19);


