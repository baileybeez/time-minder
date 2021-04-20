
function LogoutRoutes(app, db) {
   app.get('/logout', (req, res) => {
      res.redirect('/')
   })
}

module.exports = LogoutRoutes