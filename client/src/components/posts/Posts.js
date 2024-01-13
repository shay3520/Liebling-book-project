import "./posts.scss"
import Post from "../post/Post.js";
import axios from "axios";
import { useEffect , useState} from "react";
import Cookies from 'js-cookie';
  

function Posts({userId}) {
    
      const [posts, setPosts] = useState([]);

    
      useEffect(() => {
        const token = Cookies.get('accessToken');
        axios.get("http://localhost:8800/api/posts?userId="+userId, {headers:{Authorization: `bearer ${token}`,withCredentials: true, 'Content-Type': 'application/json',}})
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the posts:', error);
            });
    }, []);

    
    
    
    return(
        <div className="posts">
        {posts && posts.map((post) => (
                <Post post={post} key={post.id}/>
            ))}
        </div>
    )
}




export default Posts;