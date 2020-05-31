const app      =    require('express')();
const mongoose =    require('mongoose');
var jwt        =    require('jsonwebtoken');
var user       =    require("./models/users");
var bodyParser =    require("body-parser");
var server     =    require("http").createServer(app);
var io         =    require("socket.io").listen(server);
var ping       =    require("./models/ping");

mongoose.connect("mongodb://localhost/datingapp");

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));






app.get('/register',(req,res)=>{
    res.render("register");
});

app.post('/register',(req,res)=>{
    user.create({
        username:req.body.username,
        imgsrc:req.body.imgsrc,
        password:req.body.password
    },(err,user)=>{
        if(err){console.log(err);
        }else{
           
            res.render("login");
            
        }
    });

    
});

//get login route
app.get("/login",function(req,res){
    res.render("login");
});




//post route for login
app.post('/login', (req, res) => {
   
    
    const request = {
      username: req.body.username,
      password:req.body.password
    }
    user.find({},(err,users)=>{
     if(err){
         res.sendStatus(404);
     }else{
        users.forEach((use)=>{if(use.username==req.body.username && use.password==req.body.password){
            jwt.sign({request:request}, 'secretkey', { expiresIn: '1h' }, (err, token) => {
                if(err){res.send(err)}else{
                    user.find({'username':use.username,'password':use.password},(err,user)=>{
                        if(err){res.sendStatus(404)}else{
                            res.render('post',{'p':token,'use':user});
                        }
                    });
                   
                      
                   
                   
                }    
                  });
        }})
        }
    });
   });

   




  app.post('/posts', (req, res) => {  
   
    jwt.verify(req.body.token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
          
          my=authData.request.username;
          console.log(my);
          
          user.find({},(err,users)=>{
              if(err){console.log(err);
              }else{
                     res.render('people',{'users':users,'my':my});
                   }
             
          });
          console.log(authData.request.username);
          
        
      }
    });
  });

  app.post("/people",(req,res)=>{
      userid=req.body._id;
     
        ping.create({
            ping:userid,
            
     
         },(err,use)=>{
             if(err){console.log(err);
             }else{
                user.find({},(err,u)=>{
                    if (err){}else{
                     res.render("people",{'users':u});
                    }
                });
                
                
                 
             }
         });
      
        
       
     //    socket.to(socket.id).emit('chat history', chatHistory)

  

  });
  
 

  


  




 server.listen(3000,()=>{
  console.log("server stated at 3000");
  
  });