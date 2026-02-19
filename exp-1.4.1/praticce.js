const fs = require("fs");
const readline = require("readline");

const FILE = "employees.json";
let employees = [];

if (fs.existsSync(FILE)) {
    employees = JSON.parse(fs.readFileSync(FILE));
}

function save() {
    fs.writeFileSync(FILE, JSON.stringify(employees, null, 2));
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu() {
    console.log("\n1. Add Employee");
    console.log("2. View Employees");
    console.log("3. Update Employee");
    console.log("4. Delete Employee");
    console.log("5. Exit");

    rl.question("Choose option: ", (ch) => {
        if (ch === "1") add();
        else if (ch === "2") view();
        else if (ch === "3") update();
        else if (ch === "4") remove();
        else if (ch === "5") rl.close();
        else menu();
    });
}

function add() {
    rl.question("ID: ", (id) => {
        rl.question("Name: ", (name) => {
            rl.question("Age: ", (age) => {
                rl.question("Department: ", (dept) => {
                    employees.push({ id, name, age: Number(age), department: dept });
                    save();
                    menu();
                });
            });
        });
    });
}

function view() {
    console.table(employees);
    menu();
}

function update() {
    rl.question("Enter ID to update: ", (id) => {
        const emp = employees.find(e => e.id === id);
        if (!emp) return menu();
        rl.question("New Name: ", (name) => {
            rl.question("New Age: ", (age) => {
                rl.question("New Department: ", (dept) => {
                    emp.name = name;
                    emp.age = Number(age);
                    emp.department = dept;
                    save();
                    menu();
                });
            });
        });
    });
}

function remove() {
    rl.question("Enter ID to delete: ", (id) => {
        employees = employees.filter(e => e.id !== id);
        save();
        menu();
    });
}

menu();
