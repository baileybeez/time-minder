// needs to be configured to communicate with database 
// and renamed to config.json for app to load
const kPort = 3000

const config = {
	node: { 
      port: kPort
   },
   db_provider: "tedious",
   db: {
      server: "example.server.com", 
      user: "user_name", 
      pwd: "password",
      database: "database_to_use"
   },
   session: {
      secret: "your-session-secret"
   },
   root_dir: ""
}

module.exports = config