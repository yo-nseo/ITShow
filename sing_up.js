// const db = require('./database');
// const mysql = require('mysql');
// const dbConfig = require('./database')
import mysql from 'mysql';
import dbConfig from './database';

const dbOptions = {
    host : dbConfig.host,
    port : dbConfig.port,
    user : dbConfig.user,
    password : dbConfig.password,
}

const conn = mysql.createConnection(dbOptions);
conn.connect();

function checkPW(){
    var id = document.querySelector('#id');
    var pw1 = document.querySelector('#password');
    var pw2 = document.querySelector('#confirmp_pssword');

    if (id.value == '' || id.value.length < 4) {
        alert('ID 확인');
        id.focus();
    }
    else if (pw1.value.length < 4) {
        alert('PW는 4자 이상');
        pw1.focus();
    }
    else if (pw1.value != pw2.value) {
        alert('PW가 일치하지 않습니다.');
        pw2.focus();
    }
    else {
        // var sql = 'SELECT * FROM itshow_db.user_table WHERE id=?';
        // if (sql, [id], function(err, result) {
        //     if (err) console.log("디비 에러");
        //     if(result[0]) alert("존재하는 아이디");
        // })

        var sql = 'INSERT INTO itshow_db.user_table(`u_id`, `u_pw`) VALUES (?, ?)';
        conn.query(sql, ['id', 'pw1'], function (error, results, fields) {
            if (error){ console.log(error); }

        });

        alert(id.value + '님 환영합니다!');
        location.href='login.html'
    }
}