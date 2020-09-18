const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const cck = require('cck');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];
function appMenu() {
  function createManager() {
    inquirer.prompt([
    {
        type: 'input',
        message: 'Please give Manager Name:',
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
        message: 'Please give Manager id:',
        name: 'managerId',
        validate: function(answer) {
            if (isNaN(answer)) {
                return 'id required';
            }

            return true;
        }
    },
    {
        type: 'input',
        message: 'Please give Manager email:',
        name: 'managerEmail',
        validate: function(answer) {
            if (cck.check(answer,'email')) {
                return true;
            }

            return 'email format required: user@email.com'
        }
    },
    {
        type: 'input',
        message: 'Please give Manager office number:',
        name: 'managerNumber',
        validate: function(answer) {
            if (isNaN(answer)) {
                return 'number format required: XXX-XXX-XXXX';
            }

            return true;
        }
    }])
    .then(response => {
    const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerNumber);

    teamMembers.push(manager);

    createTeam();
    });
  }

  function createTeam() {
    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        buildTeam();
      }
    });
  }
  function addEngineer() {
    inquirer.prompt([
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
                if (isNaN(answer)) {
                    return 'An ID in the format of a number is required';
                }
    
                return true;
            }
        },
        {
            type: 'input',
            message: 'Please give Engineer email',
            name: 'engineerEmail',
            validate: function(answer) {
                if (cck.check(answer,'email')) {
                    return true;
                }
    
                return 'email format required: user@email.com'
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
        }])
        .then(response => {
        const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub);

        teamMembers.push(engineer);

        createTeam();
    });
  }
  function addIntern() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please give Intern Name',
            name: 'internName',
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
                if (isNaN(answer)) {
                    return 'this section is required';
                }
    
                return true;
            }
        },
        {
            type: 'input',
            message: 'Please give Intern email',
            name: 'internEmail',
            validate: function(answer) {
                if (cck.check(answer,'email')) {
                    return true;
                }
    
                return 'email format required: user@email.com'
            }
        },
        {
            type: 'input',
            message: "Please give Intern's school",
            name: 'internSchool',
            validate: function(answer) {
                if (answer !== '') {
                    return true;
                }
    
                return 'this section is required'
            }
        }])
        .then(response => {
        const intern = new Intern(response.internName, response.internId,response.internEmail, response.internSchool);

        teamMembers.push(intern);

        createTeam();
    });
  }
  function buildTeam() {
    // build html files from teamMembers array
    fs.writeFileSync('./output/team.html', render(teamMembers), "utf-8");
  }
  createManager();
}
appMenu();


    



