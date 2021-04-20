//

const express = require('express')
const http = require('http')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')

const RouteParser = require("./route-parser")

const DB = require("../entity_framework/dbcontext")
const Employee = require("./model/employee")
const { db } = require('../config-example')

class App {
   constructor() {
      this._app = null     
      this._router = null
      this._db = null
   }

   init(config) {
      return new Promise((resolve, reject) => {
         this._config = config

         this._db = new DB.DbContext(this._config.db)
         this._db.testConnection().then(ret => {
            this.initializeDataModel()
            this.initializeApp()

            const parser = new RouteParser()
            parser.setupRoutes(this).then(ok => {
               this._app.use(function (req, res, next) {
                  var err = new Error('not found')
                  err.status = 404
                  next(err)
               })

               resolve(true)
            }).catch (err => reject(err))                        
         }).catch (err => reject(err))
      })
   }

   initializeDataModel() {
      this._db.registerClass(Employee)
   }

   initializeApp() {
      this._app = express()
            
      this.setupViewEngine()
      this.setupAppOptions()
   }

   setupAppOptions() {
      this._app.use(logger('dev'))
      this._app.use(express.json())
      this._app.use(express.urlencoded({ extended: false }))
      this._app.use(cookieParser())
      this._app.use(express.static(path.join(this._config.root_dir, 'public')))
   }

   setupRoutes(fnc) {
      fnc(this._app, this._db)
   }

   setupViewEngine() {
      this._app.set('views', path.join(this._config.root_dir, 'views'))
      this._app.set('view engine', 'pug')
   }

   run() {
      const server = http.createServer(this._app)
      server.listen(this._config.node.port, () => { 
         console.log(`listening on port ${this._config.node.port} ... `)
      })
   }
}

module.exports = App