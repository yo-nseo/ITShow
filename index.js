const express = require('express');
const app = express();
const path = require('path');
const userRouter = require('./router/user.js');
const port = 5000;

app.use(express.json()); 
app.use(express.urlencoded({extended : true})) ;
app.use(userRouter);
app.use(express.static('public'));

app.get('/',(req,res)=> {
    res.sendFile(path.resolve("index.html"))
    //res.render('index.html');
});

// res.sendFile(__dirname+'index.html');

app.listen(port, ()=>console.log(`Server Start. Port : ${port}`))

const mysql = require('./database')();
const connection = mysql.init();
mysql.db_open(connection); 

app.post('/login', function(request, response) {
    var username = request.body.id;
    var password = request.body.pw;
    if (username && password) {
        connection.query('SELECT * FROM user_table WHERE u_id = ? AND u_pw = ? ',[username, password], (err, results, fields) =>{
            if (err){
                throw err;
            }else if (results.length>0){
                response.send('<script type="text/javascript">alert("환영합니다!"); document.location.href="/"</script>');
                response.end();
            }else{
                response.send('<script>alert("로그인 정보가 일치하지 않습니다."); document.location.href="/login";</script>');
            }
            //connection.end(); // DB 연결 끊기
        });
    } else {        
        response.send('<script type="text/javascript">alert("username과 password를 입력하세요!"); document.location.href="/login";</script>');    
        response.end();
    }
});