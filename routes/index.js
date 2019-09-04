const routes = require('express').Router();
require('dotenv').config();
const bcrypt= require('bcrypt-nodejs');
const knex = require('knex');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'auth'
  }
});
routes.use(bodyParser.json());
routes.post('/login',function(req,res){
	const {email,password} =req.body;
  db.select('email','hash').from('users')
    .where('email','=',req.body.email)
    .then(data=>{
      const isValid =bcrypt.compareSync(req.body.password,data[0].hash);
      if(isValid)
      {
        var token = jwt.sign({ email: email,password: password }, process.env.SECRET_CODE);
        res.send(token);
      
      }
      else
      {
        res.status(400).json("invalid data");
      }


    })
  .catch(err=>res.status(400).json("invalid data"))
  
});


routes.post('/register',(req,res)=>{
   const {name,email,password}=req.body;
   const hash = bcrypt.hashSync(password);
     db('users').insert({
     	name:name,
     	email:email,
     	hash:hash,


     }).then(res.send('hi'));

});

module.exports = routes;