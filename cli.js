#!/usr/bin/env node

const inquirer = require('inquirer');
const config = require('./config')
const Everything = require('./everything.js')

const logo = require('asciiart-logo');
const package = require('./package.json');
console.log(logo(package).render());

inquirer
  .prompt([
    {
      type: 'list',
      name: 'pm',
      message: 'Choose a platform:',
      choices: config.map(item => item.name)
    }
  ])
  .then(async (res) => {
    const everything = new Everything(res.pm)

    await everything.run()
  });