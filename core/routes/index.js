
function IndexRoutes(app, express, db) {
   express.get('/', (req, res) => {
      const user = app.getUserManager().get(req.session.userId || 0)
      let ts = 0
      if (user != null && user.segments.length > 0) {
         user.segments.forEach(seg => {
            if (seg.Finish != null) {
               ts += (seg.Finish - seg.Start) / 1000
            }               
         })
      }
      
      res.render('index', { user: user, span: ts })
   })
}

function formatTimespan(sec) {
   const min = Math.floor(sec / 60)
   return `${formatTime(min / 60)}h ${formatTime(min % 60)}m ${formatTime(sec % 60)}s`
}

function formatTime(n) {
   return Number(Math.floor(n)).toLocaleString('en-US', { minimumIntegerDigits: 2 })
}

module.exports = IndexRoutes