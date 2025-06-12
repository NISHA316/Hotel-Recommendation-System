let mysql=require("mysql2");
require("dotenv").config();

let conn=mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'nisha87', // replace with your MySQL password
    database: 'hospitalproject',   // replace with your DB name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// conn.connect((err)=>{

//     if(err)
//         {
//     console.log("database is not connected "+err);
//         }
//         else{

//             console.log("database is connected");
//         }

// });
// /config/db.js


// Test the connection

conn.query('SELECT 1', (err, results) => {
    if (err) {
      console.error('❌ Database connection failed:', err.message);
    } else {
      console.log('✅ Database connected successfully.');
    }
  });

module.exports=conn;