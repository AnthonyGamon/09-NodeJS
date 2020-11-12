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
      name: 'email',
      message: 'What is your email address?',
    },
    {
      type: 'input',
      name: 'projectName',
      message: 'What is your projects name?',
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
      name: 'dependencies',
      message: 'What command should be run to install dependencies?',
    },
    {
        type: 'input',
        name: 'runTests',
        message: 'What command should be run to run tests?',
      },
      {
        type: 'input',
        name: 'repo',
        message: 'What does the user need to know about using the repo?',
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
##### * [username](#username)
##### * [link](#link)
##### * [email](#email)
##### * [license](#license)
##### * [dependencies](#dependencies)
##### * [tests](#tests)
##### * [repo](#repo)
##### * [contributing](#contributing)


## username
Please check out my github ${answers.username}.
## link
Here is the live link to this repository ${answers.link}.
## email
Email me! ${answers.email}.
## license
https://img.shields.io/badge/license-${answers.license}-lightgrey
## dependencies

## tests

## repo

## contributing

`;

promptUser()
  .then((answers) => writeFileAsync('README.md', generateREADME(answers)))
  .then(() => console.log('Successfully wrote to README.md'))
  .catch((err) => console.error(err));