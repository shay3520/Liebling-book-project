import "./post.scss"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useState,useEffect , useContext} from "react";
import Comments from "../comments/Comments.js";
import moment from "moment";
import Cookies from 'js-cookie';
import axios from "axios";
import { AuthContext } from "../../context/authContext";




function Post({post}) {

    const [commentOpen, setCommentOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [likes, setLikes] = useState([]);
    const {currentUser} = useContext(AuthContext);
    const [commentsLength, setCommentsLength] = useState(0);

    // Function to be called by the Comment component to update comments length
    const updateCommentsLength = (length) => {
        setCommentsLength(length);
    };
    const [comments, setComments] = useState([]);


    

    

    function handleClickComment() {
        setCommentOpen(!commentOpen);
    }

    useEffect(() => {
        const token = Cookies.get('accessToken');
        axios.get(`http://localhost:8800/api/likes?postId=${post.id}`, {headers:{Authorization: `bearer ${token}`,withCredentials: true, 'Content-Type': 'application/json',}})
            .then(response => {
                setLikes(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the posts:', error);
            });
    }, []);
    const postSent = post.id;

    async function handleClickLike(e) {
        e.preventDefault();
    
        const token = Cookies.get('accessToken');
        console.log('Token:', token);
    
       if(likes.includes(currentUser.id)){
                try {
            const response = await axios.delete(`http://localhost:8800/api/likes?postId=${postSent}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // 'Content-Type': 'multipart/form-data' will be set automatically by the browser when using FormData
                },
                withCredentials: true
            });
    
            console.log('Response:', response.data);
            // Handle successful response
            window.location.reload();
        } catch (error) {
            console.error('There was an error sending the post:', error);
            // Handle error
        }

       }else{
        try {
            const response = await axios.post(`http://localhost:8800/api/likes`,{postId : postSent} ,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true
            })
                
            console.log('Response:', response.data);
            // Handle successful response
            window.location.reload();
        } catch (error) {
            console.error('There was an error sending the post:', error);
            // Handle error
        }
       }
    }

    async function handleDelete(e) {
        e.preventDefault();
    
        const token = Cookies.get('accessToken');
        console.log('Token:', token);
    

                try {
            const response = await axios.delete(`http://localhost:8800/api/posts/`+postSent, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // 'Content-Type': 'multipart/form-data' will be set automatically by the browser when using FormData
                },
                withCredentials: true
            });
    
            console.log('Response:', response.data);
            // Handle successful response
            window.location.reload();
        } catch (error) {
            console.error('There was an error sending the post:', error);
            // Handle error
        }

       
    }

    useEffect(() => {
        const token = Cookies.get('accessToken');
        axios.get(`http://localhost:8800/api/comments?postId=${post.id}`, {headers:{Authorization: `bearer ${token}`,withCredentials: true, 'Content-Type': 'application/json',}})
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the posts:', error);
            });
    }, []);

   


    
        
    


    
    return(
        <div className="post">
        <div className="container">
            <div className="user">
                <div className="userInfo">
                    <img src={post.profilePic} alt=""></img>
                    <div className="details">
                        <Link to={`/profile/${post.userId}`} style={{textDecoration : "none", color:"inherit"}}>
                        <span className="name">{post.name}</span>
                        </Link>
                        <span className="date">{moment(post.createdAt).fromNow()}</span>
                    </div>
                </div>
                <MoreHorizIcon onClick={()=> setMenuOpen(!menuOpen)}/>
                {menuOpen && <button onClick={handleDelete}>delete</button>}
            </div>
            <div className="content">
                <p>{post.desc}</p>
                <img src={post.img} alt="" />
            </div>
            <div className="info">
                <div className="item">
                    {likes.includes(currentUser.id) ? <FavoriteOutlinedIcon style={{color:"red"}}  onClick={handleClickLike}/> : <FavoriteBorderOutlinedIcon onClick={handleClickLike}/>}
                    {likes.length} Likes
                </div>
                <div className="item" onClick={handleClickComment}>
                    <TextsmsOutlinedIcon/>
                    {comments.length} Comments
                </div>

                <div className="item">
                    <ShareOutlinedIcon/>
                    Share
                </div>
    
            </div>
            {commentOpen && <Comments postId={post.id} updateCommentsLength={ updateCommentsLength }/>}
            </div>
        </div>
    )
}

export default Post;