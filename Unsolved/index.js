const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project?',
    },
    {
      type: 'input',
      name: 'username',
      message: 'What is your Github username?',
    },
    {
      type: 'input',
      name: 'liveLink',
      message: 'Please provide the live link to your repo',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please write a small description of your project',
    },
    {
      type: 'checkbox',
      name: 'license',
      message: 'What kind of license should your project have?',
      choices: ['MIT', 'Apache 2.0', 'GLP 3.0', 'BDS 3.0', 'None'  ],
    },
    {
        type: 'input',
        name: 'runTests',
        message: 'What command should be run to run tests?',
      },
      {
        type: 'input',
        name: 'contributing',
        message: 'What does the user need to know about contributing to the repo?',
      },
  ]);

const generateREADME = (answers) =>
`
# ${answers.title}

## Table of Contents
##### * [Username](#username)
##### * [Link](#link)
##### * [Description](#description)
##### * [License](#license)
##### * [RunTests](#tests)
##### * [Contributing](#contributing)
##### * [Questions](#questions)

## Username
Please check out my github ${answers.username}.

## Link
Here is the live link to this repository ${answers.liveLink}.

## Description
${answers.description}

## License
The project is licensed under the ${answers.license} license. 

## Tests
${answers.runTests}

## Contributing
${answers.contributing}

## Questions
If you have any questions about this repo, open an issue or contact me directly at anthonygamon@icloud.com. 
`;

promptUser()
  .then((answers) => writeFileAsync('README.md', generateREADME(answers)))
  .then(() => console.log('Successfully wrote to README.md'))
  .catch((err) => console.error(err));

 