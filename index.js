const express = require("express")
var app = express()
app.use(express.static(__dirname))
app.get("/", (request,response) => response.sendFile('index.html'))
app.listen(5500, function () {
    console.log("Started application on port %d", 5500)
});