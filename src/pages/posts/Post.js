import React, { Component, useHistory } from 'react'
import { Avatar } from "@material-ui/core"
import { Link } from "react-router-dom"
import { auth } from "../../firebase"
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { urlFolder } from "./../../App"
// https://firebase.google.com/docs/auth/admin/manage-users

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post_element: ""
        }
        // do not use this.state.doc or so on !!!!!!!!!!!!!!!!!
        // then it won't release components
        // just use props
    }
    async componentDidMount() {
        await this.setState({
            post_element: document.querySelectorAll(".post")
        })
        // document.querySelector("#addNewPost").scrollIntoView();
        window.scrollTo(0,1e10);
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                this.setState({
                    authUser: authUser
                })
            } else {
                this.setState({
                    authUser: null
                })
            }
        })
    }
    render() {
        return (
            <div className="post">
                <div className="post_avatar">
                    <Avatar src="/static/images/avatar/1.jpg" alt={ this.props.doc.user } />
                    <h1 className="post_user" onClick={ () => this.props.changeToUserPage(this.props.doc.user) }>{ this.props.doc.user }</h1>
                </div>
                <h2 className="post_message">{ this.props.doc.message }</h2>
                <img className="post_img" src={ this.props.doc.imgUrl } />
                <h5 className="post_caption">{ this.props.doc.caption }</h5>
            </div>
        )
    }
}

export default Post
