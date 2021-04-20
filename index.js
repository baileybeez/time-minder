//

const App = require("./core/app.js")
const config = require("./config.js")

config.root_dir = __dirname

const app = new App()
app.init(config).then(ok => {
   app.run()
}).catch (err => {
   console.log(err)
})