
function verifyAuthentication(app, req, res) {
   const user = app.getUserManager().get(req.session.userId || 0)
   if (user == null) {
      res.sendStatus(403)
   } 

   return user
}

module.exports = { verifyAuthentication }
