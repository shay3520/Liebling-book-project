import "./Home.scss"
import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share"


function Home(){
    return(
        <div className="Home">
           <Stories />
           <Share/>

           <Posts />
        </div>

    );
}

export default Home;