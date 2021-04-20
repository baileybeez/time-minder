
function IndexRoutes(app, db) {
   app.get('/', (req, res) => {
      res.render('index', { user: null })
   })
}

module.exports = IndexRoutes