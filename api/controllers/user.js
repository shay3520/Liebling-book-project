import {db} from "../connect.js"
import jwt from "jsonwebtoken";
import {login} from "./auth.js"
import moment from "moment";


export const getUser = (req,res) => {
    const userId = req.params.userId;
    const authHeader = req.headers['authorization'];

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({ message: 'Missing Authorization header' });
    }
  
    // Extract the token from the header
      const token = authHeader.split(' ')[1];
  
      jwt.verify(token, "secretkey" , (err,userInfo) => {
          if(err) return res.status(403).json("token is not valid!");

          
    
  
    const q = `SELECT * FROM users WHERE id = (?)`;

    
    db.query(q,[userId ], (err,data) => {
        if(err) return res.status(500).json(err);
        const {password, ...info } =data[0];
        return res.json(info);
    } );
      

    })

}