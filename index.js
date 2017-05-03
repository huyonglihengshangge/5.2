var express=require("express");
var path=require("path");
var mysql=require("./mysql");
var app=express();
app.use(express.static(path.join(__dirname,"static")));

app.get("/",function(req,res){
  res.sendFile(path.join(__dirname,"static/tpl/index.html"));
})
app.get("/tpl/:name",function(req,res){
    res.sendFile(path.join(__dirname,"static/tpl/"+req.params.name));
})

app.get("/select",function(req,res){
  mysql.query("select * from stuinfo",function(error,result){
        res.send(JSON.stringify(result));
  })
})
app.get("/del",function(req,res){
    var id=req.query.id;
    mysql.query("delete from stuinfo where id="+id,function(){
        res.send("ok");
    })
})
app.get("/edit",function(req,res){
    var id=req.query.id;
    mysql.query("select * from stuinfo where id="+id,function(error,result){
        res.send(JSON.stringify(result));
    })
})

app.get("/editCon",function(req,res){
    var id=req.query.id;
    var name=req.query.name;
    var sex=req.query.sex;
    var age=req.query.age;
    var classes=req.query.classes;
    mysql.query(`update stuinfo set name='${name}',sex='${sex}',age='${age}',classes='${classes}' where id=${id}`,function(error,result){
        console.log(error);
        res.send("ok");
    })
})

app.get("/addCon",function(req,res){
    var name=req.query.name||"";
    var age=req.query.age||0;
    var sex=req.query.sex||1;
    var classes=req.query.classes||"";
    mysql.query(`insert into stuinfo (name,sex,age,classes) values ('${name}','${sex}','${age}','${classes}')`,function (error,result) {
        res.send(result.insertId.toString())

    })

})

app.listen(8888);