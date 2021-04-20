
const Employee = require('../model/employee')

function LoginRoutes(app, db) {
   app.get('/login', (req, res) => {
      res.render('login', { user: null })
   })
   
   app.post('/login', (req, res) => { 
      const email = req.body.email
      const pin = req.body.pin

      db.select(Employee, "Email", email).then(set => {
         if (set.length == 0 || set[0].Pin !== pin) {
            issueAuthFailure(res, email)
         } else {
            req.session.user = set[0]
            res.redirect('/')
         }
      }).catch (err => {
         console.log(err)
         issueAuthFailure(res, email)
      })
   })
}

function issueAuthFailure(res, email) {
   res.render('login', { email: email, auth: false, message: 'Invalid email or password' })
}

module.exports = LoginRoutes