const fs = require('fs/promises')
const path = require('path')

const EF = require('../entity_framework/entity')
const DB = require('../entity_framework/dbcontext')

class RouteParser {
   constructor() {}

   setupRoutes(app) {
      return new Promise((resolve, reject) => {
         try {
            fs.readdir(path.join(__dirname, "routes")).then(fileList => {
               fileList.forEach(file => {
                  console.log(`- applying routes from '${file}'`)
                  app.setupRoutes(require(`./routes/${file}`))
               })
               resolve(true)
            }).catch (err => reject(err))
         } catch (err) { 
            reject(err)  
         }
      })
   }
}

module.exports = RouteParser