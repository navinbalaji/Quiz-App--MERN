const express= require('express');
const app=express();
const bodyParser =require('body-parser');
const mysql = require('mysql');
const jwt=require('jsonwebtoken');
const cors=require('cors');

var {authenticate}= require('./authenticate');

app.set('view engine',"ejs");
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors());


// var pool  = mysql.createPool({
//    connectionLimit : 5,
//    host:"bkh6mt4chccisyx2hwcf-mysql.services.clever-cloud.com",
//    user:"ud18qecsvwrzcpgl",
//    password:"LeSupJxkqQb6hVGnlc14",
//    database: "bkh6mt4chccisyx2hwcf"
//   });

  var pool=mysql.createPool({
    connectionLimit : 5,
    host:"localhost",
    user:"root",
    password:"",
    database: "testing"
  })


app.get('/questions',[authenticate],(req,res)=>{
    pool.getConnection(function(err, connection) {
        // Use the connection
        var sql="select * from questions order by rand()";
         connection.query( sql, function(err, rows) {
        // And done with the connection.
        if(err) console.log(err)
        res.json(rows);    
           connection.release();
        // Don't use the connection here, it has been returned to the pool.
         });
       });

});

app.post("/login",(req,res)=>{
    const {ans}=req.body;
        var loginquery=`select * from login where username='${ans.email}' and password='${ans.password}'`;
        
    pool.getConnection( (err,connection)=>{
           if(err)console.log(err);

         connection.query(loginquery,(err,result)=>{
             if(err){
                 console.log(err);  
             }
             
             if((result.length>0)){
                 jwt.sign({
                   data:result[0].name,
                 },"navinsecretkey",{ expiresIn:'1h'},(err,token)=>{
                     if(err) console.log(err);
                     res.json({"status":"true","token":token});
                 })
                 
             }else{
                res.json({"status":"false"});
             }
            connection.release();
         })
    })
})

app.post('/submitted',(req,res)=>{
    const arr=[];
    const answerArray=[];
const {finalanswer,len}=req.body;
console.log(finalanswer,len);

//  for (var key in p) {
//     if (p.hasOwnProperty(key)) {
//         arr.push(key+"."+p[key])  
//    }
// }
finalanswer.map( (data)=>{
    arr.push(data.name+"."+data.answer);
})
     console.log(arr);


     pool.getConnection(function(err, connection) {
        // Use the connection
         connection.query( 'select correctanswer from questions', function(err, result) {
        if(err) console.log(err)
        result.map( (r)=>{
            answerArray.push(r.correctanswer);
        })
           connection.release();
           callBack(null,answerArray);
         });
       });

      var count=0;
      var temp=[];
      var temp1,temp2;
      function callBack(err,result){
          if(err) console.log(err);
          else{
            for(var i=0;i<arr.length;i++){
                temp=arr[i].split(".");
               temp1=parseInt(temp[0]);
               temp2=temp[1];
                if(temp2===result[temp1-1]){
                    count++;
                }
                
            }      
          }
          console.log("The Marks is : "+count);
          res.status(200).json({count});
      }

   
})


const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log("Server connected on port : " +port );
})