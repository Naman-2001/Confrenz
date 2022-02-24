import React from "react";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import SettingsContext from "./services/SettingsContext";
import RoomClientContext from "./services/RoomClientContext";
import Home from "./Home";
import Room from "./pages/Room/Room";
import LoginHooks from "./pages/Login/Login";

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ height: "100%" }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginHooks} />
          <Route path="/:id/:roomid" component={Room} />
          <Route exact path="/:roomid" component={Room} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

const wrapper = () => {
  return (
    <SettingsContext>
      <RoomClientContext>
        <App />
      </RoomClientContext>
    </SettingsContext>
  );
};

export default wrapper;
