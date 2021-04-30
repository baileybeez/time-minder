const Condition = require('../../entity_framework/condition')
const WorkSegment = require("../model/worksegment")

const DateUtils = require('../utilities/date-utils')
const UserUtils = require('../utilities/user-utils')

function Api_WorkWeek_Routes(app, express, db) {
   express.get('/api/v1/work-week/', (request, response) => {
      const usr = UserUtils.verifyAuthentication(app, request, response)
      if (usr == null)
         return

      const startDate = new Date(request.query["week_start"])
      const endDate = new Date(startDate)
      endDate.setDate(startDate.getDate() + 7)

      let cId = new Condition("EmployeeId")
      cId.equals(usr.Id)

      let cDate = new Condition("Start")
      cDate.between(DateUtils.makeDateOnly(startDate), DateUtils.makeDateOnly(endDate))
      
      db.select(WorkSegment, [cId, cDate]).then(workSet => {
         var week = {}
         const finSegments = workSet.filter(ws => ws.Finish != null)  
         finSegments.forEach(ws => {
            if (week[DateUtils.makeDateOnly(ws.Start)] == null)
               week[DateUtils.makeDateOnly(ws.Start)] = 0

            week[DateUtils.makeDateOnly(ws.Start)] += (ws.Finish - ws.Start) / 1000
         })

         response.send({ 
            weekStart: startDate.toDateString(),
            summary: week 
         })
      })
   })
}

module.exports = Api_WorkWeek_Routes
