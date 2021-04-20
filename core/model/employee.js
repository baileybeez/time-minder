
const DB = require('../../entity_framework/dbcontext')
const EF = require('../../entity_framework/entity')

class Employee extends EF.Entity {
	constructor() {
		super("Employees")
		super.hasPrimaryKey("id", 		EF.kDataType_BigInt, 	0,  "Id")
      
		super.hasMember("email", 		EF.kDataType_NVarChar, 	"", "Email")
		super.hasMember("pin", 			EF.kDataType_NVarChar, 	"", "Pin")
		super.hasMember("name", 		EF.kDataType_NVarChar, 	"", "Name")
		super.hasMember("slackToken",	EF.kDataType_NVarChar, 	"", "SlackToken")
		super.hasMember("Deleted",		EF.kDataType_Bit, 		0,  "Deleted")
	}
}

module.exports = Employee