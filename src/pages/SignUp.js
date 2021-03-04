import React, { Component } from 'react'
import { auth } from "./../firebase"
import "./SignUp.css"

export class SignUp extends Component {
    constructor(props) {
        super(props)

        let searchLocation = this.props.location.search.substr(1).split("&")
        let searchLocationAtr = {}
        searchLocation.forEach(result => {
            searchLocationAtr[result.split("=")[0]] = result.split("=")[1]  
        })
        this.state = {
            searchLocationAtr: searchLocationAtr,
            isVerified: false
        }
    }
    componentDidMount() {
        if (auth.isSignInWithEmailLink(window.location.href)) {
            auth.signInWithEmailLink(this.state.searchLocationAtr.email, window.location.href)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: this.state.searchLocationAtr.username
                })
            })
            // more info for verification email and password: https://www.robinwieruch.de/react-firebase-email-verification
            // https://www.youtube.com/watch?v=y9v0lpeGakk
            // best: https://www.youtube.com/watch?v=Vj96piq6WGk
            
            this.setState({
                isVerified: true
            })
        }
    }

    render() {
        return (
            <div className="signup_verify">
                {
                    this.state.isVerified == false ? (
                        <h1>Verifying...</h1>
                    ) : (
                        <h1>Verified</h1>
                    )
                }
            </div>
        )
    }
}

export default SignUp
