const conn = require("../config/db.js");

exports.saveUser = (username, useremail, password, contact, type) => {
    let sql = "INSERT INTO usermaster (username, useremail, password, contact, type) VALUES (?, ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
        conn.query(sql, [username, useremail, password, contact, type], (err, result) => {
            if (err) 
                {
                    console.log(err);
                    return resolve("failed");
                }
            console.log(result)
            resolve("done");
        });
    });
};

 
 


// // ✅ Validate user login
exports.validateUserFromDB = (username, password, type) => {
    let sql = "SELECT * FROM usermaster WHERE username = ? AND password = ? AND type = ?";
    return new Promise((resolve, reject) => {
        conn.query(sql, [username, password, type], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};


// // ✅ Get profile by login user ID
// exports.getLoginUserProfile = (loginUserId) => {
//     let sql = "SELECT * FROM usermaster WHERE userid = ?";
//     return new Promise((resolve, reject) => {
//         conn.query(sql, [loginUserId], (err, result) => {
//             if (err) return reject(err);
//             resolve(result);
//         });
//     });
// };

// // ✅ Update profile
// exports.updateProfile = (username, useremail, password, contact, type, userid) => {
//     let sql = "UPDATE usermaster SET username = ?, useremail = ?, password = ?, contact = ?, type = ? WHERE userid = ?";
//     return new Promise((resolve, reject) => {
//         conn.query(sql, [username, useremail, password, contact, type, userid], (err, result) => {
//             if (err) return reject(err);
//             resolve(result);
//         });
//     });
// };




















// // const { resolveInclude } = require("ejs");
// // let conn=require("../config/db.js");
// // exports.saveUser=(...regData)=>
// // {
// //              conn.query("insert into usermaster values('0',?,?,?,?,?)",
// //                 [...regData]);
// //                 return true;
// // }


// // // exports.validateUserFromDB = (username, password) => {
// // //   const promise = new Promise((resolve, reject) => {
// // //       conn.query(
// // //           "SELECT * FROM usermaster WHERE username=? AND password=?",
// // //           [username, password],
// // //           (err, result) => {
// // //               if (err) {
// // //                   reject(err);
// // //               } else {
// // //                   console.log("DB result:", result);
// // //                   resolve(result);
// // //               }
// // //           }
// // //       );
// // //   });
// // //   return promise;
// // // };


// // // Example in regModel.js
// // exports.validateUserFromDB = async (username, password, type) => {
// //   let sql = "SELECT * FROM usermaster WHERE username = ? AND password = ? AND type = ?";
// //   let values = [username, password, type];

// //   try {
// //       let [rows] = await db.execute(sql, values);
// //       return rows;
// //   } catch (err) {
// //       console.error("Error in validateUserFromDB:", err);
// //       return [];
// //   }
// // };






// //       exports.getLoginUserProfile=(loginUserId)=>
// //         {
// //             let promise=new Promise((resolve,reject)=>{
// //             conn.query("select*from usermaster where  userid=? ",[loginUserId],(err,result)=>{
// //                 if(err)
// //                     {
// //                       reject(err);
    
// //                     }
// //                     else
// //                     {
// //                         console.log(result);
// //                         resolve(result);
// //                     }
                
// //             })
    
// //               });
// //               return promise;
// //           }; 
 
          

    
// //           exports.updateProfile=(...update)=>
// //             {
// //                 let promise=new Promise((resolve,reject)=>{
// //                 conn.query("update usermaster set username=?, useremail=?,password=?,contact=? where rid=?",[...update],(err,result)=>{
// //                     if(err)
// //                         {

// //                           reject(err);
        
// //                         }
// //                         else
// //                         {
// //                             console.log(result);
// //                             resolve(result);
// //                         }
                    
// //                 })
        
// //                   });
// //                   return promise;
// //               };   
    