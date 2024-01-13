import "./leftBar.scss"
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { useContext } from 'react';
import { AuthContext } from "../../context/authContext";



function LeftBar(){

    const {currentUser} = useContext(AuthContext);


    return(
        <div className="LeftBar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img src={currentUser.profilePic} alt=""></img>
                        <span>{currentUser.name}</span>
                    </div>
                    <div className="item">
                        <img src={Friends} alt=""></img>
                        <span>Friends</span>
                    </div>
                    <div className="item">
                        <img src={Groups} alt=""></img>
                        <span>Groups</span>
                    </div>
                    <div className="item">
                        <img src={Market} alt=""></img>
                        <span>Market</span>
                    </div>
                    <div className="item">
                        <img src={Watch} alt=""></img>
                        <span>Watch</span>
                    </div>
                    <div className="item">
                        <img src={Memories} alt=""></img>
                        <span>Memories</span>
                    </div>

                </div>
                <hr />
                <div className="menu">
                    <span>Your Shortcuts</span>
                    <div className="item">
                        <img src={Events} alt=""></img>
                        <span>Events</span>
                    </div>
                    <div className="item">
                        <img src={Gaming} alt=""></img>
                        <span>Gaming</span>
                    </div>
                    <div className="item">
                        <img src={Gallery} alt=""></img>
                        <span>Gallery</span>
                    </div>
                    <div className="item">
                        <img src={Videos} alt=""></img>
                        <span>Videos</span>
                    </div>
                    <div className="item">
                        <img src={Messages} alt=""></img>
                        <span>Messages</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Others</span>
                    <div className="item">
                        <img src={Tutorials} alt=""></img>
                        <span>Tutorials</span>
                    </div>
                    <div className="item">
                        <img src={Courses} alt=""></img>
                        <span>Courses</span>
                    </div>
                    <div className="item">
                        <img src={Fund} alt=""></img>
                        <span>Fund</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LeftBar;