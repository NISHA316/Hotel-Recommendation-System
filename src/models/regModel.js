const { resolveInclude } = require("ejs");
let conn=require("../config/db.js");
exports.saveUser=(...regData)=>
{
             conn.query("insert into usermaster values('0',?,?,?,?,?)",
                [...regData]);
                return true;
}
exports.validateUserFromDB=(...userCread)=>
    {
        let promise=new Promise((resolve,reject)=>{
        conn.query("select*from usermaster where username=? and password=?",[...userCread],(err,result)=>{
            if(err)
                {
                  reject(err);

                }
                else
                {
                    console.log(result);
                    resolve(result);
                }
            
        })

          });
          return promise;
      };   




      exports.getLoginUserProfile=(loginUserId)=>
        {
            let promise=new Promise((resolve,reject)=>{
            conn.query("select*from usermaster where  userid=? ",[loginUserId],(err,result)=>{
                if(err)
                    {
                      reject(err);
    
                    }
                    else
                    {
                        console.log(result);
                        resolve(result);
                    }
                
            })
    
              });
              return promise;
          }; 

    
          exports.updateProfile=(...update)=>
            {
                let promise=new Promise((resolve,reject)=>{
                conn.query("update usermaster set username=?, useremail=?,password=?,contact=?,type=? where rid=?",[...update],(err,result)=>{
                    if(err)
                        {

                          reject(err);
        
                        }
                        else
                        {
                            console.log(result);
                            resolve(result);
                        }
                    
                })
        
                  });
                  return promise;
              };   
    