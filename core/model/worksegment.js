
const DB = require('../../entity_framework/dbcontext')
const EF = require('../../entity_framework/entity')

class WorkSegment extends EF.Entity {
	constructor(empId = 0) {
		super("WorkSegments")
		super.hasPrimaryKey("Id", 		   EF.kDataType_BigInt, 	0,          "Id")

		super.hasMember("EmployeeId",    EF.kDataType_BigInt, 	0,          "EmployeeId")
		super.hasMember("Start", 		   EF.kDataType_DateTime, 	new Date(), "Start")
		super.hasMember("Finish", 		   EF.kDataType_DateTime, 	new Date(), "Finish")
		super.hasMember("WorkType",	   EF.kDataType_Int,    	0,          "WorkType")
		super.hasMember("Description",   EF.kDataType_NVarChar, 	"",         "Description")
		super.hasMember("Deleted",		   EF.kDataType_Bit, 		0,          "Deleted")

      this.EmployeeId = empId
	}

   startSegment() {
      this.Start = new Date()
      this.Finish = null
      this.prep()
   }

   finishSegment() {
      this.Finish = new Date()
      this.prep()
   }

   timeOnlyFromDate(val) {
       const dt = new Date(val)
       const hh = dt.getHours()
       const mm = dt.getMinutes().toString().padStart(2, "0")
       const tt = hh >= 12 ? "pm" : "am"

       return `${hh > 12 ? hh - 12 : hh}:${mm} ${tt}`
   }

   prep() {
      this.startTime = this.timeOnlyFromDate(this.Start)
      this.finishTime = this.Finish == null ? "" : this.timeOnlyFromDate(this.Finish)
   }
}

module.exports = WorkSegment