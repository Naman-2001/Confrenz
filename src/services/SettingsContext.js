import React, { useState, useContext, useEffect } from "react";
import { socket } from "./socket.js";
import { useParams } from "react-router-dom";
import languages from "../languages.json";

const SettingsContext = React.createContext();

const SettingsProvider = ({ children }) => {
  const [language, setLanguage] = useState("text/x-c++src");
  const [fontSize, setFontSize] = useState(16);
  const [tabSize, setTabSize] = useState(2);
  const [theme, setTheme] = useState("vscode-dark");
  const [keybind, setKeybinds] = useState("sublime");
  const [pistonLang, setPistonLang] = useState("c++")
  const [langVersion, setLangVersion] = useState("10.2.0");

  useEffect(() => {
    socket.on("emit-lang-change", (lang) => {
      setLanguage(lang.mirrorName);
      setPistonLang(lang.pistonName)
    setLangVersion(lang.version)
    });
  }, []);

  const handleLanguageChange = (value, roomid) => {
    console.log(languages[value]);
    setLanguage(value);
    setPistonLang(languages[value].pistonName)
    setLangVersion(languages[value].version)
    socket.emit("language-change", { lang: languages[value], roomId: roomid });
  };

  const handleThemeChange = (value) => {
    setTheme(value);
  };

  const handleFontSizeChange = (value) => {
    setFontSize(value);
  };

  const handleKeybindsChange = (value) => {
    setKeybinds(value);
  };

  const handleTabSizeChange = (value) => {
    setTabSize(value);
  };

  return (
    <SettingsContext.Provider
      value={{
        language,
        fontSize,
        tabSize,
        theme,
        keybind,
        pistonLang,
        langVersion,
        handleLanguageChange,
        handleFontSizeChange,
        handleThemeChange,
        handleKeybindsChange,
        handleTabSizeChange,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

const useSettingsContext = () => {
  return useContext(SettingsContext);
};

export { useSettingsContext };

export default SettingsProvider;
