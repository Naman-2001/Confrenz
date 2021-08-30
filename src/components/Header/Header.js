import React from "react";
import { Grid, Button } from "@material-ui/core";
import styles from "./header.module.css";
import Identicon from "react-identicons";
import { useRoomClientContext } from "../../services/RoomClientContext";
import { Tooltip } from "@material-ui/core";
import logo from "../../assets/logo.png";

// socket.emit("sid", socket.id);
const Header = () => {
  const { allUsers } = useRoomClientContext();
  console.log(allUsers);
  return (
    <div style={{ height: "9%" }}>
      <Grid container className={styles.wrapper}>
        <Grid sm={4} item style={{ padding: "0 20px" }}>
          <input
            type="text"
            placeholder="Untitled"
            className={styles.docnameinput}
          />
        </Grid>
        <Grid sm={4} item className={styles.title}>
          <img
            src={logo}
            alt="logo"
            width="50px"
            style={{ marginRight: "10px" }}
          />
          <h1>Confrenz</h1>
        </Grid>
        <Grid sm={4} item style={{ textAlign: "right", padding: "0 20px" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ display: "flex", margin: "0 20px" }}>
              {allUsers.map((user) => (
                <Tooltip title={`${user.guestName}`} placement="bottom" arrow>
                  <div
                    className={styles.identiconwrapper}
                    style={{ border: "2px solid", borderColor: user.color }}
                  >
                    <Identicon
                      string={user.id}
                      fg={user.color}
                      className={styles.identicon}
                    />
                  </div>
                </Tooltip>
              ))}
            </div>
            <Button
              style={{
                background: "#F4AF1B",
                color: "grey",
                padding: "5px 20px",
              }}
            >
              Share
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
