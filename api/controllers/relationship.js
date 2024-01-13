import {db} from "../connect.js"
import jwt from "jsonwebtoken";
import {login} from "./auth.js"
import moment from "moment";


export const getRelationships = (req,res) => {

      const authHeader = req.headers['authorization'];

      // Check if Authorization header exists
      if (!authHeader) {
        return res.status(401).json({ message: 'Missing Authorization header' });
      }
    
      // Extract the token from the header
        const token = authHeader.split(' ')[1];
    
        jwt.verify(token, "secretkey" , (err,userInfo) => {
            if(err) return res.status(403).json("token is not valid!");

            
     const q = `SELECT followerUserId FROM relationships WHERE followedUserId = (?)`;

      
      db.query(q,[req.query.followedUserId ], (err,data) => {
          if(err) return res.status(500).json(err);
          return res.status(200).json(data.map(relationship=>relationship.followerUserId));
      } );

    
        
  
      })
  }   

  export const addRelationships = (req,res) => {

    const authHeader = req.headers['authorization'];

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({ message: 'Missing Authorization header' });
    }
  
    // Extract the token from the header
      const token = authHeader.split(' ')[1];
  
      jwt.verify(token, "secretkey" , (err,userInfo) => {
          if(err) return res.status(403).json("token is not valid!");

          
    
  
    const q = "INSERT INTO relationships (`followerUserId`, `followedUserId`) VALUES (?, ?)";
    const values = [
        userInfo.id,
        req.body.userId
    ]
    
    db.query(q,[userInfo.id, req.body.userId], (err,data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("following!");
    } );
      

    })
}   

export const deleteRelationships = (req,res) => {

    const authHeader = req.headers['authorization'];

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({ message: 'Missing Authorization header' });
    }
  
    // Extract the token from the header
      const token = authHeader.split(' ')[1];
  
      jwt.verify(token, "secretkey" , (err,userInfo) => {
          if(err) return res.status(403).json("token is not valid!");

          
    
  
    const q = "DELETE FROM relationships WHERE `followerUserId` = (?) AND `followedUserId`=(?)";


    
    db.query(q,[userInfo.id, req.query.userId ], (err,data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json("unfollow");
    } );
      

    })
}   

