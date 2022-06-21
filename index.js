const express = require('express');
const app = express();
const path = require('path');
const userRouter = require('./router/user.js');
const port = 5000;
const qs = require('querystring');

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
// connection.connect();

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

app.get('/writing', (req, res)=>{
    res.sendFile(path.resolve("public/writing.html"))
})

app.post('/insert', (req, res)=>{
    var title = req.body.title;
    var content = req.body.content;
    // form 태그로부터 제목, 내용 값을 전달받습니다.

    let sql = 'INSERT INTO `itshow_db`.`board` (b_title, b_content) VALUES (?, ?);'


    let params = [title, content];
    console.log('params ' + params);
    

    connection.query(sql, [title, content], function(err) { // sql를 실행하고 VALUES 으로 params를 보낸다.
        if(err) console.log('query is not excuted. insert fail...\n' + err);
        else res.redirect('/notice_board'); //오류 미 발생시 /list 돌아간다.
    });

})

app.get('/notice_board', function(req, res, next){
    let sql = "SELECT * FROM `itshow_db`.`board`";

    // res.render('notice_board.ejs');

    connection.query(sql, (err, rows) => {
        if (err) {
            console.error("query error \n" + err);
        } else {
            res.render('notice_board.ejs', {rows: rows});
        }
    });
});