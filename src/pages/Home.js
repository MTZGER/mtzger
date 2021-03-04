import React, { Component } from 'react'
import { Link } from "react-router-dom"
import "./Home.css"
import Title from "./Title"
import { urlFolder } from "./../App"

const projectName = "mtzger"

class Home extends Component {

    render() {
        return (
            <div className="Home">
                <Title middle_title="Home" />
                <div className="home_top_background">
                    <h1 id="home_title">{ projectName }</h1>
                    <div className="home_top_titles">
                        <Link to={urlFolder + "/posts"}><h1>Posting</h1></Link>
                        <Link to={urlFolder + "/chats"}><h1>Chatting</h1></Link>
                        <Link to={urlFolder + "/meetings"}><h1>Meeting</h1></Link>
                        <Link to={urlFolder + "/catchForestFruit"}><h1>catchForestFruit</h1></Link>
                    </div>
                </div>
                <div className="zoom_properties">
                    <h1>Posting</h1>
                    <h1>Chatting</h1>
                    <h1>Meeting</h1>
                    <h1>About</h1>
                </div>
            </div>
        )
    }
}

export default Home
