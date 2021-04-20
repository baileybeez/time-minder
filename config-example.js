// needs to be configured to communicate with database and renamed to config.json for app to load
const kDevPort = 3000
const kLivePort = 80

const config = {
	node: { 
      port: kDevPort
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

switch (process.env.NODE_ENV) {
	default:
   case 'development':
      config.node.port = process.env.WEB_PORT || kDevPort
      break
      
	case 'production':
		config.node.port = process.env.WEB_PORT || kLivePort
		break
}

module.exports = config