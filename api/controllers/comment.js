import {db} from "../connect.js"
import jwt from "jsonwebtoken";
import {login} from "./auth.js"
import moment from "moment";


export const getComments = (req,res) => {

      /*  const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
        WHERE c.postid = (?) ORDER BY c.createdAt DESC`;

        
        db.query(q,[req.query.postId ], (err,data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        } );*/


        const authHeader = req.headers['authorization'];

        // Check if Authorization header exists
        if (!authHeader) {
          return res.status(401).json({ message: 'Missing Authorization header' });
        }
      
        // Extract the token from the header
          const token = authHeader.split(' ')[1];
      
          jwt.verify(token, "secretkey" , (err,userInfo) => {
              if(err) return res.status(403).json("token is not valid!");

              
        
      
        const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
        WHERE c.postid = (?) ORDER BY c.createdAt DESC`;

        
        db.query(q,[req.query.postId ], (err,data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        } );
          
    
        })
    }   

export const addComment = (req,res) => {

    const authHeader = req.headers['authorization'];

  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ message: 'Missing Authorization header' });
  }

  // Extract the token from the header
    const token = authHeader.split(' ')[1];

    jwt.verify(token, "secretkey" , (err,userInfo) => {
        if(err) return res.status(403).json("token is not valid!");

        const q = "INSERT INTO comments (`desc`, `createdAt`, `userid`, `postid`) VALUES (?, ?, ?, ?)";

        const values = [
            req.body.desc, 
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.postId
        ]
        console.log(values);
        
        db.query(q,[req.body.desc, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),userInfo.id,req.body.postId], (err,data) => {
            return res.status(200).json({
                desc: req.body.desc,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                userid: userInfo.id,
                postid: req.body.postId,
                // Include other comment fields if necessary
            });
            
        } );
    });
    
    
    }
