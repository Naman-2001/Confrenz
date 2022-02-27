import React, { useState, useEffect } from "react";
import CodeEditor from "../../components/Editor/CodeEditor/CodeEditor";
import Header from "../../components/Header/Header";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import Drawer from "@material-ui/core/Drawer";
import styles from "./Room.module.css";
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import "react-reflex/styles.css";
import Mainpanel from "../../components/Meeting/Mainpanel/Mainpanel";
import { useRoomClientContext } from "../../services/RoomClientContext";
import { socket } from "../../services/socket";
import { useParams } from "react-router-dom";
import randomcolor from "randomcolor";
import axiosInstance from "../../services/api";

const Room = () => {
  const {
    handleAllUsers,
    handleClientId,
    handleRoomId,
    handleCurClientInfo,
    curUser,
  } = useRoomClientContext();

  const [fetchedCode, setFetchedCode] = useState("");

  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
    length: 2,
  });

  const userColor = randomcolor();

  const { roomid } = useParams();

  const prepareData = () => {
    let guestName;
    if (curUser) {
      guestName = curUser.firstName + " " + curUser.lastName;
    } else {
      guestName = randomName;
    }
    const user = {
      guestName,
      roomID: roomid,
      color: userColor,
    };
    handleCurClientInfo(user);

    // const { data } = await axiosInstance.get(`/room/data/${roomid}`);
    // console.log(data);
    // setFetchedCode(data);
    return {
      guestName,
      roomID: roomid,
      color: userColor,
    };
  };

  useEffect(() => {
    handleRoomId(roomid);
    socket.emit("join", prepareData(), (error) => {
      if (error) {
        alert(error);
      }
    });

    socket.on("cid", (id) => handleClientId(id));

    socket.on("roomData", ({ users }) => {
      handleAllUsers(users);
    });
  }, [roomid]);

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <Header />
      <ReflexContainer orientation="vertical" style={{ height: "91%" }}>
        <ReflexElement className="left-pane" minSize="600">
          <CodeEditor fetchedCode={fetchedCode} />
        </ReflexElement>

        <ReflexSplitter style={{ width: "10px" }} />

        <ReflexElement className="right-pane">
          <Mainpanel />
        </ReflexElement>
      </ReflexContainer>
    </div>
  );
};

export default Room;
