 
const express = require("express");
const fs = require("fs");
    
const app = express();
const jsonParser = express.json();
const filePath = "product.json";

app.get("/api/goods", function(req, res){
       
    const content = fs.readFileSync(filePath,"utf8");
    const users = JSON.parse(content);
    res.send(users);
});
  
// получение одного пользователя по id
app.get("/api/goods/:id", function(req, res){
       
    const id = req.params.id; // получаем id
    const content = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(content);
    let user = null;
    for(let i=0; i<users.length; i++){
        if(users[i].id==id){
            user = users[i];
            break;
        }
    }
    if(user){
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});
// получение отправленных данных
app.post("/api/goods", jsonParser, function (req, res) {
      
    if(!req.body) return res.sendStatus(400);
      
    const proCount = req.body.count;
    const proTitle = req.body.title;
    const proPrice = req.body.price;

    let product = {count: proCount, title: proTitle, price: proPrice};
      
    let data = fs.readFileSync(filePath, "utf8");
    let products = JSON.parse(data);
      
    // находим максимальный id
    const id = Math.max.apply(Math,products.map(function(o){return o.id;}))
    // увеличиваем его на единицу
    product.id = id+1;
    // добавляем пользователя в массив
    products.push(product);
    data = JSON.stringify(products);
    // перезаписываем файл с новыми данными
    fs.writeFileSync("product.json", data);
    res.send(product);
});
 // удаление пользователя по id
app.delete("/api/goods/:id", function(req, res){
       
    const id = req.params.id;
    let data = fs.readFileSync(filePath, "utf8");
    let products = JSON.parse(data);
    let index = -1;
    // находим индекс пользователя в массиве
    for(let i=0; i < products.length; i++){
        if(products[i].id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        // удаляем пользователя из массива по индексу
        const product = products.splice(index, 1)[0];
        data = JSON.stringify(products);
        fs.writeFileSync("product.json", data);
        // отправляем удаленного пользователя
        res.send(product);
    }
    else{
        res.status(404).send();
    }
});
// изменение пользователя
app.put("/api/goods", jsonParser, function(req, res){
       
    if(!req.body) return res.sendStatus(400);

    const prorId = req.body.id;
    const proCount = req.body.count;
    const proTitle = req.body.title;
    const proPrice = req.body.price;
      
    let data = fs.readFileSync(filePath, "utf8");
    const products = JSON.parse(data);
    let product;
    for(let i=0; i<products.length; i++){
        if(products[i].id==prorId){
            product = products[i];
            break;
        }
    }
    // изменяем данные у пользователя
    if(product){
        product.count = proCount;
        product.title = proTitle;
        product.price = proPrice;

        data = JSON.stringify(products);
        fs.writeFileSync("product.json", data);
        res.send(product);
    }
    else{
        res.status(404).send(product);
    }
});
   
app.listen(3000);