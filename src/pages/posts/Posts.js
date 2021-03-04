import React from 'react'
import Title from "../Title"
import { db, auth } from "../../firebase"
import Post from "./Post"
import SelfModal from "../Modal"
import "./Posts.css"
import { Button, TextField } from "@material-ui/core"
import firebase from "firebase"
import { SignalCellularNull } from '@material-ui/icons'
import { urlFolder } from "./../../App"

class Posts extends React.Component {
    constructor() {
        super()
        this.state = {
            authUser: null,
            posts: [],
            addCaption: "",
            addImgUrl: "",
            addMessage: ""
        }
    }
    // upload img: https://www.youtube.com/watch?v=k2D35gF-w1M prevent
    
    componentDidMount() {
        // evt.: limitToLast(lv_number)
        db.collection("posts").orderBy("timestamp", "asc").onSnapshot(snapshot => {
            this.setState({
                posts: (snapshot.docs.map(doc => ({ id: doc.id, post_data: doc.data() })))
            })
        })
        auth.onAuthStateChanged((authUser) => {
            if (authUser && authUser.emailVerified == true) {
                this.setState({
                    authUser: authUser
                })
            }
        })
        document.querySelector("#addNewPost").scrollIntoView();
    }
    async addNewPost() {
        if (this.state.authUser == null) {
            alert("To send make post, you have to sign in!")
            return "";
        }
        document.querySelector("#addNewPostModal").style.display = "none";
        if (this.state.addMessage == "" && this.state.addImgUrl == "" && this.state.addCaption == "") {
            alert("Empty message!");
            return "";
        }
        await db.collection("posts").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: this.state.authUser.displayName,
            message: this.state.addMessage,
            caption: this.state.addCaption,
            imgUrl: this.state.addImgUrl
        })
        this.setState({
            addCaption: "",
            addImgUrl: "",
            addMessage: ""
        })
        document.querySelectorAll("input").forEach(event => {
            event.value = ""
        })
        document.querySelectorAll("textarea").forEach(event => {
            event.value = ""
        })
    }
    changeToUserPage(username) {
        if (this.state.authUser == null) {
            alert("You have to sign in to watch this user!")
        } else {
            this.props.history.push({
                pathname: urlFolder + "/posts/users/" + username
            })
        }
    }
    componentWillUnmount() {
        
    }
    render() {
        let scrollPosition;
        let newScrollPosition;
        window.addEventListener("scroll", event => {
            scrollPosition = window.scrollY;
            // window.scrollTo(0, 0);
        })
        window.addEventListener("orientationchange", event => {
            // alert("orientation changed: " + event.target.screen.orientation.angle)
            newScrollPosition = scrollPosition;
            // setTimeout(() => { window.scrollTo(0, scrollPosition); }, 500);
            // window.scrollTo(0, scrollPosition);

            setTimeout(() => { document.querySelector("#addNewPost").scrollIntoView(); }, 500);
            document.querySelector("#addNewPost").scrollIntoView();
            // window.scrollTo(0, newScrollPosition);
            // console.log(scrollPosition)
        })
        return (
            <div className="Posts">
                <Title middle_title="Posts" authUser={ this.state.authUser }/>
                { this.state.posts.map(doc => (
                    <Post doc={ doc.post_data } changeToUserPage={ e => this.changeToUserPage(e) } />
                )) }

                {/* https://material-ui.com/components/text-fields/ */}
                <SelfModal title="Add new Post" id="addNewPostModal">
                    <TextField type="text" label="ImageUrl"
                        onChange={ e => this.setState({ addImgUrl: e.target.value }) }
                        className="addInputs"
                    />
                    <TextField type="text" label="Caption"
                        onChange={ e => this.setState({ addCaption: e.target.value }) }
                        className="addInputs"
                    />
                    <textarea type="text" name="message" className="addMessage" placeholder="Message"
                        onChange={ e => this.setState({ addMessage: e.target.value }) }
                    ></textarea>
                    <Button id="addPostButton" onClick={ () => this.addNewPost() } className="addNewPostButtonUnique">Send</Button>
                </SelfModal>
                <Button
                    id="addNewPost"
                    onClick={ () => {
                        document.querySelector("#addNewPostModal").style.display = "block";
                        document.querySelector("#addNewPostModal").style.animation = "modal_appears 0.5s";
                    } }
                >Add new Post</Button>
            </div>
        )
    }
}

export default Posts
