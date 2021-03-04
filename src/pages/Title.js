import React from 'react'
import "./Title.css"
import MenuIcon from '@material-ui/icons/Menu'
import { Avatar } from "@material-ui/core"
import SelfModal from "./Modal"
import { TextField, Button } from "@material-ui/core"
import { auth, provider, db, admin } from "./../firebase"
import { urlFolder } from "./../App"

// error: have to use a new app name
// more infos: bookmark/currentState (Lesezeichen)
// const admin = require('firebase-admin');
// admin.initializeApp();

// // more information: https://www.youtube.com/watch?v=B-kxUMHBxNo&t 2:52:05
// auth.signInWithPopup(provider)
// .then(result => { 
//     // dispatch({ type: actionTypes.SET_USER, user: result.user, });
//     console.log(result.user)
// })
// .catch(error => alert(error.message))

// for using admin
// npm install firebase-admin --save
// https://firebase.google.com/docs/admin/setup
// https://firebase.google.com/docs/auth/admin/manage-users
// const admin = require("firebase-admin")

// more info functions: https://frontendmasters.com/courses/firebase-react-v2/display-name/

// get user: https://www.youtube.com/watch?v=PKwu15ldZ7k&t=1404s


// add admin: https://firebase.google.com/docs/admin/setup



// next step: solve admin access error at admin.getUsersList... at componentDidMount

