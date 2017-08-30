const express = require('express');
const hbs = require('hbs');//handle bars
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');



app.use((req,res,next)=>{

var now = new Date().toString();

var log =`${now}:${req.method} ${req.url}`;

console.log(log);

fs.appendFile('server.log',log + '\n',(err)=>{
    if(err){
        console.log('Unavle to append o server.log.');
    }
});

next();

});

// app.use((req,res,next)=>{
// res.render('mantenence.hbs');
// });


app.use(express.static(__dirname+'/public'));//middleware

hbs.registerHelper('getCurentyear',()=>{
return new Date().getFullYear();
});


hbs.registerHelper('screamIt',(text)=>{
return text.toUpperCase();
});


app.get('/',(req,res)=>{

// res.send({
//     name:'cyamac',
//     last:'beikzadeh'
// });
res.render('home.hbs',{
    pagetitle: 'Home page!!',
    wlcMsg: 'wellcom asshol'
});
});

app.get('/about',(req,res)=>{

res.render('about.hbs',{
    pagetitle: 'About page!!'
  
});
});

app.get('/bad',(req,res)=>{
res.send({
    errorMsg : 'unable to handle req'
});
});

app.listen(3000,()=>{
 console.log('server is loading at port 3000');
});