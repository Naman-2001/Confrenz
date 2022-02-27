import React, { useState, useEffect } from "react";
import MainEditor from "../Codemirror/MainEditor";
import Draw from "../Drawingboard/Draw";
import IOpanel from "../IOpanel/IOpanel";
import Settingspanel from "../Settingspanel/Settingspanel";
import Tabspanel from "../Tabpanel/Tabpanel";
import styles from "./editor.module.css";
import { socket } from "../../../services/socket";
import { useParams } from "react-router-dom";
import piston from "piston-client";
import { useSettingsContext } from "../../../services/SettingsContext";
import { useRoomClientContext } from "../../../services/RoomClientContext";
import Drawnew from "../Drawingboard/Drawnew";

const CodeEditor = ({ fetchedCode }) => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const { roomid } = useParams();
  const [activeTab, setActiveTab] = useState("main");
  const [isLoading, setIsloading] = useState(false);

  const { pistonLang, langVersion } = useSettingsContext();
  const { allUsers } = useRoomClientContext();

  useEffect(() => {
    socket.on("emit-input", (inp) => {
      setInput(inp);
    });

    socket.on("emit-output", ({ out, err, errorMessage }) => {
      setOutput(out);
      setErrorMessage(errorMessage);
      setIsError(err);
    });
  }, []);

  // useEffect(() => {
  //   setCode(fetchedCode);
  // }, [fetchedCode]);

  const handleTab = (value) => {
    setActiveTab(value);
  };

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const handleInputChange = (value) => {
    setInput(value);
    socket.emit("input", { inp: value, roomId: roomid });
  };
  const handleOutputChange = (value) => {
    setOutput(value);
  };

  const TextFile = () => {
    const element = document.createElement("a");
    const file = new Blob([code], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myNotes.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const handleFileChange = (e) => {
    console.log("clicked");
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = () => {
      setCode(reader.result);
      console.log(reader.result);
    };

    reader.onerror = () => {
      console.log("file error", reader.error);
    };
  };

  const submit = async () => {
    setIsloading(true);
    const client = piston({ server: "https://emkc.org" });
    const result = await client.execute({
      language: pistonLang,
      version: langVersion,
      files: [
        {
          name: "confrenz",
          content: code,
        },
      ],
      stdin: input,
      args: ["1", "2", "3"],
      compileTimeout: 10000,
      runTimeout: 3000,
      compileMemoryLimit: -1,
      runMemoryLimit: -1,
    });
    setIsloading(false);
    console.log(result);
    if (result.compile) {
      setIsError(result.compile.code);
      setErrorMessage(result?.compile.output);
    } else {
      setIsError(result.run.code);
      if (result.run.code !== 0) {
        setErrorMessage(result.run.output);
      }
    }
    setOutput(result.run.output);

    socket.emit("output", {
      out: result.run.output,
      err: result.compile ? result.compile.code : result.run.code,
      errMes: result.compile ? result.compile.output : result.run.output,
      roomId: roomid,
    });
  };

  return (
    <div style={{ height: "100%", overflowY: "hidden" }}>
      <Tabspanel handleTab={handleTab} activeTab={activeTab} />
      <div className={activeTab === "main" ? styles.active : styles.inactive}>
        <Settingspanel
          handleFileChange={handleFileChange}
          TextFile={TextFile}
          code={code}
        />
        <MainEditor code={code} handleCodeChange={handleCodeChange} />
        <IOpanel
          input={input}
          output={output}
          handleInputChange={handleInputChange}
          handleOutputChange={handleOutputChange}
          submitCode={submit}
          isError={isError}
          errorMessage={errorMessage}
          isLoading={isLoading}
        />
      </div>
      <div
        // style={{ height: "90%" }}
        className={activeTab === "whiteboard" ? styles.active : styles.inactive}
      >
        <Drawnew />
      </div>
    </div>
  );
};

export default CodeEditor;
