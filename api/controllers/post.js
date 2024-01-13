import {db} from "../connect.js"
import jwt from "jsonwebtoken";
import {login} from "./auth.js"
import moment from "moment";

export const getPosts = (req,res) => {
  
    const userId = req.query.userId;
    const authHeader = req.headers['authorization'];
  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ message: 'Missing Authorization header' });
  }

  // Extract the token from the header
    const token = authHeader.split(' ')[1];

    jwt.verify(token, "secretkey" , (err,userInfo) => {
        if(err) return res.status(403).json("token is not valid!");

        const q = (userId>0) ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userid) WHERE p.userid = ?` :
         `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userid)
        LEFT JOIN relationships AS r ON (p.userid = r.followedUserId) WHERE r.followerUserId =? OR p.userid=?
        ORDER BY p.createdAt DESC`;
      const values = (userId > 0) ? [userId] : [userInfo.id , userInfo.id]; 
        
        db.query(q,values, (err,data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        } );
    });
    
    
    }

    export const addPost = (req,res) => {

      const authHeader = req.headers['authorization'];
  
    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({ message: 'Missing Authorization header' });
    }
  
    // Extract the token from the header
      const token = authHeader.split(' ')[1];
  
      jwt.verify(token, "secretkey" , (err,userInfo) => {
          if(err) return res.status(403).json("token is not valid!");
  
          const q = "INSERT INTO posts ( `desc` ,`img`, `userid`, `createdAt`) VALUES (?) ";

          const values = [
            req.body.desc,
            req.body.img,
            userInfo.id,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss ")
          ]
  
          
          db.query(q, [values] ,(err,data) => {
              if(err) return res.status(500).json(err);
              return res.status(200).json("post as been created");
          } );
      });
      
      
      
      }

  
    
      export const deletePost = (req,res) => {

        const authHeader = req.headers['authorization'];
    
        // Check if Authorization header exists
        if (!authHeader) {
          return res.status(401).json({ message: 'Missing Authorization header' });
        }
      
        // Extract the token from the header
          const token = authHeader.split(' ')[1];
      
          jwt.verify(token, "secretkey" , (err,userInfo) => {
              if(err) return res.status(403).json("token is not valid!");
    
              
        
      
        const q = "DELETE FROM posts WHERE `id` = (?) AND `userid`=(?)";
    
    
        
        db.query(q,[req.params.id, userInfo.id ], (err,data) => {
            if(err) return res.status(500).json(err);
            if(data.affectedRows>0)return res.status(200).json("post has been deleted");
            return res.status(403).json("you can delete only your posts!");
        } );
          
    
        })
    }   
    
    
  
    
   