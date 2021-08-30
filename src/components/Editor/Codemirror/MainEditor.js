import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror-minimap";
import "codemirror-minimap/src/minimap.css";
import "./CodemirrorImports";
import "./editor.css";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { CodemirrorBinding } from "y-codemirror";
import { useSettingsContext } from "../../../services/SettingsContext";
import { useRoomClientContext } from "../../../services/RoomClientContext";

const MainEditor = ({ code, handleCodeChange }) => {
  const { language, theme, fontSize, tabSize, keybind } = useSettingsContext();
  const { roomId, curClientInfo } = useRoomClientContext();
  const [conState, setConstate] = useState("connected");
  const [users, setUsers] = useState([]);

  const [editorInstance, setEditorInstance] = useState(null);

  useEffect(() => {
    if (!editorInstance) return;

    // A Yjs document holds the shared data
    const ydoc = new Y.Doc();

    const provider = new WebsocketProvider(
      "wss://codeio-backend.herokuapp.com/",
      // `ws://localhost:8000`,
      roomId,
      ydoc
      // {
      //   signaling: [
      //     "wss://signaling.yjs.dev",
      //     "wss://y-webrtc-signaling-eu.herokuapp.com",
      //     "wss://y-webrtc-signaling-us.herokuapp.com",
      //   ],
      // }
    );
    const awareness = provider.awareness;
    // Define a shared text type on the document
    const yText = ydoc.getText("codemirror");
    var person = "User";
    if (person === " ") {
      person = Math.floor(Math.random() * 10) + "User";
    }

    awareness.setLocalStateField("user", {
      name: curClientInfo.guestName,
      color: curClientInfo.color,
    });

    let status;

    // provider.on("status", (event) => {
    //   console.log(event.status); // logs "connected" or "disconnected"
    //   status = event.status;
    //   if (event.status == "connected") {
    const _codemirrorBinding = new CodemirrorBinding(
      yText,
      editorInstance,
      provider.awareness
    );
    //   }
    // });
    // awareness.on("change", () => {
    //   setUsers([]);
    //   awareness.getStates().forEach((state) => {
    //     if (state.user) {
    //       console.log(state.user);
    //       setUsers((prev) => {
    //         return [...prev, state.user];
    //       });
    //     }
    //   });
    // });
  }, [editorInstance, roomId]);

  const handleEditorDidMount = (editor) => {
    setEditorInstance(editor);
  };

  return (
    <div style={{ height: "86%", fontSize: `${fontSize}px` }}>
      <CodeMirror
        value={code}
        editorDidMount={(editor) => {
          handleEditorDidMount(editor);
          editor.setSize("", "100%");
        }}
        options={{
          minimap: { scale: 8 },
          mode: language,
          theme: theme,
          lineNumbers: true,
          lint: true,
          lineWrapping: true,
          keyMap: keybind,
          tabSize: tabSize,
          matchBrackets: true,
          styleActiveLine: { nonEmpty: true },
          styleActiveSelected: true,
          smartIndent: true,
          highlightSelectionMatches: {
            // showToken: /\w/,
            annotateScrollbar: true,
          },
          autoCloseBrackets: true,
          extraKeys: {
            "Ctrl-Q": function (cm) {
              cm.foldCode(cm.getCursor());
            },

            "Ctrl-/": function (cm) {
              cm.execCommand(cm.toggleComment());
            },
            "Ctrl-Space": "autocomplete",
          },
          foldGutter: true,
          gutters: [
            "CodeMirror-linenumbers",
            "CodeMirror-foldgutter",
            "CodeMirror-lint-markers",
          ],
        }}
        onBeforeChange={(editor, data, value) => {
          // setReset(false);
          handleCodeChange(value);
        }}
      />
    </div>
  );
};

export default MainEditor;
