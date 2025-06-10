let mysql=require("mysql2");
require("dotenv").config();

let conn=mysql.createConnection({
host:process.env.DB_HOST,
user:process.env.DB_USER,
password:process.env.DB_PAAWORD,
database:process.env.DB_NAME


});

conn.connect((err)=>{

    if(err)
        {
    console.log("database is not connected "+err);
        }
        else{

            console.log("database is connected");
        }

});
module.exports=conn;