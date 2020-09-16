const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const questions = [
    {
        type: 'input',
        message: 'Please give Manager Name',
        name: 'managerName',
        validate: function(answer) {
            if (answer !== '') {
                return true;
            }

            return 'name required'
        }
    },
    {
        type: 'input',
        message: 'Please give Manager id',
        name: 'managerId',
        validate: function(answer) {
            if (answer !== '') {
                return true;
            }

            return 'id required'
        }
    },
    {
        type: 'input',
        message: 'Please give Manager email',
        name: 'managerEmail',
        validate: function(answer) {
            if (answer !== '') {
                return true;
            }

            return 'email required'
        }
    },
    {
        type: 'input',
        message: 'Please give Manager office number',
        name: 'managerNumber',
        validate: function(answer) {
            if (answer !== '') {
                return true;
            }

            return 'number required'
        }
    },
    {
        type: 'input',
        message: 'Please give Engineer Name',
        name: 'engineerName',
        validate: function(answer) {
            if (answer !== '') {
                return true;
            }

            return 'this section is required'
        }
    },
    {
        type: 'input',
        message: 'Please give Engineer id',
        name: 'engineerId',
        validate: function(answer) {
            if (answer !== '') {
                return true;
            }

            return 'this section is required'
        }
    },
    {
        type: 'input',
        message: 'Please give Engineer email',
        name: 'engineerEmail',
        validate: function(answer) {
            if (answer !== '') {
                return true;
            }

            return 'this section is required'
        }
    },
    {
        type: 'input',
        message: 'Please give Engineer Github username',
        name: 'engineerGithub',
        validate: function(answer) {
            if (answer !== '') {
                return true;
            }

            return 'this section is required'
        }
    },
    {
        type: 'input',
        message: 'Please give Intern Name',
        name: 'interName',
        validate: function(answer) {
            if (answer !== '') {
                return true;
            }

            return 'this section is required'
        }
    },
    {
        type: 'input',
        message: 'Please give Intern id',
        name: 'internId',
        validate: function(answer) {
            if (answer !== '') {
                return true;
            }

            return 'this section is required'
        }
    },
    {
        type: 'input',
        message: 'Please give Intern email',
        name: 'internEmail',
        validate: function(answer) {
            if (answer !== '') {
                return true;
            }

            return 'this section is required'
        }
    },
    {
        type: 'input',
        message: 'Please give Intern"s school',
        name: 'internSchool',
        validate: function(answer) {
            if (answer !== '') {
                return true;
            }

            return 'this section is required'
        }
    },

]
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
inquirer
.prompt(questions)
.then(response => {
    console.log(response);

    const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerNumber);

    const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub);
    
    const intern = new Intern(response.internName, response.internId,response.internEmail, response.internSchool);


    let rendered = render([manager,engineer, intern]);

    fs.writeFile('./output/team.html', rendered, (err) => {
        if (err) {
            return console.log(err);
          }
        
          console.log("Success!");
    })
})

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
