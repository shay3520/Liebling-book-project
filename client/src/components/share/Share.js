import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { useEffect , useState} from "react";
import Cookies from 'js-cookie';
  



const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  function handleChangeDesc(e){
    setDesc(e.target.value);
  }

  function handleChangeFile(e){
    setFile(e.target.files[0]);
  }

  async function handleClick(e) {
    e.preventDefault();

    const token = Cookies.get('accessToken');
    console.log('Token:', token);
   
    try {
        const response = await axios.post("http://localhost:8800/api/posts", {desc}, {
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









  const {currentUser} = useContext(AuthContext)
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={currentUser.profilePic}
            alt=""
          />
          <input type="text" placeholder={`What's on your mind ${currentUser.name}?`} onChange={handleChangeDesc} />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} onChange={handleChangeFile} />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;