const Employee = require('./Employee');
// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

class Engineer extends Employee {
    constructor(gitUsername) {
        // might need this?
        super(name, id, email)
        this.gitUsername = gitUsername;
    }

    getGithub() {
        console.log(`${this.gitUsername}`);
        return this.gitUsername
    }
}

const engineer = new Engineer('haydenrust1')
engineer.getGithub();
engineer.getRole();