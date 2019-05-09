const fetch = require('node-fetch')
const fs = require('fs')
const util = require('util')

const config = require('./config')

class Everything {

  constructor(packageManager) {
    this.packageManager = config.find((setting) => {
      return setting.name === packageManager
    })
  }

  async run() {
    let names = await this.fetch()
    let path = await this.createFile(`${process.cwd()}/${this.packageManager.name}-dependencies.json`)
    let stream = fs.createWriteStream(path)

    names.map( async(item) => {
      const pkg = util.format(this.packageManager.formatting, item) + "\n"
      await stream.write(pkg)
    })

    stream.end()
  }

  async fetch() {
    return await fetch(this.packageManager.url, this.packageManager.fetchBody)
      .then(res => res.json())
      .then(data => {
        return this.packageManager.nested ? this.getNested(data) : data
      })
  }

  async createFile(path) {
    await fs.writeFile(path, '', (err) => {
      if(err) console.log(err)
    })

    return path
  }

  getNested(data) {
    return eval(`data.${this.packageManager.nested}`)
  }
}

module.exports = Everything