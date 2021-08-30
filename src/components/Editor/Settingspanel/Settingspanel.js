import React, { useState } from "react";
import styles from "./settings.module.css";
import { Grid, Button } from "@material-ui/core";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SettingsIcon from "@material-ui/icons/Settings";
import BackupIcon from "@material-ui/icons/Backup";
import { useSettingsContext } from "../../../services/SettingsContext";
import { useParams } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Tooltip } from "@material-ui/core";
import languages from "../../../languages.json";

const Settingspanel = () => {
  const {
    language,
    theme,
    fontSize,
    tabSize,
    keyBind,
    handleLanguageChange,
    handleFontSizeChange,
    handleThemeChange,
    handleKeybindsChange,
    handleTabSizeChange,
  } = useSettingsContext();

  const { roomid } = useParams();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ height: "6%" }}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editor Settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container className={styles.setting}>
              <Grid item sm={9}>
                <h4>Font Size</h4>
                <p>Select the font size of the editor from the dropdown. </p>
              </Grid>
              <Grid item sm={3}>
                <select
                  name="font"
                  id="font"
                  className={styles.lang}
                  value={fontSize}
                  onChange={(e) => handleFontSizeChange(e.target.value)}
                >
                  <option value="12">12px</option>
                  <option value="13">13px</option>
                  <option value="14">14px</option>
                  <option value="15">15px</option>
                  <option value="16">16px</option>
                </select>
              </Grid>
            </Grid>
            <Grid container className={styles.setting}>
              <Grid item sm={9}>
                <h4>Tab Size</h4>
                <p>
                  Select the tab size of the editor from the dropdown for
                  beautiful indentation{" "}
                </p>
              </Grid>
              <Grid item sm={3}>
                <select
                  name="tab"
                  id="tab"
                  className={styles.lang}
                  value={tabSize}
                  onChange={(e) => handleTabSizeChange(e.target.value)}
                >
                  <option value="2">2 spaces</option>
                  <option value="4">4 spaces</option>
                  <option value="8">8 spaces</option>
                </select>
              </Grid>
            </Grid>
            <Grid container className={styles.setting}>
              <Grid item sm={9}>
                <h4>Theme</h4>
                <p>Completely customize the way you see your editor. </p>
              </Grid>
              <Grid item sm={3}>
                <select
                  name="theme"
                  id="theme"
                  className={styles.lang}
                  value={theme}
                  onChange={(e) => handleThemeChange(e.target.value)}
                >
                  <option value="neat">neat</option>
                  <option value="vscode-dark">vscode-dark</option>
                  <option value="material-ocean">material-ocean</option>
                  <option value="material">material</option>
                  <option value="monokai">monokai</option>
                </select>
              </Grid>
            </Grid>
            <Grid container className={styles.setting}>
              <Grid item sm={9}>
                <h4>Key binding</h4>
                <p>
                  Want to practice Vim or Emacs? We have these key binding
                  options available for you.{" "}
                </p>
              </Grid>
              <Grid item sm={3}>
                <select
                  name="bind"
                  id="bind"
                  className={styles.lang}
                  value={keyBind}
                  onChange={(e) => handleKeybindsChange(e.target.value)}
                >
                  <option value="Standard">Standard</option>
                  <option value="Vim">Vim</option>
                  <option value="Emacs">Emacs</option>
                </select>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container className={styles.settingswrapper}>
        <Grid item sm={4}>
          <em>Autosaving.....</em>
        </Grid>
        <Grid
          item
          sm={8}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Tooltip title={"Upload File"} placement="bottom" arrow>
            <Button style={{ color: "white" }}>
              <BackupIcon />
            </Button>
          </Tooltip>
          {/* <Button style={{ color: "white" }}>
            <RotateLeftIcon />
          </Button> */}
          <Tooltip title={"Settings"} placement="bottom" arrow>
            <Button style={{ color: "white" }} onClick={handleClickOpen}>
              <SettingsIcon />
            </Button>
          </Tooltip>
          <div>
            <select
              name="lang"
              id="lang"
              className={styles.lang}
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value, roomid)}
              // onChange={(e) => console.log(e.target.value)}
            >
              <option value="text/x-c++src">C++</option>
              <option value="python">Python3</option>
              <option value="text/x-csrc">C</option>
              <option value="text/x-java">Java</option>
              <option value="javascript">Javascript</option>
            </select>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settingspanel;
