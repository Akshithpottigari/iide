const App = require('./app')
const BlogsController = require('./blogs/blogController')
const app = new App([new BlogsController()])
app.listen();