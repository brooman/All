const fs = require('fs')

let configuration = []

fs.readdirSync(__dirname).map((setting) => {

    const name = setting.split('.')[0]

    //Dont require this file
    if(name === 'index') {
      return null
    }

    configuration.push(require(`${__dirname}/${setting}`))
})

module.exports = configuration