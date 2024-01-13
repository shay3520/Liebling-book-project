import {db} from "../connect.js"
import jwt from "jsonwebtoken";
import {login} from "./auth.js"
import moment from "moment";


export const getLikes = (req,res) => {

      const authHeader = req.headers['authorization'];

      // Check if Authorization header exists
      if (!authHeader) {
        return res.status(401).json({ message: 'Missing Authorization header' });
      }
    
      // Extract the token from the header
        const token = authHeader.split(' ')[1];
    
        jwt.verify(token, "secretkey" , (err,userInfo) => {
            if(err) return res.status(403).json("token is not valid!");

            
      
    
            const q = `SELECT userid FROM likes WHERE postid = (?)`;

      
            db.query(q,[req.query.postId ], (err,data) => {
                if(err) return res.status(500).json(err);
                return res.status(200).json(data.map(like=>like.userid));
            } );
              
  
      })
  }   

  export const addLikes = (req,res) => {

    const authHeader = req.headers['authorization'];

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({ message: 'Missing Authorization header' });
    }
  
    // Extract the token from the header
      const token = authHeader.split(' ')[1];
  
      jwt.verify(token, "secretkey" , (err,userInfo) => {
          if(err) return res.status(403).json("token is not valid!");

          
    
  
    const q = "INSERT INTO likes (`userid`, `postid`) VALUES (?, ?)";
    const values = [
        userInfo.id,
        req.body.postId
    ]
    
    db.query(q,[userInfo.id, req.body.postId], (err,data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("post has been liked!");
    } );
      

    })
}   

export const deleteLikes = (req,res) => {

    const authHeader = req.headers['authorization'];

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({ message: 'Missing Authorization header' });
    }
  
    // Extract the token from the header
      const token = authHeader.split(' ')[1];
  
      jwt.verify(token, "secretkey" , (err,userInfo) => {
          if(err) return res.status(403).json("token is not valid!");

          
    
  
    const q = "DELETE FROM likes WHERE `userid` = (?) AND `postid`=(?)";


    
    db.query(q,[userInfo.id, req.query.postId ], (err,data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("post has been disliked");
    } );
      

    })
}   

