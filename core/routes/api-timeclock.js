const WorkSegment = require("../model/worksegment")

const UserUtils = require('../utilities/user-utils')

function Api_TimeClock_Routes(app, express, db) {
   express.post('/api/v1/clock-in', (request, response) => {
      const usr = UserUtils.verifyAuthentication(app, request, response)
      if (usr == null)
         return

      let seg = findOpenSegment(usr)
      if (seg != null) {
         response.send(simpleReponse(false, "already have an open work segment"))
         return
      }

      seg = new WorkSegment(usr.Id)
      seg.startSegment()

      db.save(seg, WorkSegment).then(res => {
         usr.segments.push(seg)
         usr.clockInTime = seg.Start.toLocaleString()
         response.send(simpleReponse(true, "", seg))
      }).catch (err => {
         console.log(err)
         response.send(simpleReponse(false, err, null))
      })
   })

   express.post('/api/v1/clock-out', (request, response) => {
      const usr = UserUtils.verifyAuthentication(app, request, response)
      if (usr == null)
         return

      let seg = findOpenSegment(usr)
      if (seg == null) {
         response.send(simpleReponse(false, "no open work segment"))
         return
      }

      seg.finishSegment()

      db.save(seg, WorkSegment).then(res => {
         usr.clockInTime = null
         response.send(simpleReponse(true, "", null))
      }).catch (err => {
         console.log(err)
         response.send(simpleReponse(false, err, null))
      })
   })

   // ?segmentId=XX&description=XX
   express.post('/api/v1/apply-desc', (request, response) => {
      const usr = UserUtils.verifyAuthentication(app, request, response)
      if (usr == null)
         return

      const segId = parseInt(request.body["segmentId"], 10)
      if (segId == 0) {
         response.send(simpleReponse(false, "invalid work segment"))
         return
      }

      let seg = usr.segments.filter(ws => segId == -1 ? ws.Finish == null : ws.Id == segId)
      if (seg.length == 0) {
         response.send(simpleReponse(false, "invalid work segment"))
         return
      }

      seg[0].Description = request.body["description"]
      db.save(seg[0], WorkSegment).then(res => {
         response.send(simpleReponse(true, "", {}))
      }).catch(err => {
         console.log(err)
         response.send(simpleReponse(false, err, null))
      })      
   })
}

function findOpenSegment(usr) {
   let seg = usr.segments.filter(ws => ws.Finish == null)
   if (seg.length == 0) {
      return null
   }

   return seg[0]
}

function simpleReponse(ok, msg, seg = null) {
   return { ok: ok, msg: msg, ws: seg }
}

module.exports = Api_TimeClock_Routes