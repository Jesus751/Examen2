const mysql =  require('mysql2');

const mysqlConnection = mysql.createConnection({
    database:'electra',
    host:'localhost',
    port:'3006',
    user:'root',
    password:'root'

}); 

mysqlConnection.connect( (e) => {
    if(e){
        console.log(e);
        return;
    }else{
        console.log("la base de datos se conecto");
        
    }

});

module.exports = mysqlConnection;