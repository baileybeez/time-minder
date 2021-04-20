
function IndexRoutes(app, db) {
   app.get('/', (req, res) => {
      res.render('index', { user: req.session.user })
   })
}

module.exports = IndexRoutes