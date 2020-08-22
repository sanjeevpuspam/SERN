var mysql 		= require("mysql");

var pool      	=    mysql.createPool({
		connectionLimit : 100, //important
		host     : '192.168.10.10',
		user     : 'homestead',
		password : 'secret',
		database : 'interview',
		debug    :  false
});

exports.getResults = function(sqlQuery,callback,data=null){
	pool.getConnection(function(err,connection){
        if (err){
          callback(err, null, null);
          return;
        }  
        connection.query(sqlQuery,data,function(err,rows){
            connection.release();
            callback(err,rows);
        });
  });
}