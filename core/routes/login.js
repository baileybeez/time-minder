
const Condition = require('../../entity_framework/condition')
const Employee = require('../model/employee')
const WorkSegment = require('../model/worksegment')

function LoginRoutes(app, express, db) {
   express.get('/login', (req, res) => {
      const user = app.getUserManager().get(req.session.userId || 0)
      if (user != null)
         res.redirect('/')
      else
         res.render('login', { user: null })
   })
   
   express.post('/login', (req, res) => { 
      const email = req.body.email
      const pin = req.body.pin
      
      let cEmail = new Condition("Email")
      cEmail.equals(email)

      db.select(Employee, [cEmail]).then(set => {
         if (set.length == 0 || set[0].Pin !== pin) {
            issueAuthFailure(res, email)
         } else {
            let cId = new Condition("EmployeeId")
            cId.equals(set[0].Id)

            let cDate = new Condition("Start")
            cDate.between(makeDateOnly(new Date()), makeDateOnly(new Date(), 1))

            db.select(WorkSegment, [cId, cDate]).then(workSet => {
               set[0].segments = workSet
               const ws = set[0].segments.filter(ws => ws.Finish == null)               
               if (ws.length > 0)
                  set[0].clockInTime = ws[0].Start.toLocaleString()

               app.getUserManager().add(set[0])
               req.session.userId = set[0].Id
               res.redirect('/')
            })            
         }
      }).catch (err => {
         console.log(err)
         issueAuthFailure(res, email)
      })
   })
}

function makeDateOnly(dt, day = 0) {
   return `${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate() + day}`
}

function issueAuthFailure(res, email) {
   res.render('login', { email: email, auth: false, message: '* Invalid email or password *' })
}

module.exports = LoginRoutes