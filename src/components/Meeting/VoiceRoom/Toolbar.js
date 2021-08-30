import React, { useState, useEffect } from "react";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import StopScreenShareIcon from "@material-ui/icons/StopScreenShare";
import CallEndIcon from "@material-ui/icons/CallEnd";
import { Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import styles from "./voiceroom.module.css";

const Toolbar = ({ api }) => {
  const [videoOn, setVideoOn] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const [ssOn, setSsOn] = useState(false);

  useEffect(() => {
    if (api) {
      api.addEventListeners({
        readyToClose: function () {},
        videoMuteStatusChanged: function (data) {
          if (data.muted) setVideoOn(false);
          else setVideoOn(true);
        },
        audioMuteStatusChanged: function (data) {
          if (data.muted) setAudioOn(false);
          else setAudioOn(true);
        },
        screenSharingStatusChanged: function (data) {
          if (data.on) setSsOn(true);
          else setSsOn(false);
        },
      });
    }
  }, [api]);

  const toggleVideo = (event) => {
    api.executeCommand("toggleVideo");
  };
  const toggleAudio = (event) => {
    api.executeCommand("toggleAudio");
  };
  const toggleSS = (event) => {
    if (ssOn) {
      let c = window.confirm("Stop presenting screen?");
      if (c == true) api.executeCommand("toggleShareScreen");
    } else api.executeCommand("toggleShareScreen");
  };

  const hangUp = () => {
    let c = window.confirm("Do you want to leave the meeting?");
    if (c == true) {
      api.executeCommand("hangup");
      //   history.push('/');
    }
  };

  return (
    <div className={styles.toolbarwrapper}>
      <Tooltip
        title={`Turn ${videoOn ? "off" : "on"} camera`}
        placement="top"
        arrow
      >
        <IconButton
          aria-label="Toggle Video"
          onClick={toggleVideo}
          style={{
            backgroundColor: videoOn ? "#FBFAFF" : "#DD3849",
            height: "40px",
            width: "40px",
          }}
        >
          {videoOn ? (
            <VideocamIcon />
          ) : (
            <VideocamOffIcon style={{ color: "#FBFFF1" }} />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip
        title={`Turn ${audioOn ? "off" : "on"} microphone`}
        placement="top"
        arrow
      >
        <IconButton
          aria-label="Toggle Mic"
          onClick={toggleAudio}
          style={{
            backgroundColor: audioOn ? "#FBFAFF" : "#DD3849",
            height: "40px",
            width: "40px",
          }}
        >
          {audioOn ? <MicIcon /> : <MicOffIcon style={{ color: "#FBFFF1" }} />}
        </IconButton>
      </Tooltip>
      <Tooltip
        title={`${ssOn ? "Stop presenting" : "Share screen"}`}
        placement="top"
        arrow
      >
        <IconButton
          aria-label="Share Screen"
          onClick={toggleSS}
          style={{
            backgroundColor: ssOn ? "#8AB4F8" : "#FBFAFF",
            height: "40px",
            width: "40px",
          }}
        >
          {ssOn ? (
            <StopScreenShareIcon style={{ color: "#FBFFF1" }} />
          ) : (
            <ScreenShareIcon />
          )}
        </IconButton>
      </Tooltip>

      {/* <Tooltip title={`${"Hang-up"}`} placement="top" arrow>
        <IconButton
          style={{ backgroundColor: "#DD3849" }}
          aria-label="Call end"
          onClick={hangUp}
        >
          <CallEndIcon style={{ color: "#FBFAFF" }} />
        </IconButton>
      </Tooltip> */}
    </div>
  );
};

export default Toolbar;
