
const DB = require('../../entity_framework/dbcontext')
const EF = require('../../entity_framework/entity')

class Employee extends EF.Entity {
	constructor() {
		super("Employees")
		super.hasPrimaryKey("Id", 		EF.kDataType_BigInt, 	0,  "Id")
      
		super.hasMember("Email", 		EF.kDataType_NVarChar, 	"", "Email")
		super.hasMember("Pin", 			EF.kDataType_NVarChar, 	"", "Pin")
		super.hasMember("Name", 		EF.kDataType_NVarChar, 	"", "Name")
		super.hasMember("SlackToken",	EF.kDataType_NVarChar, 	"", "SlackToken")
		super.hasMember("Deleted",		EF.kDataType_Bit, 		0,  "Deleted")
	}
}

module.exports = Employee