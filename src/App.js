import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { Contact } from "./components/Contact";
import { NoMatch } from "./components/NoMatch";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import Pricing from "./components/Pricing";
import Player from "./components/Player";
import AddPlayer from "./components/AddPlayer";
import AddGame from "./components/AddGame";
import AddGroup from "./components/AddGroup";
import GroupList from "./components/GroupList";
import Group from "./components/Group";


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Home} />
              <Route path="/pricing" component={Pricing} />
              <Route path="/contact" component={Contact} />
              <Route exact path="/player/:playerId" component={Player} />
              <Route path="/addPlayer" component={AddPlayer} />
              <Route path="/addGame" component={AddGame} />
              <Route path="/addGroup" component={AddGroup} />
              <Route path="/groupList" component={GroupList} />
              <Route path="/group/:groupId" component={Group} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </Layout>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
