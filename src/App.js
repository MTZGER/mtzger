import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './App.css';
import Home from "./pages/Home"
import Posts from "./pages/posts/Posts"
import UserPages from "./pages/posts/UserPages"
import SignUp from "./pages/SignUp"
import CatchForestFruit from "./pages/catchForestFruit/catchForestFruit"
import pointerControlTest from "./pages/catchForestFruit/pointerControlTest"

export const urlFolder = "/mtzger"
// for change homepages name go to package.json and set the homepage attribute to the pages url

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path={urlFolder + "/"} component={ Home } />
        <Route exact path={urlFolder + "/posts"} component={ Posts } />
        <Route exact path={urlFolder + "/posts/users/:username"} component={ UserPages } />
        {/* <Route exact path={urlFolder +  "/signup" } component={ SignUp } /> */}

        <Route exact path={ urlFolder + "/catchForestFruit" } component={ CatchForestFruit } />
        {/* <Route exact path={ urlFolder + "/catchForestFruit" } component={ pointerControlTest } /> */}
      </Router>
    </div>
  );
}

export default App;