class Title extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authUser: null
        }
    }
    componentDidMount() {
        this.authChanged();
        // error for Error: Failed to determine project ID: Error while making request: Failed to fetch. :
        console.log(admin.auth().listUsers().then(results => {
            results.users.forEach(result => {
                console.log("user: ", result.displayName)
            })
        }))
    }
    componentWillUnmount() {

    }
    authChanged = (e) => auth.onAuthStateChanged(async (authUser) => {
        if (authUser && authUser.emailVerified == true) {
            this.setState({
                authUser: authUser
            })
            // if (!this.checkUsernameExists(authUser.displayName) && authUser.displayName !== null) {
            //     await db.collection("users").add({
            //         displayName: authUser.displayName
            //     })
            //     alert("add new username")
            // } else {
            //     alert("Already exists No problems")
            // }
        } else {
            this.setState({
                authUser: null
            })
        }
    })
    signInWithGoogle() {
        // more information: https://www.youtube.com/watch?v=B-kxUMHBxNo&t 2:52:05
        // have to activate: google on firebase: sign-in-method

        this.setInputEmpty()
        auth.signInWithPopup(provider)
        .then(() => this.setInputEmpty())
        .catch((error) => alert(error.message));
    }
    signIn(e) {
        e.preventDefault();
        auth.signInWithEmailAndPassword(e.target.email.value, e.target.password.value)
        .then((authUser) => {
            if (authUser.emailVerified == true) {
                this.setState({
                    authUser: authUser
                })
            }
            this.setInputEmpty();
        })
        .catch((error) => alert(error.message));
    }
    async signUp(e) {
        e.preventDefault()
        let username = e.target.username.value;
        let email = e.target.email.value;
        let password = e.target.password.value;
        let con_password = e.target.con_password.value;

        // get data where: https://stackoverflow.com/questions/51027846/how-to-get-specific-value-or-row-data-from-firebase-in-web
        // maybe: https://stackoverflow.com/questions/26386959/read-data-from-firebase-and-populate-in-listview/26391689
        // google: firebase get where row == data

        // admin.auth().listUsers()
        // .then(results => {
        //     console.log(results)
        //     results.users.map(result => {
        //         console.log(result)
        //     })
        //     // if (username == result.displayName) {
        //     //     alert("This username is already used!")
        //     //     return false;
        //     // } else {
        //     //     alert("it works")
        //     // }
        // })
        // // return false;
        this.checkUsernameExists(username, (usernameExists) => {
            if (usernameExists == true) {
                alert("Username already exists!")
            } else if (usernameExists == false) {
                if (username !== "" && email !== "" && password !== "") {
                    if (password == con_password) {
                        auth.createUserWithEmailAndPassword(email, password)
                        .then((authUser) => {
                            return authUser.user.updateProfile({
                                displayName: username
                            })
                        })
                        .then(async () => {
                            await db.collection("users").add({
                                displayName: username
                            })
                            auth.currentUser.sendEmailVerification()
                            .then(() => {
                                alert("Check your emails.\nYou should got a email from us.\nGo to the link to sign up.")
                            })
                            // alert("New account was created.")
                        })
                        .catch((error) => alert(error.message))
                        .then(() => {
                            this.setInputEmpty();
                        })
                        this.setInputEmpty();

                        // auth.sendSignInLinkToEmail(email, {
                        //     url: "http://localhost:3000/zoom/signup?username=" + username + "&email=" + email,
                        //     handleCodeInApp: true,
                        // }).catch((error) => alert(error))
                        // more good info: https://www.youtube.com/watch?v=Vj96piq6WGk for signinlink just signin without password only with emaillink
                    } else {
                        alert("Password and confirm password are not the same!")
                    }
                } else {
                    alert("Username, email or password is empty!");
                }
            } else {
                alert("Error! Try again.")
            }
        })
    }
    checkUsernameExists(username, callback) {
        var exists;
        db.collection("users").onSnapshot(snapshot => {
            let usernameList = snapshot.docs.map(doc => (doc.data().displayName))
            if (usernameList.includes(username)) {
                callback(true)
            } else {
                callback(false)
            }
        })
        return false;
    }
    setInputEmpty() {
        if (window.innerWidth <= 415) {
            document.querySelectorAll(".title_bar")[0].style.display = "none";
        }
        document.querySelectorAll(".posts_addPostModal").forEach(event => {
            event.style.display = "none";
        })
        if (window.innerWidth <= 1012) {
            document.querySelector(".title_bar").style.display = "none"
        }
        document.querySelectorAll("input").forEach(event => {
            event.value = ""
        })
        document.querySelectorAll("textarea").forEach(event => {
            event.value = ""
        })
    }
    checkAvatar() {
        if (this.state.authUser !== null) {
            return(
                <Avatar src="/static/images/avatar/1.jpg" alt={ this.state.authUser.displayName } id="title_username"/>
            )
        } else {
            return(
                <Avatar src="" id="title_username"/>
            )
        }
    }
    isAuthenticated() {
        if (this.state.authUser == null) {
            return(
                <div>
                    <h4 onClick={ () => document.querySelector("#modal_sign_in").style.display = "block" }>Sign in</h4>
                    <h4 id="sign_up" onClick={ () => document.querySelector("#modal_sign_up").style.display = "block" }>Sign up</h4>
                </div>
            )
        } else {
            return(
                <div>
                    <h4>{ this.state.authUser.displayName }</h4>
                    <h4 id="sign_out" onClick={ () => { auth.signOut(); this.setInputEmpty(); } }>Sign out</h4>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="title_background">
                <h1 id="main_title_left">{ this.props.left_title }</h1>
                <h1 id="main_title_middle">{ this.props.middle_title }</h1>
                <MenuIcon id="menu_icon" onClick={ () => document.querySelectorAll(".title_bar")[0].style.display = "block" }/>
                { this.checkAvatar() }
                <div className="title_bar">
                    <div id="close_icon_title_bar" onClick={ () => document.querySelectorAll(".title_bar")[0].style.display = "none" }>x</div>
                    { this.isAuthenticated() }
                </div>



                <SelfModal title="Sign up" id="modal_sign_up">
                    <form onSubmit={ e => this.signUp(e) }>
                        <TextField type="text" label="Username"
                            className="addInputs"
                            name="username"
                        />
                        <TextField type="text" label="Emailadress"
                            className="addInputs"
                            name="email"
                        />
                        <TextField type="password" label="Password"
                            className="addInputs"
                            name="password"
                        />
                        <TextField type="password" label="Confirm Password"
                            className="addInputs"
                            name="con_password"
                        />
                        <button onClick={ () => this.signInWithGoogle() } className="plus_sign">Sign up with Google</button>
                        <Button type="submit" id="addPostButton">Sign up</Button>
                    </form>
                </SelfModal>

                <SelfModal title="Sign in" id="modal_sign_in">
                    <form onSubmit={ e => this.signIn(e) }>
                        <TextField type="text" label="Emailadress"
                            className="addInputs"
                            name="email"
                        />
                        <TextField type="Password" label="Password"
                            className="addInputs"
                            name="password"
                        />
                        <button onClick={ () => this.signInWithGoogle() } className="plus_sign">Sign in with Google</button>
                        <Button type="submit" id="addPostButton">Sign in</Button>
                    </form>
                </SelfModal>
            </div>
        )
    }
}

export default Title
