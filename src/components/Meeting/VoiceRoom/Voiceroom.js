import Toolbar from "./Toolbar";
import React, { useState, useEffect } from "react";
import Jitsi from "react-jitsi";
import { useParams } from "react-router";
import { useRoomClientContext } from "../../../services/RoomClientContext";
import styles from "./voiceroom.module.css";
import BeatLoad from "../../../hooks/Loader/Beatloader";

const Voiceroom = () => {
  // const [room, setRoom] = useState("i4u3h5j34");
  const { curClientInfo } = useRoomClientContext();
  const { roomid } = useParams();

  const [api, setApi] = useState(null);
  useEffect(() => {
    if (api) {
      api.executeCommand("displayName", curClientInfo.guestName);
      api.addEventListeners({
        displayNameChange: function (params) {
          // alert("You can't change the name");
          return this.executeCommand("displayName", curClientInfo.guestName);
        },
      });

      api.addEventListener(`videoConferenceJoined`, () => {
        const listener = ({ enabled }) => {
          api.removeEventListener(`tileViewChanged`, listener);

          if (!enabled) {
            api.executeCommand(`toggleTileView`);
          }
        };

        api.addEventListener(`tileViewChanged`, listener);
        api.executeCommand(`toggleTileView`);
      });
    }
  }, [api]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* <BeatLoad /> */}
      <Jitsi
        className={styles.jitsicontainer}
        containerStyle={{ width: "100%", height: "92%" }}
        domain={"meet.jit.si"}
        interfaceConfig={{
          SHOW_JITSI_WATERMARK: false,
          DEFAULT_BACKGROUND: "#333357",
          SHOW_CHROME_EXTENSION_BANNER: false,
          TOOLBAR_BUTTONS: [],
          HIDE_DEEP_LINKING_LOGO: true,
          SHOW_BRAND_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
        }}
        roomName={roomid}
        displayName={curClientInfo.guestName}
        config={{
          enableInsecureRoomNameWarning: false,
          prejoinPageEnabled: false,
          disableDeepLinking: true,
        }}
        loadingComponent={BeatLoad}
        onAPILoad={(JitsiMeetAPI) => {
          JitsiMeetAPI.executeCommand("toggleVideo");
          JitsiMeetAPI.executeCommand("toggleAudio");
          setApi(JitsiMeetAPI);
        }}
        // userInfo={{ name: "Naman", email: "naman.aggarwal@gmail.com" }}
      />
      <Toolbar api={api} />
    </div>
  );
};

export default Voiceroom;
