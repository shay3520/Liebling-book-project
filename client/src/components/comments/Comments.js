/*import "./comments.scss";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import Cookies from 'js-cookie';
import moment from "moment";


function Comments({postId,  updateCommentsLength }) {
    
    const {currentUser} = useContext(AuthContext);

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        const token = Cookies.get('accessToken');
        axios.get(`http://localhost:8800/api/comments?postId=${postId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
                withCredentials: true,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setComments(response.data);
            updateCommentsLength(response.data.length);
            
        })
        .catch(error => {
            console.error('There was an error fetching the comments:', error);
        });
    },[postId]);

    function handleChange(e){
        setComment(e.target.value);
    }
    async function handleClick(e) {
        e.preventDefault();
    
        const token = Cookies.get('accessToken');
    
        try {
            const response = await axios.post("http://localhost:8800/api/comments", { desc: comment, postId: postId }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true
            });
    
            // Add the new comment to the comments state
            setComments([...comments, response.data]);
        } catch (error) {
            console.error('There was an error sending the comment:', error);
        }
    }
    
        
    

    
    
    return(
        <div className="comments">
        <div className="write">
            <img src={currentUser.profilePic} alt="" />
            <input type="text" placeholder="write a comment" onChange={handleChange} />
            <button onClick={handleClick}>Send</button>
        </div>
            {comments.map(com=> (
                <div className="comment" key={com.id}>
                    <img src={com.profilePic} alt="" />
                    <div className="info">
                        <span>{com.name}</span>
                        <p>{com.desc}</p>
                    </div>
                    <span className="date">{moment(com.createdAt).fromNow()}</span>
                </div>
            ))}
        </div>
    )
}


export default Comments;*/


import "./comments.scss";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import Cookies from 'js-cookie';
import moment from "moment";

function Comments({ postId, updateCommentsLength }) {
    const { currentUser } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        const token = Cookies.get('accessToken');
        axios.get(`http://localhost:8800/api/comments?postId=${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                withCredentials: true,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setComments(response.data);
            updateCommentsLength(response.data.length); // Update the count in parent component
        })
        .catch(error => {
            console.error('There was an error fetching the comments:', error);
        });
    }, [postId]);

    function handleChange(e) {
        setComment(e.target.value);
    }

    async function handleClick(e) {
        e.preventDefault();
        const token = Cookies.get('accessToken');
        try {
            const response = await axios.post("http://localhost:8800/api/comments", { desc: comment, postId }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true
            });

            // Add the new comment to the comments state and update the count
            const updatedComments = [...comments, response.data];
            setComments(updatedComments);
            updateCommentsLength(updatedComments.length); // Update the count in parent component
        } catch (error) {
            console.error('There was an error sending the comment:', error);
        }
    }

    return (
        <div className="comments">
            <div className="write">
                <img src={currentUser.profilePic} alt="" />
                <input type="text" placeholder="write a comment" onChange={handleChange} />
                <button onClick={handleClick}>Send</button>
            </div>
            {comments.map(com => (
                <div className="comment" key={com.id}>
                    <img src={com.profilePic} alt="" />
                    <div className="info">
                        <span>{com.name}</span>
                        <p>{com.desc}</p>
                    </div>
                    <span className="date">{moment(com.createdAt).fromNow()}</span>
                </div>
            ))}
        </div>
    );
}

export default Comments;





