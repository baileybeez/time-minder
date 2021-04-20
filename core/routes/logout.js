
function LogoutRoutes(app, db) {
   app.get('/logout', (req, res) => {
      req.session.user = null
      res.redirect('/')
   })
}

module.exports = LogoutRoutes