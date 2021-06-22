const express = require("express");
const fs = require("fs");
 
const app = express();
app.use(function(request, response, next){
     
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
    fs.appendFile("server.log", data + "\n", function(){});
    next();
});
 
app.get("/api/goods", function(request, response){

    const content = fs.readFileSync("product.txt", "utf8");
    response.send(content);
});
app.listen(3000);