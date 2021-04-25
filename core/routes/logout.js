
function LogoutRoutes(app, express, db) {
   express.get('/logout', (req, res) => {
      req.session.userId = 0
      res.redirect('/')
   })
}

module.exports = LogoutRoutes