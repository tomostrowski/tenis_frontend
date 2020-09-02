import React, { Component } from "react";
import PlayersList from "./PlayersList"
import GroupList from "./GroupList";

export class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="page-height">
        <div className="homePhoto"></div>
        <GroupList />
        {/* <FindPlayer /> */}
        <PlayersList />
        </div>
      </React.Fragment>
    );
  }
}



export default Home;
