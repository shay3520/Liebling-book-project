import "./Profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { Link, useLocation } from "react-router-dom";
import { useState,useEffect , useContext} from "react";
import moment from "moment";
import Cookies from 'js-cookie';
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { Button } from "@mui/material";


const Profile = () => {
  const {currentUser} = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const [userData , setUserData] = useState([]);
  const [relationshipData , setRelationshipData] = useState([]);
  const [openUpdate , setOpenUpdate] = useState(false);

  
  
  useEffect(() => {
    const token = Cookies.get('accessToken');
    axios.get(`http://localhost:8800/api/users/find/` +userId, {headers:{Authorization: `bearer ${token}`,withCredentials: true, 'Content-Type': 'application/json',}})
        .then(response => {
          setUserData(response.data)
          
        })
        .catch(error => {
            console.error('There was an error fetching the posts:', error);
        });
}, []);

useEffect(() => {
  const token = Cookies.get('accessToken');
  axios.get(`http://localhost:8800/api/relationships?followedUserId=` +userId, {headers:{Authorization: `bearer ${token}`,withCredentials: true, 'Content-Type': 'application/json',}})
      .then(response => {
        setRelationshipData(response.data)
      })
      .catch(error => {
          console.error('There was an error fetching the posts:', error);
      });
}, []);




async function handleFollow(e) {
  e.preventDefault();

  const token = Cookies.get('accessToken');
  console.log('Token:', token);

 if(relationshipData.includes(currentUser.id)){
          try {
      const response = await axios.delete(`http://localhost:8800/api/relationships?userId=${userId}`, {
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
      const response = await axios.post(`http://localhost:8800/api/relationships`,{userId} ,{
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

  
  
  
  return (
    <div className="profile">
      <div className="images">
        <img
          src={userData.coverPic}
          alt=""
          className="cover"
        />
        <img
          src={userData.profilePic}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{userData.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{userData.cit}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>Liebling's Book</span>
              </div>
            </div>
            {userId === currentUser.id ? (<button >Update</button>) : <button onClick={handleFollow}>{relationshipData.includes(currentUser.id) ? "Following" : "Follow"}</button>}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      <Posts userId={userId}/>
      </div>
    </div>
  );
};

export default Profile;