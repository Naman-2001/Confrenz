import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import meeting from "./assets/meeting.jpg";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useRoomClientContext } from "./services/RoomClientContext";
const Home = () => {
  const history = useHistory();
  const handleCreate = () => {
    const roomId = uuidv4();

    history.push(`/${roomId}`);
  };

  return (
    <Grid style={{ height: "95vh", background: "white" }} container>
      <Grid
        item
        sm={5}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "blue" }}>Welcome TO Confrenz</h1>
        <h3>
          A work from anywhere <br /> collaborative solution to all your
          programming needs.
        </h3>
        <div>
          <Button
            onClick={handleCreate}
            style={{ background: "#ff97fc", color: "white", fontWeight: "600" }}
          >
            Join Room
          </Button>
        </div>
      </Grid>
      <Grid
        item
        sm={7}
        style={{ backgroundImage: "url('/images/meeting.jpg')" }}
      >
        <img
          src={meeting}
          alt="meeting"
          style={{ height: "100%", width: "100%" }}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
