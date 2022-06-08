// var mysql = require('mysql');
// // const Connection = require('mysql/lib/Connection');

// var dbconnInfo = mysql.createConnection({
//     host : 'localhost',
//     port : '3306',
//     user : 'root',
//     password : '1234'
// });

// dbconnInfo.connect();

// dbconnInfo.query('SELECT * FROM itshow_db.user_table;', function(error, result, fields){
//     if (error) {
//         console.log('쿼리 문장에 오류가 있음');
//     } else {
//         console.log(result);
//     }
// });

// dbconnInfo.end();

const mysql = require('mysql'); 

module.exports = function () {
    return {
      init: function () {
        return mysql.createConnection({
          host: 'localhost',
          port: '3306',
          user: 'root',
          password: '1234',
          database: 'itshow_db'
        })
      },
      
      db_open: function (con) {
        con.connect(function (err) {
          if (err) {
            console.error('mysql connection error :' + err);
          } else {
            console.info('mysql is connected successfully.');
          }
        })
      }
    }
  };